import * as deleteBusType from "./types/deleteBus.type";
import * as createBusType from "./types/createBus.type";
import * as getByIdType from "./types/getById.type";
import * as getAllType from "./types/getAll.type";
import { Get, Post, Put, Delete, useAuth } from "@lib/httpMethod";
import prisma from "@src/config/prisma.config";
import { Validate } from "@lib/validate";
import { AnyObject, BusData } from "@src/types/share.type";
import { NotFoundError } from "@lib/exception";
import { v4 as uuidv4 } from "uuid";
import { JWT_AUTH, usePremisstion } from "@src/utils/jwt";

export default class BusesController {

    @Get("/")
    @Validate(getAllType.schema)
    @useAuth(JWT_AUTH)
    @usePremisstion(["read:bus"])
    async getAll(req: getAllType.Req): Promise<getAllType.RerturnType> {
        const { page, limit, search } = req.query;
        const where = search ? {
            OR: [
                { name: { contains: search, mode: "insensitive" } },
                { model: { contains: search, mode: "insensitive" } },
                { licensePlate: { contains: search, mode: "insensitive" } },
            ]
        } : {};

        const [total, buses] = await Promise.all([
            prisma.bus.count({ where }),
            prisma.bus.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { id: "asc" }
            })
        ]);


        return getAllType.getAllRes.parse({
            data: buses.map(bus => BusData.parse({
                id: bus.id,
                licensePlate: bus.licensePlate,
                capacity: bus.capacity,
                metadata: AnyObject.parse(bus.meta)
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
    @useAuth(JWT_AUTH)
    @usePremisstion(["read:bus_detail"])
    async getById(req: getByIdType.Req): Promise<getByIdType.RerturnType> {
        const { id } = req.params;
        const bus = await prisma.bus.findUnique({
            where: { id }
        });

        if (!bus) {
            throw new NotFoundError("Bus not found");
        }

        return getByIdType.getByIdRes.parse({
            id: bus.id,
            licensePlate: bus.licensePlate,
            capacity: bus.capacity,
            metadata: AnyObject.parse(bus.meta),
            test: "test"
        });
    }


    @Post("/")
    @Validate(createBusType.schema)
    @useAuth(JWT_AUTH)
    @usePremisstion(["create:bus"])
    async createBus(req: createBusType.Req): Promise<createBusType.RerturnType> {
        const { licensePlate, capacity, metadata } = req.body;
        const bus = await prisma.bus.create({
            data: {
                id: uuidv4(),
                licensePlate,
                capacity,
                meta: metadata as any
            }
        });

        return createBusType.createBusRes.parse({
            id: bus.id,
            licensePlate: bus.licensePlate,
            capacity: bus.capacity,
            metadata: AnyObject.parse(bus.meta)
        });
    }

    @Delete("/:id")
    @Validate(deleteBusType.schema)
    @useAuth(JWT_AUTH)
    @usePremisstion(["delete:bus"])
    async deleteBus(req: deleteBusType.Req): Promise<deleteBusType.RerturnType> {
        const { id } = req.params;
        const bus = await prisma.bus.findUnique({
            where: { id }
        });

        if (!bus) {
            throw new NotFoundError("Bus not found");
        }

        await prisma.bus.delete({
            where: { id }
        });

        return deleteBusType.deleteBusRes.parse({});
    }
}
