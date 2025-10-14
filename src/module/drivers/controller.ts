import * as getToDaySchedulesType from "./types/getToDaySchedules.type";
import { Get, Post, Put, Delete, useAuth } from "@lib/httpMethod";
import prisma from "@src/config/prisma.config";
import { Validate } from "@lib/validate";
import { JWT_AUTH, usePremisstion } from "@src/utils/jwt";
import { BusData, GeoLocation, RouteData, StudentData } from "@src/types/share.type";
import { StopPoints } from "../routes/types/create.type";

export default class DriverController {

    @Get("/schedules/today")
    @Validate(getToDaySchedulesType.schema)
    @useAuth(JWT_AUTH)
    @usePremisstion(["read:driver_schedule"])
    async getToDaySchedules(req: getToDaySchedulesType.Req): Promise<getToDaySchedulesType.RerturnType> {
        const userId = req.user.id;

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const schedules = await prisma.schedule.findMany({
            where: {
                driverId: userId,
                startDate: {
                    lte: tomorrow
                },
                endDate: {
                    gte: today
                }
            },
            include: {
                Route: {
                    include: {
                        StudentAssignment: {
                            select: {
                                Student: true
                            },
                            include: {
                                StopPoint: true
                            }
                        }
                    }
                },
                Bus: true,
            }
        });

        const formattedSchedules = schedules.map(schedule => getToDaySchedulesType.SchedulessToDay.parse({
            id: schedule.id,
            route: RouteData.parse({
                id: schedule.Route.id,
                name: schedule.Route.name,
                startLocation: GeoLocation.parse(schedule.Route.startLocation),
                endLocation: GeoLocation.parse(schedule.Route.endLocation),
                metadata: schedule.Route.meta as any
            }),
            bus: BusData.parse({
                id: schedule.Bus.id,
                licensePlate: schedule.Bus.licensePlate,
                capacity: schedule.Bus.capacity,
                metadata: schedule.Bus.meta as any
            }),
            students: schedule.Route.StudentAssignment.map(sa => StudentData.parse({
                id: sa.Student.id,
                name: "",
                stopPoint: sa.StopPoint ? StopPoints.parse({
                    id: sa.StopPoint.id,
                    name: sa.StopPoint.name,
                    location: GeoLocation.parse(sa.StopPoint.location),
                    sequence: -1,
                    meta: sa.StopPoint.meta as any
                }) : undefined,
            }))
        }));

        return getToDaySchedulesType.getToDaySchedulesRes.parse({
            data: formattedSchedules,
            total: formattedSchedules.length
        });
    }

}
