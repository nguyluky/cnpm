import { NotFoundError } from "@lib/exception";
import { Get, Post, Summary, useAuth } from "@lib/httpMethod";
import { Validate } from "@lib/validate";
import prisma from "@src/config/prisma.config";
import { JWT_AUTH, usePremisstion } from "@src/utils/jwt";
import { notifyTripStart, notifyBusArrivalStation, notifyBusDepartureStation, notifyDropoffStudent, notifyPickupStudent, sendLiveLocationUpdate } from "@src/utils/socketio";
import crypto from "crypto";
import * as get_schedulesType from "./types/get_schedules.type";
import * as get_tripType from "./types/get_trip.type";
import * as getToDaySchedulesType from "./types/getToDaySchedules.type";
import { BusInfo, RouteInfo } from "./types/shared.type";
import * as trip_locationType from "./types/trip_location.type";
import * as trip_startType from "./types/trip_start.type";
import * as trip_stoppoint_arriveType from "./types/trip_stoppoint_arrive.type";
import * as trip_stoppoint_departType from "./types/trip_stoppoint_depart.type";
import * as trip_stoppoint_endType from "./types/trip_stoppoint_end.type";
import * as trip_students_dropoffType from "./types/trip_students_dropoff.type";
import * as trip_students_pickupType from "./types/trip_students_pickup.type";
import { GeoLocation } from "@src/types/share.type";

export default class DriverController {

    @Summary("Get today's schedules")
    @Get("/schedules/today")
    @Validate(getToDaySchedulesType.schema)
    @usePremisstion(["read:driver_schedule"])
    @useAuth(JWT_AUTH)
    async getToDaySchedules(req: getToDaySchedulesType.Req): Promise<getToDaySchedulesType.RerturnType> {
        const userId = req.user.id;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const end = new Date(today);
        end.setHours(23, 59, 59, 999);

        const dayOfWeek = today.getDay();

        console.log("today", today, "dayOfWeek", dayOfWeek);

        const schedules = await prisma.schedule.findMany({
            where: {
                driverId: userId,
                // startDate >= today <= endDate
                startDate: {
                    lte: today
                },
                endDate: {
                    gte: today
                },
                // check if the schedule is active on the current day of the week
                daysOfWeek: {
                    array_contains: dayOfWeek
                }
            },
            include: {
                Trip: {
                    where: {
                        date: {
                            gte: today,
                            lte: end
                        }
                    },
                }
            }
        });

        const scheduleData = schedules.flatMap(schedule =>
            schedule.Trip.map(trip => getToDaySchedulesType.ToDaySchedules.parse({
                scheduleId: schedule.id,
                type: schedule.type as 'DISPATH' | "RETURN",
                tripId: trip.id,
                date: trip.date.toISOString().split('T')[0],
                static: trip.status as 'PLANNED' | 'ONGOING' | 'COMPLETED' | 'CANCELLED',
                startTime: schedule.startTime.toISOString(),
            }))
        );

        return getToDaySchedulesType.getToDaySchedulesRes.parse({
            data: scheduleData,
            total: scheduleData.length
        });
    }

    @Get("/schedules")
    @Summary("get driver schedules")
    @Validate(get_schedulesType.schema)
    @useAuth(JWT_AUTH)
    @usePremisstion(["read:driver_schedule"])
    async get_schedules(req: get_schedulesType.Req): Promise<get_schedulesType.RerturnType> {
        const userId = req.user.id;

        const schedules = await prisma.schedule.findMany({
            where: {
                driverId: userId
            },
            include: {
                Route: true,
                Bus: true,
            }
        });

        const formattedSchedules = schedules.map(schedule => get_schedulesType.Scheduless.parse({
            id: schedule.id,
            route: RouteInfo.parse({
                id: schedule.Route.id,
                name: schedule.Route.name
            }),
            bus: BusInfo.parse({
                id: schedule.Bus.id,
                licensePlate: schedule.Bus.licensePlate
            }),
            type: schedule.type as 'MORNING' | 'AFTERNOON',
            startDate: schedule.startDate.toISOString(),
            daysOfWeek: schedule.daysOfWeek as number[],
            endDate: schedule.endDate ? schedule.endDate.toISOString() : undefined,
            startTime: schedule.startTime.toTimeString().slice(0, 5)
        }));

        return get_schedulesType.get_schedulesRes.parse({
            data: formattedSchedules
        });
    }




