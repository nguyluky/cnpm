import * as getAllType from "./types/getAll.type";
import { Get, Post, Put, Delete } from "@lib/httpMethod";
import prisma from "@src/config/prisma.config";
import { Validate } from "@lib/validate";
import { StopPointsData } from "@src/types/share.type";

export default class StoppointsController {

    @Get("/")
    @Validate(getAllType.schema)
    async getAll(req: getAllType.Req): Promise<getAllType.RerturnType> {

        const data = await prisma.stopPoint.findMany({
        });
        const total = await prisma.stopPoint.count();
        return getAllType.getAllRes.parse({
            data: data.map(item => StopPointsData.parse({
                id: item.id,
                name: item.name,
                location: item.location as any,
                meta: item.meta as any,

            })),
            total,
        })
    }

}
