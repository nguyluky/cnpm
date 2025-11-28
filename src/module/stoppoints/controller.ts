import * as deleteStoppointsType from "./types/deleteStoppoints.type";
import * as updateStoppointsType from "./types/updateStoppoints.type";
import * as getAllType from "./types/getAll.type";
import * as createStoppointsType from "./types/createStoppoints.type";
import * as getStoppointsType from "./types/getStoppoints.type";
import { Get, Post, Put, Delete, useAuth, Summary } from "@lib/httpMethod";
import prisma from "@src/config/prisma.config";
import { Validate } from "@lib/validate";
import { GeoLocation, StopPointsData } from "@src/types/share.type";
import { v4 as uuidv4 } from "uuid";
import { NotFoundError } from "@lib/exception";
import { JWT_AUTH, usePremisstion } from "@src/utils/jwt";

export default class StoppointsController {

    @Summary("Get all stoppoints")
    @Get("/stoppoints")
    @Validate(getAllType.schema)
    @useAuth(JWT_AUTH)
    @usePremisstion(["read:stoppoints"])
    async getAll(req: getAllType.Req): Promise<getAllType.RerturnType> {

        const { east, north, south, west, name } = req.query;

        const conditions = [
            name && { name: { contains: name } },
            east && { location: { path: "$.longitude", lte: east } },
            west && { location: { path: "$.longitude", gte: west } },
            north && { location: { path: "$.latitude", lte: north } },
            south && { location: { path: "$.latitude", gte: south } },
        ].filter(Boolean) as any[];

        let stoppoints = await prisma.stopPoint.findMany({
<<<<<<< HEAD
            where: conditions.length > 0 ? { AND: conditions } : undefined
        });
=======
            where: {
                AND: [...conditions as any]
            }
        })
>>>>>>> 4ca29875c5afae8a96c726840e46b9438c894cfe

        let formattedStoppoints = stoppoints.map(stoppoint => StopPointsData.parse({
            id: stoppoint.id,
            name: stoppoint.name,
            location: GeoLocation.parse(stoppoint.location),
            meta: stoppoint.meta as any
        }));

        return getAllType.getAllRes.parse({
            data: formattedStoppoints,
            total: formattedStoppoints.length,
        })
    }

    @Summary("Get stoppoint by ID")
    @Get("/stoppoints/:id")
    @Validate(getStoppointsType.schema)
    @useAuth(JWT_AUTH)
    @usePremisstion(["read:stoppoints_detail"])
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
            name: stoppoint.name,
            location: GeoLocation.parse(stoppoint.location),
            createdAt: stoppoint.createdAt.toISOString(),
            updatedAt: stoppoint.updatedAt.toISOString()
        });
    }

    @Summary("Create a new stoppoint")
    @Post("/stoppoints")
    @Validate(createStoppointsType.schema)
    @useAuth(JWT_AUTH)
    @usePremisstion(["create:stoppoints"])
    async createStoppoints(req: createStoppointsType.Req): Promise<createStoppointsType.RerturnType> {
        const { name, location, meta } = req.body;
        // Note: sequence is not stored in database, only used for validation

        const stoppoint = await prisma.stopPoint.create({
            data: {
                id: uuidv4(),
                name,
                location: location as any,
                meta: meta as any
            }
        })

        return createStoppointsType.createStoppointsRes.parse({
            id: stoppoint.id,
            name: stoppoint.name,
            location: GeoLocation.parse(stoppoint.location),
            meta: stoppoint.meta as any,
        })
    }

    @Summary("Update a stoppoint")
    @Put("/stoppoints/:id")
    @Validate(updateStoppointsType.schema)
    @useAuth(JWT_AUTH)
    @usePremisstion(["update:stoppoints"])
    async updateStoppoints(req: updateStoppointsType.Req): Promise<updateStoppointsType.RerturnType> {
        const { id } = req.params;
        const { name, location } = req.body;
        // Note: sequence is not stored in database, only used for validation

        const data = {
            name,
            location: location as any
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
            name: stoppoint.name,
            location: GeoLocation.parse(stoppoint.location),
            meta: stoppoint.meta as any,
            createdAt: stoppoint.createdAt.toISOString(),
            updatedAt: stoppoint.updatedAt.toISOString()
        })
    }

    @Summary("Delete a stoppoint")
    @Delete("/stoppoints/:id")
    @Validate(deleteStoppointsType.schema)
    @useAuth(JWT_AUTH)
    @usePremisstion(["delete:stoppoints"])
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
