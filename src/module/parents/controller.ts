import * as today_tripType from "./types/today_trip.type";
import * as student_infoType from "./types/student_info.type";
import * as getStudentsType from "./types/getStudents.type";
import { Get, Post, Put, Delete, useAuth, Summary } from "@lib/httpMethod";
import prisma from "@src/config/prisma.config";
import { Validate } from "@lib/validate";
import { JWT_AUTH, usePremisstion } from "@src/utils/jwt";
import { GeoLocation, StopPointsData, StudentData } from "@src/types/share.type";
import { StopPoints } from "@src/module/routes/types/create.type";
import { NotBeforeError } from "jsonwebtoken";
import { NotFoundError } from "@lib/exception";

export default class ParentController {

    @Summary("Get students for parent")
    @Get("/students")
    @Validate(getStudentsType.schema)
    @useAuth(JWT_AUTH)
    async getStudents(req: getStudentsType.Req) {
        const userId = req.user.id;
        // const current_day = new Date();
        // current_day.setHours(0, 0, 0, 0);
        // const endOfDay = new Date();
        // endOfDay.setHours(23, 59, 59, 999);
        const students = await prisma.student.findMany({
            where: {
                userId: userId
            },
            include: {
                // StudentAssignment: {
                //     where: {
                //         effectiveFrom: {
                //             lte: current_day
                //         },
                //         OR: [
                //             {
                //                 effectiveTo: {
                //                     gte: current_day
                //                 }
                //             },
                //             {
                //                 effectiveTo: null
                //             }
                //         ]
                //     },
                //     include: {
                //         Route: {
                //             include: {
                //                 Schedule: true
                //             }
                //         }
                //     }
                // }
            }
        })

        const formattedStudents = students.map(student => {
            // const pickup = student.StudentAssignment.find(assignment => assignment.direction === "PICKUP");
            // const dropoff = student.StudentAssignment.find(assignment => assignment.direction === "DROPOFF");
            return getStudentsType.Students.parse({
                id: student.id,
                name: student.name,
                meta: student.meta as any,

                // currentAssignment: getStudentsType.CurrentAssignment.parse({
                //     pickup: pickup ? getStudentsType.StudentAssignment.parse({
                //         id: pickup.id,
                //         busId: pickup.Route.Schedule[0]?.busId || "",
                //         stopPointId: pickup.stopId,
                //         effectiveFrom: pickup.effectiveFrom.toISOString(),
                //         effectiveTo: pickup.effectiveTo ? pickup.effectiveTo.toISOString() : null
                //     }) : null,
                //     dropoff: dropoff ? getStudentsType.StudentAssignment.parse({
                //         id: dropoff.id,
                //         busId: dropoff.Route.Schedule[0]?.busId || "",
                //         stopPointId: dropoff.stopId,
                //         effectiveFrom: dropoff.effectiveFrom.toISOString(),
                //         effectiveTo: dropoff.effectiveTo ? dropoff.effectiveTo.toISOString() : null
                //     }) : null
                // })
            })
        })

        return getStudentsType.getStudentsRes.parse({
            data: formattedStudents,
            total: formattedStudents.length
        })
    }




    @Get("/student-info/:studentId")
    @Summary("Get student info for parent")
    @useAuth(JWT_AUTH)
    @Validate(student_infoType.schema)
    async student_info(req: student_infoType.Req): Promise<student_infoType.RerturnType> {
        const { studentId } = req.params;
        const currentDay = new Date();
        currentDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const student = await prisma.student.findUnique({
            where: {
                id: studentId
            },
            include: {
                StudentAssignment: {
                    where: {
                        effectiveFrom: {
                            lte: currentDay
                        },
                        OR: [
                            {
                                effectiveTo: {
                                    gte: currentDay
                                }
                            },
                            {
                                effectiveTo: null
                            }
                        ]
                    },
                    include: {
                        Route: {
                            include: {
                                Schedule: true
                            }
                        },
                        StopPoint: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        });

        if (!student) {
            throw new NotFoundError("Student not found");
        }

        const pickupAssignment = student.StudentAssignment.find(assignment => assignment.direction === "PICKUP");
        const dropoffAssignment = student.StudentAssignment.find(assignment => assignment.direction === "DROPOFF");

        const r = student_infoType.student_infoRes.parse({
            studentId: student.id,
            name: student.name,
            assignment: student_infoType.student_infoReqAssignment.parse({
                pickupStop: pickupAssignment ? student_infoType.student_infoReqAssignmet_Stop.parse({
                    routeId: pickupAssignment.Route.Schedule[0]?.routeId || "",
                    id: pickupAssignment.stopId,
                    name: pickupAssignment.StopPoint.name || ""
                }) : null,
                dropoffStop: dropoffAssignment ? student_infoType.student_infoReqAssignmet_Stop.parse({
                    routeId: dropoffAssignment.Route.Schedule[0]?.routeId || "",
                    id: dropoffAssignment.stopId,
                    name: dropoffAssignment.StopPoint.name || ""
                }) : null
            })
        }) as student_infoType.student_infoRes;

        return r;
    }


    @Get("/today-trip/:studentId")
    @Validate(today_tripType.schema)
    async today_trip(req: today_tripType.Req): Promise<today_tripType.RerturnType> {
        const { studentId } = req.params;

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);


        const trip = await prisma.trip.findMany({
            where: {
                Schedule: {
                    Route: {
                        StudentAssignment: {
                            some: {
                                studentId: studentId,
                                effectiveFrom: {
                                    lte: today
                                },
                                OR: [
                                    {
                                        effectiveTo: {
                                            gte: today
                                        }
                                    },
                                    {
                                        effectiveTo: null
                                    }
                                ]
                            }
                        }
                    }
                },
                date: {
                    gte: today,
                    lte: endOfDay
                },
            }
        });

        if (!trip || !trip.length) {
            throw new NotFoundError("No trip found for today");
        }


        const pickupTrip = trip.find(t => t.type === "DISPATCH")!;
        const dropoffTrip = trip.find(t => t.type === "RETURN")!;

        let currentTrip: typeof pickupTrip;

        if (pickupTrip.status === "COMPLETED") {
            currentTrip = dropoffTrip;
        }
        else {
            currentTrip = pickupTrip;
        }


        throw new Error();
    }

}
