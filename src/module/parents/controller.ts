import * as getStudentsType from "./types/getStudents.type";
import { Get, Post, Put, Delete, useAuth } from "@lib/httpMethod";
import prisma from "@src/config/prisma.config";
import { Validate } from "@lib/validate";
import { JWT_AUTH } from "@src/utils/jwt";
import { GeoLocation, StopPointsData, StudentData } from "@src/types/share.type";
import { StopPoints } from "@src/module/routes/types/create.type";
import { NotBeforeError } from "jsonwebtoken";
import { NotFoundError } from "@lib/exception";

export default class ParentController {

    @Get("/getStudents")
    @Validate(getStudentsType.schema)
    @useAuth(JWT_AUTH)
    async getStudents(req: getStudentsType.Req) {
        const userId = req.user.id;
        const students = await prisma.student.findMany({
            where: {
                userId : userId
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

        const formattedStudents = students.map(student => getStudentsType.Students.parse({
            id: student.id,
            name: student.name,
            stopPoint: StopPointsData.parse({
                id: student.StudentAssignment.map(getStudentsType.studentAssignment => student),
                name: stop.StopPoint.name,
                location: GeoLocation.parse(stop.StopPoint.location),
                sequence: stop.StopPoint.sequence,
                meta: stop.StopPoint.meta as any
            }),
            status: student.StudentAttendance[0].status as any
        }))

        // throw new NotFoundError("")

        // const formattedStudents = students.map(student => StudentData.parse({
        //     id: student.id,
        //     name: student.name,
        //     stopPoint: student.StudentAttendance.
        // }))

        return getStudentsType.getStudentsRes.parse({
            data: formattedStudents,
            total: formattedStudents.length
        })
        
        // return students;
        
        throw new Error();
    }

}
