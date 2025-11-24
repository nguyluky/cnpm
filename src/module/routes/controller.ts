import { NotFoundError } from "@lib/exception";
import { Delete, Get, Post, Put, Summary, useAuth } from "@lib/httpMethod";
import { Validate } from "@lib/validate";
import prisma from "@src/config/prisma.config";
import { AnyObject, GeoLocation, RouteData } from "@src/types/share.type";
import { JWT_AUTH, usePremisstion } from "@src/utils/jwt";
import { v4 as uuidv4 } from "uuid";
import { sendNotification } from "@src/utils/socketio";
import * as createType from "./types/create.type";
import * as deleteByIdType from "./types/deleteById.type";
import * as getAllType from "./types/getAll.type";
import * as getByIdType from "./types/getById.type";
import * as updateType from "./types/update.type";

export default class routescontroller {

    @Summary("Get all routes")
    @Get("/")
    @Validate(getAllType.schema)
    @useAuth(JWT_AUTH)
    @usePremisstion(["read:route"])
    async getAll(req: getAllType.Req): Promise<getAllType.RerturnType> {
        const { page, limit, search } = req.query;
        const where = search
            ? {
                OR: [
                    { name: { contains: search} },
                    { id: { contains: search} },
                ],
            }
            : {};

        const total = await prisma.route.count({ where });
        const data = await prisma.route.findMany({
            where,
            skip: (page - 1) * limit,
            take: limit,
            orderBy: { createdAt: "desc" },
        });

        return getAllType.getAllRes.parse({
            data: data.map((item) =>
                RouteData.parse({
                    id: item.id,
                    name: item.name,
                    startLocation: GeoLocation.parse(item.startLocation),
                    endLocation: GeoLocation.parse(item.endLocation),
                    metadata: item.meta as any,
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

    @Summary("Get route by ID")
    @Get("/:id")
    @Validate(getByIdType.schema)
    @useAuth(JWT_AUTH)
    @usePremisstion(["read:route_detail"])
    async getById(req: getByIdType.Req): Promise<getByIdType.RerturnType> {
        const { id } = req.params;
        const route = await prisma.route.findUnique({
            where: { id },
            include: {
                RouteStopPoint: {
                    include: {
                        StopPoint: true,
                    },
                },
            },
        });
        if (!route) throw new NotFoundError("Route not found");

        return getByIdType.getByIdRes.parse({
            id: route.id,
            name: route.name,
            startLocation: GeoLocation.parse(route.startLocation),
            endLocation: GeoLocation.parse(route.endLocation),
            metadata: AnyObject.parse(route.meta),
            createdAt: route.createdAt.toISOString(),
            stopPoints: route.RouteStopPoint.map(({ StopPoint: sp, sequence }) =>
                getByIdType.StopPointsWithSequence.parse({
                    id: sp.id,
                    name: sp.name,
                    location: GeoLocation.parse(sp.location),
                    sequence: sequence,
                    meta: AnyObject.parse(sp.meta),
                })
            ),
        });
    }

    @Summary("Create a new route")
    @Post("/")
    @Validate(createType.schema)
    @useAuth(JWT_AUTH)
    @usePremisstion(["create:route"])
    async create(req: createType.Req): Promise<createType.RerturnType> {
        const { name, startLocation, endLocation, meta, stopPointIds } = req.body;
        const newRoute = await prisma.route.create({
            data: {
                id: uuidv4(),
                name,
                startLocation: startLocation as any,
                endLocation: endLocation as any,
                meta: meta ? (meta as any) : null,
                RouteStopPoint: {
                    create: stopPointIds.map((spId, index) => ({
                        stopPointId: spId,
                        sequence: index + 1,
                        direction: "PICKUP",
                    })),
                },
            },
            include: {
                RouteStopPoint: {
                    include: {
                        StopPoint: true,
                    },
                },
            },
        });

        return createType.createRes.parse({
            id: newRoute.id,
            name: newRoute.name,
            stopPoints: newRoute.RouteStopPoint.map(({ StopPoint: sp, sequence }) =>
                getByIdType.StopPointsWithSequence.parse({
                    id: sp.id,
                    name: sp.name,
                    location: GeoLocation.parse(sp.location),
                    sequence: sequence,
                    meta: AnyObject.parse(sp.meta),
                })
            ),
            createdAt: newRoute.createdAt.toISOString(),
        });
    }

    @Summary("Update a route")
    @Put("/:id")
    @Validate(updateType.schema)
    @useAuth(JWT_AUTH)
    @usePremisstion(["update:route"])
    async update(req: updateType.Req): Promise<updateType.RerturnType> {
        const { id } = req.params;
        const { name, meta, stopPointIds } = req.body;

        const existingRoute = await prisma.route.findUnique({
            where: { id },
            include: {
                RouteStopPoint: {
                    include: { StopPoint: true },
                },
            },
        });
        if (!existingRoute) throw new NotFoundError("Route not found");

        // Xóa an toàn: chỉ xóa RouteStopPoint của route này
        // ON DELETE CASCADE trong schema sẽ tự động xử lý
        await prisma.routeStopPoint.deleteMany({
            where: { routeId: id },
        });

        // Tạo lại các RouteStopPoint mới với sequence đúng
        await prisma.routeStopPoint.createMany({
            data: stopPointIds.map((spId, index) => ({
                routeId: id,
                stopPointId: spId,
                sequence: index + 1,
                direction: "PICKUP",
            })),
        });

        // Update thông tin route
        const updatedRoute = await prisma.route.update({
            where: { id },
            data: {
                name,
                meta: meta ? (meta as any) : null,
            },
            include: {
                RouteStopPoint: {
                    include: { StopPoint: true },
                },
            },
        });

        // Find all drivers with schedules using this route
        const schedulesUsingRoute = await prisma.schedule.findMany({
          where: { routeId: id },
          select: { driverId: true }
        });
        
        schedulesUsingRoute.forEach(schedule => {
          if (schedule.driverId) {
            sendNotification(schedule.driverId, {
              type: 'ROUTE_UPDATED',
              message: `Route "${name}" has been updated`,
              data: { id, name }
            });
          }
        });

        return updateType.updateRes.parse({
            id: updatedRoute.id,
            name: updatedRoute.name,
            updatedAt: updatedRoute.updatedAt.toISOString(),
        });
    }

    @Summary("Delete a route by ID")
    @Delete("/:id")
    @Validate(deleteByIdType.schema)
    @useAuth(JWT_AUTH)
    @usePremisstion(["delete:route"])
    async deleteById(
        req: deleteByIdType.Req
    ): Promise<deleteByIdType.RerturnType> {
        const { id } = req.params;

        const existingRoute = await prisma.route.findUnique({
            where: { id },
            include: {
                Schedule: true,
                StudentAssignment: true,
            },
        });

        if (!existingRoute) throw new NotFoundError("Route not found");

        // Kiểm tra xem route có đang được sử dụng không
        if (existingRoute.Schedule.length > 0) {
            throw new Error("Không thể xóa tuyến đường đang có lịch trình hoạt động");
        }

        if (existingRoute.StudentAssignment.length > 0) {
            throw new Error(
                "Không thể xóa tuyến đường đang có học sinh được phân công"
            );
        }

        // Xóa RouteStopPoint trước (mặc dù có CASCADE nhưng làm rõ ràng hơn)
        await prisma.routeStopPoint.deleteMany({
            where: { routeId: id },
        });

        // Xóa route
        await prisma.route.delete({ where: { id } });

        return deleteByIdType.deleteByIdRes.parse({});
    }
}
