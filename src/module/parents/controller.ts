import * as updateStoppointType from "./types/updateStoppoint.type";
import * as getNotificationsType from "./types/getNotifications.type";
import * as getStudentTrackType from "./types/getStudentTrack.type";
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

    @Get("/students")
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

        if (!students) {
            throw new NotFoundError("Student not found")
        }

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


    @Get("/students/:id/track")
    @Validate(getStudentTrackType.schema)
    async getStudentTrack(req: getStudentTrackType.Req): Promise<getStudentTrackType.RerturnType> {
        const { id } = req.params;
        const studentTrack = await prisma.student.findUnique({
            where: { id },
            include: {
                StudentAttendance: {
                    include: {
                        Trip: {
                            select: {
                                location: true
                            }
                        }
                    }
                }
            }
        })

        if (!studentTrack) {
            throw new NotFoundError("Student not found");
        }

        const attendance = studentTrack.StudentAttendance && studentTrack.StudentAttendance[0];
        if (!attendance || !attendance.Trip || !attendance.Trip.location) {
            throw new NotFoundError("Student trip not found");
        }

        return getStudentTrackType.getStudentTrackRes.parse({
            studentId: id,
            location: GeoLocation.parse(attendance.Trip.location)
        })
    }

    @Get("/notifications")
    @Validate(getNotificationsType.schema)
    async getNotifications(req: getNotificationsType.Req): Promise<getNotificationsType.RerturnType> {
        throw new Error();
    }

    @Put("/students/:id/stoppoint")
    @Validate(updateStoppointType.schema)
    async updateStoppoint(req: updateStoppointType.Req): Promise<updateStoppointType.RerturnType> {
        const { id } = req.params;
        const data = req.body;

        const assignment = await prisma.studentAssignment.findFirst({
            where: { studentId: id }
        });

        if (!assignment) {
            throw new NotFoundError("Stoppoint not found")
        }

        const updated = await prisma.studentAssignment.update({
            where: { id: assignment.id },
            data: data as any
        });

        return {
            message: "Update stoppoint success",
            data: updated,
            success: true
        };
    }
}
