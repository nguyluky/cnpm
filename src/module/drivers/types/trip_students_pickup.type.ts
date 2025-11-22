import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { ObjectType } from "@lib/validate";
import { IsString } from "@lib/type_declaration";

export class trip_students_pickupReqBody {}
export class trip_students_pickupReqQuery {}
export class trip_students_pickupReqParams {
    @IsString()
    tripId: string;

    @IsString()
    studentId: string;
}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class trip_students_pickupRes extends ObjectType {
    @IsString()
    studentId: string;

    @IsString()
    status: string;

    @IsString()
    pickedAt: string;
}

export const schema = {
    res: [trip_students_pickupRes],
    body: trip_students_pickupReqBody,
    query: trip_students_pickupReqQuery,
    params: trip_students_pickupReqParams
};

export type RerturnType = typeof schema['res'] extends (infer R)[] 
  ? R extends new (...args: any[]) => any 
    ? InstanceType<R>
    : never
  : never;

export type Req = Request<trip_students_pickupReqParams, any, trip_students_pickupReqBody, trip_students_pickupReqQuery>;
