import * as profileType from "./types/profile.type";
import * as refreshType from "./types/refresh.type";
import * as loginType from "./types/login.type";
import * as registerType from "./types/register.type";
import { Get, Post, Put, Delete } from "@lib/httpMethod";
import prisma from "@src/config/prisma.config";
import { Validate } from "@lib/validate";
import { ConflictError } from "@lib/exception";

export default class AuthController {

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
                passwordHash: password, // In a real application, hash the password before storing it
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
                    select: {
                        Roles: true
                    }
                }
            }
        });

        if (!user || user.passwordHash !== password) { // In a real application, use a secure password comparison
            throw new Error("Invalid username or password");
        }

        return loginType.loginRes.parse({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: user.UserRoles.map(ur => ur.Roles.name),
            accessToken: "dummy-access-token", // TODO: Generate JWT or similar token
            refreshToken: "dummy-refresh-token" // TODO: Generate refresh token
        });
    }


    @Post("/refresh")
    @Validate(refreshType.schema)
    async refresh(req: refreshType.Req): Promise<refreshType.RerturnType> {
        const { refreshToken } = req.body;
        // TODO: Validate the refresh token and generate a new access token
        return refreshType.refreshRes.parse({
            accessToken: "ddddd"
        });
    }


    @Get("/profile")
    @Validate(profileType.schema)
    async profile(req: profileType.Req): Promise<profileType.RerturnType> {
        throw new Error();
    }

}
