import * as getUserByIdType from "./types/getUserById.type";
import { ConflictError, NotFoundError } from "@lib/exception";
import { Get, Post, Summary } from "@lib/httpMethod";
import { Validate } from "@lib/validate";
import prisma from "@src/config/prisma.config";
import * as addPermissionType from "./types/addPermission.type";
import * as createNewUserType from "./types/createNewUser.type";
import * as createPermissionType from "./types/createPermission.type";
import * as getAllPermissionType from "./types/getAllPermission.type";
import * as getAllRolesType from "./types/getAllRoles.type";
import * as getAllUserType from "./types/getAllUser.type";
import * as shareType from "./types/share.type";

export default class UsersController {

    @Get("/")
    @Summary("Get All Users")
    @Validate(getAllUserType.schema)
    async getAllUser(req: getAllUserType.Req): Promise<getAllUserType.RerturnType> {
        const { page, limit, search, role } = req.query;
        const where = {
            AND: [
                search
                    ? {
                        OR: [
                            { username: { contains: search } },
                            { email: { contains: search } },
                        ],
                    }
                    : {},
                role
                    ? {
                        UserRoles: {
                            some: {
                                Roles: {
                                    name: {
                                        equals: role
                                    }
                                },
                            },
                        },
                    }
                    : {},
            ],
        };

        const [total, users] = await Promise.all([
            prisma.user.count({ where }),
            prisma.user.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: "desc" },
                include: {
                    UserRoles: {
                        include: {
                            Roles: true
                        },
                    }
                },
            }),
        ]);

        return getAllUserType.getAllUserRes.parse({
            data: users.map((user) =>
                shareType.UserData.parse({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    createdAt: user.createdAt.toISOString(),
                    updatedAt: user.updatedAt.toISOString(),
                    roles: user.UserRoles.map(ur => ur.Roles.name),
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

    @Get("/roles")
    @Summary("Get All Roles")
    @Validate(getAllRolesType.schema)
    async getAllRoles(req: getAllRolesType.Req): Promise<getAllRolesType.RerturnType> {
        const roles = await prisma.roles.findMany({
            include: {
                RolePermissions: {
                    include: {
                        Permission: true
                    }
                }
            },
        });

        return getAllRolesType.getAllRolesRes.parse({
            data: roles.map((role) =>
                shareType.RoleData.parse({
                    id: role.id,
                    name: role.name,
                    permissions: role.RolePermissions.map(rp => rp.Permission.name),
                })
            ),
            total: roles.length,
        });
    }


    @Post("/")
    @Summary("Create New User")
    @Validate(createNewUserType.schema)
    async createNewUser(req: createNewUserType.Req): Promise<createNewUserType.RerturnType> {
        const { username, email, password, roles } = req.body;
        throw new Error();
    }



    @Get("/permissions")
    @Summary("Get All Permissions")
    @Validate(getAllPermissionType.schema)
    async getAllPermission(req: getAllPermissionType.Req): Promise<getAllPermissionType.RerturnType> {
        const permissions = await prisma.permission.findMany();

        return getAllPermissionType.getAllPermissionRes.parse({
            data: permissions.map((permission) =>
                getAllPermissionType.PermissionData.parse({
                    id: permission.id,
                    name: permission.name,
                })
            ),
            total: permissions.length,
        });
    }

    @Post("/permission")
    @Summary("Create Permission")
    @Validate(createPermissionType.schema)
    async createPermission(req: createPermissionType.Req): Promise<createPermissionType.RerturnType> {
        const { name } = req.body;

        const existingPermission = await prisma.permission.findUnique({
            where: { name }
        });

        if (existingPermission) {
            throw new ConflictError("Permission already exists");
        }

        const permission = await prisma.permission.create({
            data: { name }
        });

        return createPermissionType.createPermissionRes.parse({
            id: permission.id,
            name: permission.name,
        });
    }

    @Post("/role/permission")
    @Summary("Add Permission to Role")
    @Validate(addPermissionType.schema)
    async updateRoles(req: addPermissionType.Req): Promise<addPermissionType.RerturnType> {
        const { roleId, permissions } = req.body;

        // STEP 1: Query outside transaction – very fast
        const role = await prisma.roles.findUnique({
            where: { id: roleId },
            include: {
                RolePermissions: {
                    select: {
                        permissionId: true,
                        Permission: { select: { name: true } }
                    }
                }
            }
        });

        if (!role) throw new NotFoundError("Role not found");

        const existingPermissions = role.RolePermissions.map(rp => rp.Permission.name);
        const permissionsToAdd = permissions.filter(p => !existingPermissions.includes(p));
        const permissionsToRemove = existingPermissions.filter(p => !permissions.includes(p));

        const allNeededPermissionNames = [...permissionsToAdd, ...permissionsToRemove];

        const permissionRecords = await prisma.permission.findMany({
            where: { name: { in: allNeededPermissionNames } },
            select: { id: true, name: true }
        });

        // Create map
        const permissionMap = new Map(permissionRecords.map(p => [p.name, p.id]));

        // STEP 2: Only transaction for the update part → extremely fast
        await prisma.$transaction(async (tx) => {
            if (permissionsToAdd.length > 0) {
                await tx.rolePermissions.createMany({
                    data: permissionsToAdd.map(name => ({
                        roleId,
                        permissionId: permissionMap.get(name)!
                    }))
                });
            }

            if (permissionsToRemove.length > 0) {
                await tx.rolePermissions.deleteMany({
                    where: {
                        roleId,
                        permissionId: { in: permissionsToRemove.map(name => permissionMap.get(name)!) }
                    }
                });
            }
        });



        const updatedRole = await prisma.roles.findUnique({
            where: { id: roleId },
            include: {
                RolePermissions: {
                    include: {
                        Permission: true
                    }
                }
            }
        });

        if (!updatedRole) {
            throw new NotFoundError("Role not found after update");
        }

        return addPermissionType.addPermissionRes.parse({
            id: updatedRole.id,
            name: updatedRole.name,
            permissions: updatedRole.RolePermissions.map(rp => rp.Permission.name),
        });
    }

    @Get("/:id")
    @Summary("Get User by ID")
    @Validate(getUserByIdType.schema)
    async getUserById(req: getUserByIdType.Req): Promise<getUserByIdType.RerturnType> {
        const { id } = req.params;

        const user = await prisma.user.findUnique({
            where: { id },
            include: {
                UserRoles: {
                    include: {
                        Roles: true
                    },
                }
            },
        });

        if (!user) {
            throw new NotFoundError("User not found");
        }

        return getUserByIdType.getUserByIdRes.parse({
            id: user.id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString(),
            roles: user.UserRoles.map(ur => ur.Roles.name),
        });
    }


}
