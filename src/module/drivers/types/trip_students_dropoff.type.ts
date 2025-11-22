import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { ObjectType } from "@lib/validate";
import { IsString } from "@lib/type_declaration";

export class trip_students_dropoffReqBody {}
export class trip_students_dropoffReqQuery {}
export class trip_students_dropoffReqParams {
    @IsString()
    tripId: string;

    @IsString()
    studentId: string;
}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class trip_students_dropoffRes extends ObjectType {
    @IsString()
    studentId: string;

    @IsString()
    status: string;

    @IsString()
    droppedAt: string;
}

export const schema = {
    res: [trip_students_dropoffRes],
    body: trip_students_dropoffReqBody,
    query: trip_students_dropoffReqQuery,
    params: trip_students_dropoffReqParams
};

export type RerturnType = typeof schema['res'] extends (infer R)[] 
  ? R extends new (...args: any[]) => any 
    ? InstanceType<R>
    : never
  : never;

export type Req = Request<trip_students_dropoffReqParams, any, trip_students_dropoffReqBody, trip_students_dropoffReqQuery>;
