import * as deleteStoppointsType from "./types/deleteStoppoints.type";
import * as updateStoppointsType from "./types/updateStoppoints.type";
import * as getAllType from "./types/getAll.type";
import * as createStoppointsType from "./types/createStoppoints.type";
import * as getStoppointsType from "./types/getStoppoints.type";
import { Get, Post, Put, Delete } from "@lib/httpMethod";
import prisma from "@src/config/prisma.config";
import { Validate } from "@lib/validate";
import { GeoLocation, StopPointsData } from "@src/types/share.type";
import { v4 as uuidv4 } from "uuid";
import { NotFoundError } from "@lib/exception";

export default class StoppointsController {

    @Get("/stoppoints")
    @Validate(getAllType.schema)
    async getAll(req: getAllType.Req): Promise<getAllType.RerturnType> {
        const stoppoints = await prisma.stopPoint.findMany({})

        const formattedStoppoints = stoppoints.map(stoppoint => StopPointsData.parse({
            id: stoppoint.id,
            name: stoppoint.name,
            location: GeoLocation.parse(stoppoint.location),
            sequence: stoppoint.sequence,
            meta: stoppoint.meta as any
        }));
        
        return getAllType.getAllRes.parse({
            data: formattedStoppoints,
            total: formattedStoppoints.length,
        })
    }

    @Get("/stoppoints/:id")
    @Validate(getStoppointsType.schema)
    async getStoppoints(req: getStoppointsType.Req): Promise<getStoppointsType.RerturnType> {
        const { id } = req.params;
        const stoppoint = await prisma.stopPoint.findUnique({
            where: { id }
        })
        
        if (!stoppoint) {
            throw new NotFoundError("Stoppoint not found");
        }

        return getStoppointsType.getStoppointsRes.parse({
            id: stoppoint.id,
            sequence: stoppoint.sequence,
            name: stoppoint.name,
            location: GeoLocation.parse(stoppoint.location),
            createdAt: stoppoint.createdAt.toISOString(),
            updatedAt: stoppoint.updatedAt.toISOString()
        });
    }

    @Post("/stoppoints")
    @Validate(createStoppointsType.schema)
    async createStoppoints(req: createStoppointsType.Req): Promise<createStoppointsType.RerturnType> {
        const { name, location, sequence } = req.body;
        const stoppoint = await prisma.stopPoint.create({
            data: {
                id: uuidv4(),
                sequence,
                name,
                location: location as any,
                Route: {
                    connect: {
                        id: ""
                    }
                }
            }
        })

        return createStoppointsType.createStoppointsRes.parse({
            id: stoppoint.id,
            sequence: stoppoint.sequence,
            name: stoppoint.name,
            location: GeoLocation.parse(stoppoint.location)
        })
    }

    @Put("/stoppoints/:id")
    @Validate(updateStoppointsType.schema)
    async updateStoppoints(req: updateStoppointsType.Req): Promise<updateStoppointsType.RerturnType> {
        const { id } = req.params;
        const data = {
            ...req.body,
            location: req.body.location as any
        };

        const stoppoint = await prisma.stopPoint.update({
            where: { id },
            data
        });

        if (!stoppoint) {
            throw new NotFoundError("Stoppoint not found");
        }

        return updateStoppointsType.updateStoppointsRes.parse({
            id: stoppoint.id,
            sequence: stoppoint.sequence,
            name: stoppoint.name,
            location: GeoLocation.parse(stoppoint.location),
            meta: stoppoint.meta as any,
            createdAt: stoppoint.createdAt.toISOString(),
            updatedAt: stoppoint.updatedAt.toISOString()
        })
    }

    @Delete("/stoppoints/:id")
    @Validate(deleteStoppointsType.schema)
    async deleteStoppoints(req: deleteStoppointsType.Req): Promise<deleteStoppointsType.RerturnType> {
        const { id } = req.params;
        const stoppoint = await prisma.stopPoint.findUnique({
            where: { id }
        });

        if (!stoppoint) {
            throw new NotFoundError("Stoppoints not found");
        }

        await prisma.stopPoint.delete({
            where: { id }
        });

        return deleteStoppointsType.deleteStoppointsRes.parse({});
    }
}
