import { NotFoundError } from "@lib/exception";
import { Delete, Get, Post, Put, Summary, useAuth } from "@lib/httpMethod";
import { Validate } from "@lib/validate";
import prisma from "@src/config/prisma.config";
import { BusData, BusMetadata } from "@src/types/share.type";
import { JWT_AUTH, usePremisstion } from "@src/utils/jwt";
import { v4 as uuidv4 } from "uuid";
import * as createBusType from "./types/createBus.type";
import * as deleteBusType from "./types/deleteBus.type";
import * as getAllType from "./types/getAll.type";
import * as getByIdType from "./types/getById.type";
import * as updateBusType from "./types/updateBus.type";

export default class BusesController {
  @Summary("Get all buses")
  @Get("/")
  @Validate(getAllType.schema)
  @useAuth(JWT_AUTH)
  @usePremisstion(["read:bus"])
  async getAll(req: getAllType.Req): Promise<getAllType.RerturnType> {
    const { page, limit, search } = req.query;
    const where = search
      ? {
          OR: [
            { licensePlate: { contains: search } },
          ],
        }
      : {};

    const [total, buses] = await Promise.all([
      prisma.bus.count({ where }),
      prisma.bus.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { id: "asc" },
      }),
    ]);

    return getAllType.getAllRes.parse({
      data: buses.map((bus) =>
        BusData.parse({
          id: bus.id,
          licensePlate: bus.licensePlate,
          capacity: bus.capacity,
          metadata: BusMetadata.parse(bus.meta || {}),
        })
      ),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  }

  @Summary("Get bus by ID")
  @Get("/:id")
  @Validate(getByIdType.schema)
  @useAuth(JWT_AUTH)
  @usePremisstion(["read:bus_detail"])
  async getById(req: getByIdType.Req): Promise<getByIdType.RerturnType> {
    const { id } = req.params;
    const bus = await prisma.bus.findUnique({
      where: { id },
    });

    if (!bus) {
      throw new NotFoundError("Bus not found");
    }

    return getByIdType.getByIdRes.parse({
      id: bus.id,
      licensePlate: bus.licensePlate,
      capacity: bus.capacity,
      metadata: BusMetadata.parse(bus.meta || {}),
    });
  }

  @Summary("Create a new bus")
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
        meta: metadata as any,
      },
    });

    return createBusType.createBusRes.parse({
      id: bus.id,
      licensePlate: bus.licensePlate,
      capacity: bus.capacity,
      metadata: BusMetadata.parse(bus.meta || {}),
    });
  }

  @Summary("Update a bus")
  @Put("/:id")
  @Validate(updateBusType.schema)
  @useAuth(JWT_AUTH)
  @usePremisstion(["update:bus"])
  async updateBus(req: updateBusType.Req): Promise<updateBusType.RerturnType> {
    const { id } = req.params;
    const { licensePlate, capacity, metadata } = req.body;

    const existingBus = await prisma.bus.findUnique({
      where: { id },
    });

    if (!existingBus) {
      throw new NotFoundError("Bus not found");
    }

    const updatedBus = await prisma.bus.update({
      where: { id },
      data: {
        licensePlate,
        capacity,
        meta: metadata as any,
      },
    });

    return updateBusType.updateBusRes.parse({
      id: updatedBus.id,
      licensePlate: updatedBus.licensePlate,
      capacity: updatedBus.capacity,
      metadata: BusMetadata.parse(updatedBus.meta || {}),
    });
  }

  @Summary("Delete a bus")
  @Delete("/:id")
  @Validate(deleteBusType.schema)
  @useAuth(JWT_AUTH)
  @usePremisstion(["delete:bus"])
  async deleteBus(req: deleteBusType.Req): Promise<deleteBusType.RerturnType> {
    const { id } = req.params;
    const bus = await prisma.bus.findUnique({
      where: { id },
    });

    if (!bus) {
      throw new NotFoundError("Bus not found");
    }

    await prisma.bus.delete({
      where: { id },
    });

    return deleteBusType.deleteBusRes.parse({});
  }
}
