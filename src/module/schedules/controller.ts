import * as getAllTripToDayType from "./types/getAllTripToDay.type";
import * as deleteType from "./types/delete.type";
import * as updateType from "./types/update.type";
import * as createType from "./types/create.type";
import * as getByIdType from "./types/getById.type";
import * as getAllType from "./types/getAll.type";
import { Get, Post, Put, Delete, useAuth, Summary } from "@lib/httpMethod";
import prisma from "@src/config/prisma.config";
import { Validate } from "@lib/validate";
import { AnyObject, BusData, GeoLocation, RouteData, RouteInfo, RouteInfoWithPath, RouteMeta, StopPointsMeta, StopPointTrip } from "@src/types/share.type";
import { NotFoundError } from "@lib/exception";
import { DriverData, ScheduleInfo, TimeTable } from "./types/share.type";
import { v4 as uuid } from "uuid";
import { JWT_AUTH, usePremisstion } from "@src/utils/jwt";
import { sendNotification } from "@src/utils/socketio";
import { BusInfo } from "../drivers/types/shared.type";

function formatDateToHHMM(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

export default class SchedulesController {

    @Get("/trip/today")
    @Summary("Get all trips for today")
    @Validate(getAllTripToDayType.schema)
    async getAllTripToDay(req: getAllTripToDayType.Req): Promise<getAllTripToDayType.RerturnType> {
        const now = new Date();
        const startDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
        const endDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

        const trips = await prisma.trip.findMany({
            where: {
                date: {
                    gte: startDay,
                    lte: endDay
                }
            },
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
                        User: true

                    }
                },
                TripStop: true
            }
        })

        return getAllTripToDayType.getAllTripToDayRes.parse({
            data: trips.map(trip => {

                const stops = trip.Schedule.Route.RouteStopPoint.filter(e => (trip.type == "RETURN" && e.direction == "PICKUP") || (trip.type == "DISPATCH" && e.direction == "DROPOFF")).map(rsp => {
                    const stopPoint = rsp.StopPoint;
                    const tripStop = trip.TripStop.find(ts => ts.stopId === stopPoint.id);

                    return StopPointTrip.parse({
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

                const routeInfo = RouteInfo.parse({
                    id: trip.Schedule.Route.id,
                    name: trip.Schedule.Route.name,
                });

                return getAllTripToDayType.TripToDay.parse({
                    scheduleId: trip.scheduleId,
                    tripId: trip.id,
                    sattus: trip.status as any,
                    bus: BusInfo.parse({
                        id: trip.Schedule.Bus.id,
                        licensePlate: trip.Schedule.Bus.licensePlate,
                    }),
                    driver: DriverData.parse({
                        id: trip.Schedule.User?.id || "",
                        name: trip.Schedule.User?.username || "",
                        email: trip.Schedule.User?.email || "",
                    }),
                    route: routeInfo,
                    stops: stops,
                });
            }),
            total: trips.length
        });
    }

    @Summary("Get all schedules")
    @Get("/")
    @Validate(getAllType.schema)
    @useAuth(JWT_AUTH)
    @usePremisstion(["read:schedule"])
    async getAll(req: getAllType.Req): Promise<getAllType.RerturnType> {
        const { page, limit, search, routeId, busId } = req.query;
        const where = search ? {
            OR: [
                // TODO: add search fields
            ]
        } : {};

        const [data, total] = await Promise.all([
            prisma.schedule.findMany({
                where: {
                    ...where,
                    routeId: routeId,
                    busId: busId
                },
                skip: (page - 1) * limit,
                take: limit,
                include: {
                    Bus: true,
                    Route: true,
                    User: true
                }
            }),
            prisma.schedule.count({
                where: {
                    ...where,
                    routeId: routeId,
                    busId: busId
                }
            })
        ]);

        const meta = {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        };

        return getAllType.getAllRes.parse({
            data: data.map(item => ScheduleInfo.parse({
                id: item.id,
                driver: DriverData.parse({
                    id: item.User?.id || "",
                    name: item.User?.username || "",
                    email: item.User?.email || "",
                }),
                bus: {
                    id: item.Bus.id,
                    licensePlate: item.Bus.licensePlate,
                    capacity: item.Bus.capacity,
                    metadata: AnyObject.parse(item.Bus.meta),
                },
                times: TimeTable.parse({
                    dayOfWeek: item.daysOfWeek as number[],
                    departureTime: formatDateToHHMM(item.startTime)
                }),
                route: RouteData.parse({
                    id: item.routeId,
                    name: item.Route?.name || "",
                    startLocation: GeoLocation.parse(item.Route?.startLocation || {}),
                    endLocation: GeoLocation.parse(item.Route?.endLocation || {}),
                    metadata: StopPointsMeta.parse(item.Route?.meta as any),
                }),
                meta: item.meta,
                startDate: item.startDate.toISOString(),
                endDate: item.endDate.toISOString(),
                type: item.type
            })),
            meta
        });
    }

    @Summary("Get schedule by ID")
    @Get("/:id")
    @Validate(getByIdType.schema)
    @useAuth(JWT_AUTH)
    @usePremisstion(["read:schedule_detail"])
    async getById(req: getByIdType.Req): Promise<getByIdType.RerturnType> {
        const { id } = req.params;
        const schedule = await prisma.schedule.findUnique({
            where: { id },
            include: {
                Bus: true,
                Route: true,
                User: true
            }
        });

        if (!schedule) {
            throw new NotFoundError("");
        }

        return getByIdType.getByIdRes.parse({
            id: schedule.id,
            driver: DriverData.parse({
                id: schedule.User?.id || "",
                name: schedule.User?.username || "",
                email: schedule.User?.email || "",
            }),
            bus: BusData.parse({
                id: schedule.Bus.id,
                licensePlate: schedule.Bus.licensePlate,
                capacity: schedule.Bus.capacity,
                metadata: AnyObject.parse(schedule.Bus.meta),
            }),
            times: TimeTable.parse({
                dayOfWeek: schedule.daysOfWeek as number[],
                departureTime: formatDateToHHMM(schedule.startTime)
            }),
            route: RouteData.parse({
                id: schedule.Route.id,
                name: schedule.Route.name,
                startLocation: GeoLocation.parse(schedule.Route.startLocation),
                endLocation: GeoLocation.parse(schedule.Route.endLocation),
                metadata: RouteMeta.parse(schedule.Route.meta as any),
            }),
            meta: schedule.meta,
            startDate: schedule.startDate.toISOString(),
            endDate: schedule.endDate.toISOString(),
            type: schedule.type
        });
    }


    @Summary("Create a new schedule")
    @Post("/")
    @Validate(createType.schema)
    @useAuth(JWT_AUTH)
    @usePremisstion(["create:schedule"])
    async create(req: createType.Req): Promise<createType.RerturnType> {
        const { busId, routeId, driverId, times, meta, type } = req.body;
        const new_id = uuid();

        const formatStartDate = new Date();
        const getHours = req.body.times.departureTime.split(':')[0];
        const getMinutes = req.body.times.departureTime.split(':')[1];
        formatStartDate.setHours(parseInt(getHours), parseInt(getMinutes), 0, 0);


        const newSchedule = await prisma.schedule.create({
            data: {
                id: new_id,
                busId,
                routeId,
                driverId,
                daysOfWeek: times.dayOfWeek as any,
                meta,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                startTime: formatStartDate,
                type: type
            },
            include: {
                Bus: true,
                Route: true,
                User: true
            }
        });

        // After update/delete
        // 1. Notify driver
        if (driverId) {
            sendNotification(driverId, {
                type: 'SCHEDULE_ADDED',
                message: 'Your new schedule has been added',
                data: { new_id }
            });
        }

        return createType.createRes.parse({
            id: newSchedule.id,
            driver: DriverData.parse({
                id: newSchedule.User?.id || "",
                name: newSchedule.User?.username || "",
                email: newSchedule.User?.email || "",
            }),
            bus: BusData.parse({
                id: newSchedule.Bus.id,
                licensePlate: newSchedule.Bus.licensePlate,
                capacity: newSchedule.Bus.capacity,
                metadata: AnyObject.parse(newSchedule.Bus.meta),
            }),
            times: TimeTable.parse({
                dayOfWeek: newSchedule.daysOfWeek as number[],
                departureTime: formatDateToHHMM(newSchedule.startTime)
            }),
            route: RouteData.parse({
                id: newSchedule.Route.id,
                name: newSchedule.Route.name,
                startLocation: GeoLocation.parse(newSchedule.Route.startLocation),
                endLocation: GeoLocation.parse(newSchedule.Route.endLocation),
                metadata: RouteMeta.parse(newSchedule.Route.meta as any),
            }),
            meta: newSchedule.meta,
            startDate: newSchedule.startDate.toISOString(),
            endDate: newSchedule.endDate.toISOString(),
            type: newSchedule.type,
        });
    }


    @Summary("Update a schedule")
    @Put("/:id")
    @Validate(updateType.schema)
    @useAuth(JWT_AUTH)
    @usePremisstion(["update:schedule"])
    async update(req: updateType.Req): Promise<updateType.RerturnType> {
        const { busId, routeId, driverId, times, meta, type } = req.body;
        const { id } = req.params;

        const existingSchedule = await prisma.schedule.findUnique({
            where: { id }
        });

        if (!existingSchedule) {
            throw new NotFoundError("");
        }

        let formatStartDate: Date = existingSchedule.startTime;

        if (req.body.times) {
            formatStartDate = new Date();
            const getHours = req.body.times.departureTime.split(':')[0];
            const getMinutes = req.body.times.departureTime.split(':')[1];
            formatStartDate.setHours(parseInt(getHours), parseInt(getMinutes), 0, 0);
        }

        const updatedSchedule = await prisma.schedule.update({
            where: { id },
            data: {
                busId,
                routeId,
                driverId,
                daysOfWeek: times?.dayOfWeek as any,
                meta,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                startTime: formatStartDate,
                type: type
            },
            include: {
                Bus: true,
                Route: true
            }
        });

        // 1. Notify driver
        if (driverId) {
            sendNotification(driverId, {
                type: 'SCHEDULE_UPDATED',
                message: 'Your schedule has been updated',
                data: { id } // id: scheduleId
            });
        }

        // 2. Find all students on this schedule and notify their parents
        // because a route can only appear on 1 schedule only, so we will use route instead of scheduleId because of the database table design
        const studentsAssignments = await prisma.studentAssignment.findMany({
            where: { routeId: routeId },
        });

        const studentIds = studentsAssignments.map(sa => sa.studentId).filter(Boolean);

        const students = studentIds.length
            ? await prisma.student.findMany({
                where: { id: { in: studentIds } }
            })
            : [];

        students.forEach(student => {
            if (student?.id) {
                sendNotification(student.id, {
                    type: 'SCHEDULE_UPDATED',
                    message: `Schedule for ${student.name} has been updated`,
                    data: { routeId, studentName: student.name }
                });
            }
        });

        return updateType.updateRes.parse({
            id: updatedSchedule.id,
            bus: BusData.parse({
                id: updatedSchedule.Bus.id,
                licensePlate: updatedSchedule.Bus.licensePlate,
                capacity: updatedSchedule.Bus.capacity,
                metadata: AnyObject.parse(updatedSchedule.Bus.meta),
            }),
            times: TimeTable.parse({
                dayOfWeek: updatedSchedule.daysOfWeek as number[],
                departureTime: formatDateToHHMM(updatedSchedule.startTime)
            }),
            route: RouteData.parse({
                id: updatedSchedule.Route.id,
                name: updatedSchedule.Route.name,
                startLocation: GeoLocation.parse(updatedSchedule.Route.startLocation),
                endLocation: GeoLocation.parse(updatedSchedule.Route.endLocation),
                metadata: RouteMeta.parse(updatedSchedule.Route.meta as any),
            }),
            meta: updatedSchedule.meta,
            startDate: updatedSchedule.startDate.toISOString(),
            endDate: updatedSchedule.endDate.toISOString(),
            startTime: updatedSchedule.startTime.toISOString(),
            type: updatedSchedule.type
        });
    }

    @Summary("Delete a schedule")
    @Delete("/:id")
    @Validate(deleteType.schema)
    @useAuth(JWT_AUTH)
    @usePremisstion(["delete:schedule"])
    async delete(req: deleteType.Req): Promise<deleteType.RerturnType> {
        const { id } = req.params;

        const existingSchedule = await prisma.schedule.findUnique({
            where: { id }
        });

        if (!existingSchedule) {
            throw new NotFoundError("");
        }

        await prisma.schedule.delete({
            where: { id }
        });

        // 1. Notify driver
        if (existingSchedule.driverId) {
            sendNotification(existingSchedule.driverId, {
                type: 'SCHEDULE_DELETED',
                message: 'Your schedule has been deleted',
                data: { id } // id: scheduleId
            });
        }

        // 2. Find all students on this schedule and notify their parents
        // because a route can only appear on 1 schedule only, so we will use route instead of scheduleId because of the database table design
        const studentsAssignments = await prisma.studentAssignment.findMany({
            where: { routeId: existingSchedule.routeId },
        });

        const studentIds = studentsAssignments.map(sa => sa.studentId).filter(Boolean);

        const students = studentIds.length
            ? await prisma.student.findMany({
                where: { id: { in: studentIds } }
            })
            : [];

        students.forEach(student => {
            if (student?.id) {
                sendNotification(student.id, {
                    type: 'SCHEDULE_DELETED',
                    message: `Schedule for ${student.name} has been deleted`,
                    data: { routeId: existingSchedule.routeId, studentName: student.name }
                });
            }
        });


        return deleteType.deleteRes.parse({});
    }


}
