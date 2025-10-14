import * as getStudentsType from "./types/getStudents.type";
import { Get, Post, Put, Delete, useAuth } from "@lib/httpMethod";
import prisma from "@src/config/prisma.config";
import { Validate } from "@lib/validate";
import { JWT_AUTH, usePremisstion } from "@src/utils/jwt";
import { GeoLocation, StopPointsData, StudentData } from "@src/types/share.type";
import { StopPoints } from "@src/module/routes/types/create.type";
import { NotBeforeError } from "jsonwebtoken";
import { NotFoundError } from "@lib/exception";

export default class ParentController {

    @Get("/getStudents")
    @Validate(getStudentsType.schema)
    @useAuth(JWT_AUTH)
    @usePremisstion(["read:parent_students"])
    async getStudents(req: getStudentsType.Req) {
        const userId = req.user.id;
        const students = await prisma.student.findMany({
            where: {
                userId: userId
            },
            include: {
                StudentAttendance: {
                    select: {
                        status: true
                    }
                },
                StudentAssignment: {
                    select: {
                        StopPoint: true
                    },
                }
            }
        })


        const formattedStudents = students.map(student => {
            const stopPoint = student.StudentAssignment[0]?.StopPoint;
            return getStudentsType.Students.parse({
                id: student.id,
                name: student.name,
                stopPoint: stopPoint ? StopPointsData.parse({
                    id: stopPoint.id,
                    name: stopPoint.name,
                    location: GeoLocation.parse(stopPoint.location),
                    meta: stopPoint.meta as any
                }) : null,
                status: "PENDING"
            })
        })

        return getStudentsType.getStudentsRes.parse({
            data: formattedStudents,
            total: formattedStudents.length
        })
    }

}
