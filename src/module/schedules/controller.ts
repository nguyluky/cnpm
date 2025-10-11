import * as deleteType from "./types/delete.type";
import * as updateType from "./types/update.type";
import * as createType from "./types/create.type";
import * as getByIdType from "./types/getById.type";
import * as getAllType from "./types/getAll.type";
import { Get, Post, Put, Delete } from "@lib/httpMethod";
import prisma from "@src/config/prisma.config";
import { Validate } from "@lib/validate";
import { AnyObject, BusData, GeoLocation, RouteData } from "@src/types/share.type";
import { NotFoundError } from "@lib/exception";
import { ScheduleInfo, TimeTable } from "./types/share.type";
import { v4 as uuid } from "uuid";

export default class SchedulesController {

    @Get("/")
    @Validate(getAllType.schema)
    async getAll(req: getAllType.Req): Promise<getAllType.RerturnType> {
        const { page, limit, search } = req.query;
        const where = search ? {
            OR: [
                // TODO: add search fields
            ]
        } : {};

        const [data, total] = await Promise.all([
            prisma.schedule.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                include: {
                    Bus: true,
                    Route: true
                }
            }),
            prisma.schedule.count({})
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
                bus: {
                    id: item.Bus.id,
                    licensePlate: item.Bus.licensePlate,
                    capacity: item.Bus.capacity,
                    metadata: AnyObject.parse(item.Bus.meta),
                },
                times: (item.daysOfWeek as any).map((t: any) => TimeTable.parse({
                    dayOfWeek: t.dayOfWeek,
                    departureTime: t.departureTime
                })),
                route: RouteData.parse({
                    id: item.routeId,
                    name: item.Route?.name || "",
                    startLocation: GeoLocation.parse(item.Route?.startLocation || {}),
                    endLocation: GeoLocation.parse(item.Route?.endLocation || {}),
                    metadata: new AnyObject
                }),
                meta: item.meta,
                startDate: item.startDate.toISOString(),
                endDate: item.endDate.toISOString(),
                startTime: item.startTime.toISOString(),
                type: item.type
            })),
            meta
        });
    }


    @Get("/:id")
    @Validate(getByIdType.schema)
    async getById(req: getByIdType.Req): Promise<getByIdType.RerturnType> {
        const {id} = req.params;
        const schedule = await prisma.schedule.findUnique({
            where: { id },
            include: {
                Bus: true,
                Route: true
            }
        });

        if (!schedule) {
            throw new NotFoundError("");
        }

        return getByIdType.getByIdRes.parse({
            id: schedule.id,
            bus: BusData.parse({
                id: schedule.Bus.id,
                licensePlate: schedule.Bus.licensePlate,
                capacity: schedule.Bus.capacity,
                metadata: AnyObject.parse(schedule.Bus.meta),
            }),
            times: (schedule.daysOfWeek as any).map((t: any) => TimeTable.parse({
                dayOfWeek: t.dayOfWeek,
                departureTime: t.departureTime
            })),
            route: RouteData.parse({
                id: schedule.Route.id,
                name: schedule.Route.name,
                startLocation: GeoLocation.parse(schedule.Route.startLocation),
                endLocation: GeoLocation.parse(schedule.Route.endLocation),
                metadata: new AnyObject
            }),
            meta: schedule.meta,
            startDate: schedule.startDate.toISOString(),
            endDate: schedule.endDate.toISOString(),
            startTime: schedule.startTime.toISOString(),
            type: schedule.type
        });
    }


    @Post("/")
    @Validate(createType.schema)
    async create(req: createType.Req): Promise<createType.RerturnType> {
        const { busId, routeId, driverId, times, meta, type} = req.body;

        const newSchedule = await prisma.schedule.create({
            data: {
                id: uuid(),
                busId,
                routeId,
                driverId,
                daysOfWeek: times as any,
                meta,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                startTime: req.body.startTime,
                type: type
            },
            include: {
                Bus: true,
                Route: true
            }
        });

        return createType.createRes.parse({
            id: newSchedule.id,
            bus: BusData.parse({
                id: newSchedule.Bus.id,
                licensePlate: newSchedule.Bus.licensePlate,
                capacity: newSchedule.Bus.capacity,
                metadata: AnyObject.parse(newSchedule.Bus.meta),
            }),
            times: (newSchedule.daysOfWeek as any).map((t: any) => TimeTable.parse({
                dayOfWeek: t.dayOfWeek,
                departureTime: t.departureTime
            })),
            route: RouteData.parse({
                id: newSchedule.Route.id,
                name: newSchedule.Route.name,
                startLocation: GeoLocation.parse(newSchedule.Route.startLocation),
                endLocation: GeoLocation.parse(newSchedule.Route.endLocation),
                metadata: new AnyObject
            }),
            meta: newSchedule.meta,
            startDate: newSchedule.startDate.toISOString(),
            endDate: newSchedule.endDate.toISOString(),
            startTime: newSchedule.startTime.toISOString(),
            type: newSchedule.type
        });
    }


    @Put("/:id")
    @Validate(updateType.schema)
    async update(req: updateType.Req): Promise<updateType.RerturnType> {
        const { busId, routeId, driverId, times, meta, type} = req.body;
        const { id } = req.params;

        const existingSchedule = await prisma.schedule.findUnique({
            where: { id }
        });

        if (!existingSchedule) {
            throw new NotFoundError("");
        }

        const updatedSchedule = await prisma.schedule.update({
            where: { id },
            data: {
                busId,
                routeId,
                driverId,
                daysOfWeek: times as any,
                meta,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                startTime: req.body.startTime,
                type: type
            },
            include: {
                Bus: true,
                Route: true
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
            times: (updatedSchedule.daysOfWeek as any).map((t: any) => TimeTable.parse({
                dayOfWeek: t.dayOfWeek,
                departureTime: t.departureTime
            })),
            route: RouteData.parse({
                id: updatedSchedule.Route.id,
                name: updatedSchedule.Route.name,
                startLocation: GeoLocation.parse(updatedSchedule.Route.startLocation),
                endLocation: GeoLocation.parse(updatedSchedule.Route.endLocation),
                metadata: new AnyObject
            }),
            meta: updatedSchedule.meta,
            startDate: updatedSchedule.startDate.toISOString(),
            endDate: updatedSchedule.endDate.toISOString(),
            startTime: updatedSchedule.startTime.toISOString(),
            type: updatedSchedule.type
        });
    }

    @Delete("/:id")
    @Validate(deleteType.schema)
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

        return deleteType.deleteRes.parse({});
    }
}