    @Get("/trip/:id")
    @Summary("Get trip by ID")
    @useAuth(JWT_AUTH)
    @usePremisstion(["read:driver_schedule"])
    @Validate(get_tripType.schema)
    async get_trip(req: get_tripType.Req): Promise<get_tripType.RerturnType> {
        const { id } = req.params;

        const trip = await prisma.trip.findUnique({
            where: { id },
            include: {
                Schedule: {
                    include: {
                        Route: {
                            include: {
                                RouteStopPoint: {
                                    orderBy: {
                                        sequence: 'asc'
                                    },
                                    include: {
                                        StopPoint: true
                                    }
                                }
                            }
                        },
                        Bus: true,
                    }
                },
                TripStop: true,
            }
        });

        if (!trip) {
            throw new NotFoundError("Trip not found");
        }

        const routePath = JSON.parse((trip.Schedule.Route.meta as any)?.encodedPath) as number[][][] | undefined;
        const dispathPath = routePath ? routePath[0] || [] : [];
        const returnPath = routePath ? routePath[1] || routePath[0] || [] : [];
        // console.log("routePath", dispathPath, returnPath);
        const routeInfo = get_tripType.RouteInfoWithPath.parse({
            id: trip.Schedule.Route.id,
            name: trip.Schedule.Route.name,
            path: trip.type == 'DISPATCH' ? dispathPath : returnPath,
            startTime: trip.Schedule.startTime.toISOString(),
        });

        const busInfo = BusInfo.parse({
            id: trip.Schedule.Bus.id,
            licensePlate: trip.Schedule.Bus.licensePlate
        });

        const stops = trip.Schedule.Route.RouteStopPoint.filter(e => (trip.type == "RETURN" && e.direction == "PICKUP") || (trip.type == "DISPATCH" && e.direction == "DROPOFF")).map(rsp => {
            const stopPoint = rsp.StopPoint;
            const tripStop = trip.TripStop.find(ts => ts.stopId === stopPoint.id);

            return get_tripType.StopPointTrip.parse({
                id: stopPoint.id,
                name: stopPoint.name,
                location: [
                    (stopPoint.location as any).longitude,
                    (stopPoint.location as any).latitude,
                ],
                sequence: rsp.sequence,
                status: tripStop ? (tripStop.status || 'PENDING') as 'PENDING' | 'ARRIVED' | 'DONE' | 'SKIPPED' : 'PENDING',
            });
        });



        return get_tripType.get_tripRes.parse({
            id: trip.id,
            status: trip.status as 'PLANNED' | 'ONGOING' | 'COMPLETED' | 'CANCELLED',
            rotute: routeInfo,
            bus: busInfo,
            stops,
        });
    }

    @Post("/trip/:id/start")
    @Summary("Start trip")
    @useAuth(JWT_AUTH)
    @usePremisstion(["update:driver_trip"])
    @Validate(trip_startType.schema)
    async trip_start(req: trip_startType.Req): Promise<trip_startType.RerturnType> {
        const { id } = req.params;

        const trip = await prisma.trip.update({
            where: { id },
            data: {
                status: 'ONGOING',
                actualStartTime: new Date(),
            }
        });

        // notify parents that trip has started
        // trip id => schedule id => route id => get all students on that route
        const routeId = (await prisma.schedule.findUnique({
            where: {
                id: trip.scheduleId
            }
        }))?.routeId;

        notifyTripStart(routeId || "");

        return trip_startType.trip_startRes.parse({
            tripId: trip.id,
            status: trip.status || 'ONGOING',
            startedAt: trip.actualStartTime!.toISOString(),
        });
    }


    @Post("/trip/:tripId/stoppoint/:spId/arrive") 
    @Summary("Mark stoppoint as arrived")
    @useAuth(JWT_AUTH)
    @usePremisstion(["update:driver_trip"])
    @Validate(trip_stoppoint_arriveType.schema)
    async trip_stoppoint_arrive(req: trip_stoppoint_arriveType.Req): Promise<trip_stoppoint_arriveType.RerturnType> {
        const { tripId, spId } = req.params;

        const tropStopId = crypto
            .createHash("sha256")
            .update(tripId + ":" + spId)
            .digest("base64url");

        const tropStop = await prisma.tripStop.upsert({
            where: {
                id: tropStopId
            },
            create: {
                id: tropStopId,
                tripId: tripId,
                stopId: spId,
                status: 'ARRIVED',
                actualArrival: new Date(),
            },
            update: {
                status: 'ARRIVED',
                actualArrival: new Date(),
            },
            include: {
                StopPoint: true
            }
        });

        // send notification to parents that bus is arriving at their station
        const location = tropStop.StopPoint.location as any as GeoLocation;
        notifyBusArrivalStation(spId, {
            lat: location.latitude,
            lng: location.longitude
        })


        return trip_stoppoint_arriveType.trip_stoppoint_arriveRes.parse({
            stopId: tropStop.stopId,
            status: tropStop.status as 'PENDING' | 'ARRIVED' | 'DONE' | 'SKIPPED',
            arrivedAt: tropStop.actualArrival!.toISOString(),
        });
    }


