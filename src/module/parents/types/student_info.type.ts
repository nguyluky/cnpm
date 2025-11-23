import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { ObjectType } from "@lib/validate";
import { IsObject, IsString } from "@lib/type_declaration";

/*
 * {
  "studentId": "st01",
  "name": "Nguyễn Minh Khang",
  "assignment": {
    "routeId": "routeA",
    "pickupStop": {
      "id": "stop12",
      "name": "Cổng nhà A"
    },
    "dropoffStop": {
      "id": "stop88",
      "name": "Cổng trường"
    }
  }
}

 * **/

export class student_infoReqBody {}
export class student_infoReqQuery {}
export class student_infoReqParams {
    @IsString()
    studentId: string;
}

export class student_infoReqAssignmet_Stop extends ObjectType {
    @IsString()
    id: string;

    @IsString()
    name: string;

    @IsString()
    routeId: string;
}

export class student_infoReqAssignment extends ObjectType {

    @IsObject(student_infoReqAssignmet_Stop, {
        optional: true
    })
    pickupStop!: student_infoReqAssignmet_Stop;

    @IsObject(student_infoReqAssignmet_Stop, {
        optional: true
    })
    dropoffStop!: student_infoReqAssignmet_Stop;
}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class student_infoRes extends ObjectType {
    @IsString()
    studentId: string;

    @IsString()
    name: string;

    @IsObject(student_infoReqAssignment)
    assignment: student_infoReqAssignment;
}

export const schema = {
    res: [student_infoRes],
    body: student_infoReqBody,
    query: student_infoReqQuery,
    params: student_infoReqParams
};

export type RerturnType = typeof schema['res'] extends (infer R)[] 
  ? R extends new (...args: any[]) => any 
    ? InstanceType<R>
    : never
  : never;

export type Req = Request<student_infoReqParams, any, student_infoReqBody, student_infoReqQuery>;
