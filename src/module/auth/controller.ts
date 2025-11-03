import * as profileType from "./types/profile.type";
import * as refreshType from "./types/refresh.type";
import * as loginType from "./types/login.type";
import * as registerType from "./types/register.type";
import { Get, Post, Put, Delete, Summary } from "@lib/httpMethod";
import prisma from "@src/config/prisma.config";
import { Validate } from "@lib/validate";
import { BadRequestError, ConflictError } from "@lib/exception";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "@src/utils/jwt";

export default class AuthController {

    @Summary("Register")
    @Post("/register")
    @Validate(registerType.schema)
    async register(req: registerType.Req): Promise<registerType.RerturnType> {
        const { username, password, email } = req.body;

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { username }
        });
        if (existingUser) {
            throw new ConflictError("Username already taken");
        }

        // Create new user
        const user = await prisma.user.create({
            data: {
                username,
                // TODO: 
                passwordHash: bcrypt.hashSync(password, 10), // In a real application, hash the password
                email,
            },
            select: {
                id: true,
                username: true,
                email: true,
                UserRoles: {
                    select: {
                        Roles: true
                    }
                }
            }
        });


        return registerType.registerRes.parse({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: user.UserRoles.map(ur => ur.Roles.name),
        })
    }

    @Summary("Login")
    @Post("/login")
    @Validate(loginType.schema)
    async login(req: loginType.Req): Promise<loginType.RerturnType> {
        const { username, password } = req.body;

        // Find user by username
        const user = await prisma.user.findUnique({
            where: { username },
            select: {
                id: true,
                username: true,
                email: true,
                passwordHash: true,
                UserRoles: {
                    include: {
                        Roles: {
                            include: {
                                RolePermissions: {
                                    include: {
                                        Permission: true
                                    }
                                }
                            }
                        }

                    }
                }
            }
        });

        if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
            throw new BadRequestError("Invalid username or password");
        }


        const accessToken = generateAccessToken({
            id: user.id,
            username: user.username,
            roles: user.UserRoles.map(ur => ur.Roles.name),
            email: user.email,
            permissions: user.UserRoles.flatMap(ur => ur.Roles.RolePermissions.map(rp => rp.Permission.name))
        });

        const refreshToken = generateRefreshToken(user.id)

        return loginType.loginRes.parse({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: user.UserRoles.map(ur => ur.Roles.name),
            accessToken: accessToken,
            refreshToken: refreshToken,
            permissions: user.UserRoles.flatMap(ur => ur.Roles.RolePermissions.map(rp => rp.Permission.name))
        });
    }

    @Summary("Refresh Token")
    @Post("/refresh")
    @Validate(refreshType.schema)
    async refresh(req: refreshType.Req): Promise<refreshType.RerturnType> {
        const { refreshToken } = req.body;

        const data = verifyRefreshToken(refreshToken);

        const user = await prisma.user.findUnique({
            where: { id: data.userid },
            select: {
                id: true,
                username: true,
                email: true,
                UserRoles: {
                    include: {
                        Roles: {
                            include: {
                                RolePermissions: {
                                    include: {
                                        Permission: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        if (!user) {
            throw new BadRequestError("Invalid refresh token");
        }

        const accessToken = generateAccessToken({
            id: user.id,
            username: user.username,
            roles: user.UserRoles.map(ur => ur.Roles.name),
            email: user.email,
            permissions: user.UserRoles.flatMap(ur => ur.Roles.RolePermissions.map(rp => rp.Permission.name))
        });

        return refreshType.refreshRes.parse({
            accessToken: accessToken
        });
    }


    @Summary("Get User Profile")
    @Get("/profile")
    @Validate(profileType.schema)
    async profile(req: profileType.Req): Promise<profileType.RerturnType> {
        throw new Error();
    }

}