    @Post("/trip/:tripId/stoppoint/:spId/depart")  
    @Summary("Mark stoppoint as departed")
    @useAuth(JWT_AUTH)
    @usePremisstion(["update:driver_trip"])
    @Validate(trip_stoppoint_departType.schema)
    async trip_stoppoint_depart(req: trip_stoppoint_departType.Req): Promise<trip_stoppoint_departType.RerturnType> {
        const { tripId, spId } = req.params;

        const tropStopId = crypto
            .createHash("sha256")
            .update(tripId + ":" + spId)
            .digest("base64url");

        const tropStop = await prisma.tripStop.upsert({
            where: {
                id: tropStopId
            },
            create: {
                id: tropStopId,
                tripId: tripId,
                stopId: spId,
                status: 'DONE',
                actualDeparture: new Date(),
            },
            update: {
                status: 'DONE',
                actualDeparture: new Date(),
            },
            include: {
                StopPoint: true
            }
        });

        // send notification to parents that bus is departing from their station
        const location = tropStop.StopPoint.location as any as GeoLocation;
        notifyBusDepartureStation(spId, {
            lat: location.latitude,
            lng: location.longitude
        })

        return trip_stoppoint_departType.trip_stoppoint_departRes.parse({
            stopId: tropStop.stopId,
            status: tropStop.status as 'PENDING' | 'ARRIVED' | 'DONE' | 'SKIPPED',
            departedAt: tropStop.actualDeparture!.toISOString(),
        });
    }


    @Get("/trip/:tripId/end")
    @Summary("End trip")
    @useAuth(JWT_AUTH)
    @usePremisstion(["update:driver_trip"])
    @Validate(trip_stoppoint_endType.schema)
    async trip_stoppoint_end(req: trip_stoppoint_endType.Req): Promise<trip_stoppoint_endType.RerturnType> {

        const { tripId } = req.params;

        const trip = await prisma.trip.update({
            where: { id: tripId },
            data: {
                status: 'COMPLETED',
                actualEndTime: new Date(),
            }
        });

        return trip_stoppoint_endType.trip_stoppoint_endRes.parse({
            tripId: trip.id,
            status: trip.status || 'COMPLETED',
            startAt: trip.actualStartTime!.toISOString(),
            endAt: trip.actualEndTime!.toISOString(),
        });

    }


    @Post("/trip/:tripId/students/:studentId/pickup") 
    @Summary("Pickup student")
    @useAuth(JWT_AUTH)
    @usePremisstion(["update:driver_trip"])
    @Validate(trip_students_pickupType.schema)
    async trip_students_pickup(req: trip_students_pickupType.Req): Promise<trip_students_pickupType.RerturnType> {
        const { tripId, studentId } = req.params;

        const tropStudentId = crypto
            .createHash("sha256")
            .update(tripId + ":" + studentId)
            .digest("base64url");

        const studentAttendance = await prisma.studentAttendance.upsert({
            where: {
                id: tropStudentId
            },
            create: {
                id: tropStudentId,
                tripId: tripId,
                studentId: studentId,
                status: 'PICKED_UP',
                pickupTime: new Date(),
            },
            update: {
                status: 'PICKED_UP',
                pickupTime: new Date(),
            }
        });

        notifyPickupStudent(studentId);

        return trip_students_pickupType.trip_students_pickupRes.parse({
            studentId: studentAttendance.studentId,
            status: studentAttendance.status as 'PENDING' | 'PICKED_UP' | 'DROPPED_OFF',
            pickedAt: studentAttendance.pickupTime!.toISOString(),
        });
    }


    @Post("/trip/:tripId/students/:studentId/dropoff") 
    @Summary("Dropoff student")
    @useAuth(JWT_AUTH)
    @usePremisstion(["update:driver_trip"])
    @Validate(trip_students_dropoffType.schema)
    async trip_students_dropoff(req: trip_students_dropoffType.Req): Promise<trip_students_dropoffType.RerturnType> {
        const { tripId, studentId } = req.params;

        const tropStudentId = crypto
            .createHash("sha256")
            .update(tripId + ":" + studentId)
            .digest("base64url");

        const studentAttendance = await prisma.studentAttendance.upsert({
            where: {
                id: tropStudentId
            },
            create: {
                id: tropStudentId,
                tripId: tripId,
                studentId: studentId,
                status: 'DROPPED_OFF',
                dropoffTime: new Date(),
            },
            update: {
                status: 'DROPPED_OFF',
                dropoffTime: new Date(),
            }
        });

        notifyDropoffStudent(studentId);

        return trip_students_dropoffType.trip_students_dropoffRes.parse({
            studentId: studentAttendance.studentId,
            status: studentAttendance.status as 'PENDING' | 'PICKED_UP' | 'DROPPED_OFF',
            droppedAt: studentAttendance.dropoffTime!.toISOString(),
        });
    }


    @Post("/trip/:tripId/location")
    @Summary("Update trip location")
    @useAuth(JWT_AUTH)
    @usePremisstion(["update:driver_location"])
    @Validate(trip_locationType.schema)
    async trip_location(req: trip_locationType.Req): Promise<trip_locationType.RerturnType> {
        const { tripId } = req.params;

        const { latitude, longitude } = req.body;

        const currentDate = new Date();

        const locationRecord = await prisma.trackingBusHistory.create({
            data: {
                id: currentDate.getTime().toString() + "-" + tripId,
                tripId: tripId,
                location: [
                    latitude,
                    longitude
                ] as any,
                timestamp: currentDate,
            }
        });

        sendLiveLocationUpdate(tripId, {
            lat: latitude,
            lng: longitude
        });

        return trip_locationType.trip_locationRes.parse({
            ok: true
        });

    }

}
