import * as deleteByIdType from "./types/deleteById.type";
import * as updateType from "./types/update.type";
import * as createType from "./types/create.type";
import * as getByIdType from "./types/getById.type";
import * as getAllType from "./types/getAll.type";
import { Get, Post, Put, Delete } from "@lib/httpMethod";
import prisma from "@src/config/prisma.config";
import { Validate } from "@lib/validate";
import { AnyObject, GeoLocation, RouteData, StopPointsData } from "@src/types/share.type";
import { v4 as uuidv4 } from "uuid";
import { NotFoundError } from "@lib/exception";

export default class routescontroller {

    @Get("/")
    @Validate(getAllType.schema)
    async getAll(req: getAllType.Req): Promise<getAllType.RerturnType> {
        const { page, limit, search } = req.query;
        const where = search ? {
            OR: [
                { name: { contains: search, mode: "insensitive" } },
                { id: { contains: search, mode: "insensitive" } }
            ]
        } : {};

        const total = await prisma.route.count({ where });
        const data = await prisma.route.findMany({
            where,
            skip: (page - 1) * limit,
            take: limit,
            orderBy: { createdAt: "desc" }
        });

        return getAllType.getAllRes.parse({
            data: data.map(item => RouteData.parse({
                id: item.id,
                name: item.name,
                startLocation: GeoLocation.parse(item.startLocation),
                endLocation: GeoLocation.parse(item.endLocation),
                metadata: item.meta as any,
            })),
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        })
    }

    @Get("/:id")
    @Validate(getByIdType.schema)
    async getById(req: getByIdType.Req): Promise<getByIdType.RerturnType> {
        const { id } = req.params;
        const route = await prisma.route.findUnique({
            where: { id },
            include: {
                RouteStopPoint: {
                    include: {
                        StopPoint: true
                    },
                }
            }
        });
        if (!route) throw new NotFoundError("Route not found");

        return getByIdType.getByIdRes.parse({
            id: route.id,
            name: route.name,
            startLocation: GeoLocation.parse(route.startLocation),
            endLocation: GeoLocation.parse(route.endLocation),
            metadata: AnyObject.parse(route.meta),
            createdAt: route.createdAt.toISOString(),
            stopPoints: route.RouteStopPoint.map(({StopPoint: sp, sequence}) => getByIdType.StopPointsWithSequence.parse({
                id: sp.id,
                name: sp.name,
                location: GeoLocation.parse(sp.location),
                sequence: sequence,
                meta: AnyObject.parse(sp.meta)
            }))
        });
    }


    @Post("/")
    @Validate(createType.schema)
    async create(req: createType.Req): Promise<createType.RerturnType> {
        const { name, startLocation, endLocation, meta, stopPointIds } = req.body;
        const newRoute = await prisma.route.create({
            data: {
                id: uuidv4(),
                name,
                startLocation: startLocation as any,
                endLocation: endLocation as any,
                meta: meta as any,
                RouteStopPoint: {
                    create: stopPointIds.map((spId, index) => ({
                        stopPointId: spId,
                        sequence: index + 1
                    }))
                }
            },
            include: {
                RouteStopPoint: {
                    include: {
                        StopPoint: true
                    }
                }
            }
        });


        return createType.createRes.parse({
            id: newRoute.id,
            name: newRoute.name,
            stopPoints: newRoute.RouteStopPoint.map(({StopPoint: sp, sequence}) => getByIdType.StopPointsWithSequence.parse({
                id: sp.id,
                name: sp.name,
                location: GeoLocation.parse(sp.location),
                sequence: sequence,
                meta: AnyObject.parse(sp.meta)
            })),
            createdAt: newRoute.createdAt.toISOString()
        });
    }


    @Put("/:id")
    @Validate(updateType.schema)
    async update(req: updateType.Req): Promise<updateType.RerturnType> {
        const { id } = req.params;
        const { name, meta, stopPointIds } = req.body;

        const existingRoute = await prisma.route.findUnique({
            where: { id },
            include: { 
                RouteStopPoint: {
                    include: { StopPoint: true }
                }

            }
        });
        if (!existingRoute) throw new NotFoundError("Route not found");

        const updatedRoute = await prisma.route.update({
            where: { id },
            data: {
                name,
                meta: meta as any,
                RouteStopPoint: {
                    deleteMany: {}, // Remove existing relations
                    create: stopPointIds.map((spId, index) => ({
                        stopPointId: spId,
                        sequence: index + 1
                    }))
                }
            },
            include: {
                RouteStopPoint: {
                    include: { StopPoint: true }
                }
            }
        });

        return updateType.updateRes.parse({
            id: updatedRoute.id,
            name: updatedRoute.name,
            updatedAt: updatedRoute.updatedAt.toISOString()
        });
    }


    @Delete("/")
    @Validate(deleteByIdType.schema)
    async deleteById(req: deleteByIdType.Req): Promise<deleteByIdType.RerturnType> {
        const { id } = req.params;
        const existingRoute = await prisma.route.findUnique({ where: { id } });
        if (!existingRoute) throw new NotFoundError("Route not found");

        await prisma.route.delete({ where: { id } });
        return deleteByIdType.deleteByIdRes.parse({});
    }

}
