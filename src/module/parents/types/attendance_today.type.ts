import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { ObjectType } from "@lib/validate";
import { IsEnum, IsString } from "@lib/type_declaration";

export class attendance_todayReqBody {}
export class attendance_todayReqQuery {}
export class attendance_todayReqParams {
    @IsString()
    studentId: string;
}

/*
 {
  "studentId": "stu01",
  "tripId": "trip888",
  "status": "PICKED_UP",
  "pickupTime": "2025-11-23T06:48:22.123Z",
  "dropoffTime": null
}
*/
export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class attendance_todayRes extends ObjectType {
    @IsString()
    studentId: string;

    @IsString({
        optional: true
    })
    tripId?: string;

    @IsEnum({
        value: ["PENDING", "PICKED_UP", "DROPPED_OFF", "MISSED"],
        optional: true
    })
    status?: "PENDING" | "PICKED_UP" | "DROPPED_OFF" | "MISSED";

    @IsString({ optional: true })
    pickupTime?: string;
    
    @IsString({ optional: true })
    dropoffTime?: string;

}

export const schema = {
    res: [attendance_todayRes],
    body: attendance_todayReqBody,
    query: attendance_todayReqQuery,
    params: attendance_todayReqParams
};

export type RerturnType = typeof schema['res'] extends (infer R)[] 
  ? R extends new (...args: any[]) => any 
    ? InstanceType<R>
    : never
  : never;

export type Req = Request<attendance_todayReqParams, any, attendance_todayReqBody, attendance_todayReqQuery>;
