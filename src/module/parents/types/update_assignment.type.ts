import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { ObjectType } from "@lib/validate";
import { IsString, IsObject, IsEnum, IsNumber } from "@lib/type_declaration";

/*
 {
  "routeId": "route1",
  "stopId": "stop12",
  "direction": "PICKUP"
}

 */
export class update_assignmentReqBody {
    @IsString()
    routeId: string;

    @IsString()
    stopId: string;

    @IsEnum({
        value: ["PICKUP", "DROPOFF"]
    })
    direction: "PICKUP" | "DROPOFF";
}
export class update_assignmentReqQuery {}
export class update_assignmentReqParams {
    @IsString()
    studentId: string;
}

/*
     "id": "assign_999",
    "studentId": "stu01",
    "routeId": "route1",
    "stopId": "stop12",
    "direction": "PICKUP",
    "effectiveFrom": "2025-11-23",
    "effectiveTo": null
 */
export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class update_assignmentRes extends ObjectType {
    @IsString()
    id: string;

    @IsString()
    studentId: string;

    @IsString()
    routeId: string;

    @IsString()
    stopId: string;

    @IsEnum({
        value: ["PICKUP", "DROPOFF"]
    })
    direction: "PICKUP" | "DROPOFF";

    @IsString()
    effectiveFrom: string;

    @IsString({ optional: true })
    effectiveTo?: string;
}

export const schema = {
    res: [update_assignmentRes],
    body: update_assignmentReqBody,
    query: update_assignmentReqQuery,
    params: update_assignmentReqParams
};

export type RerturnType = typeof schema['res'] extends (infer R)[] 
  ? R extends new (...args: any[]) => any 
    ? InstanceType<R>
    : never
  : never;

export type Req = Request<update_assignmentReqParams, any, update_assignmentReqBody, update_assignmentReqQuery>;
