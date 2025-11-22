import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { ObjectType } from "@lib/validate";
import { IsString } from "@lib/type_declaration";

export class trip_stoppoint_departReqBody {}
export class trip_stoppoint_departReqQuery {}
export class trip_stoppoint_departReqParams {
    @IsString()
    tripId: string;

    @IsString()
    spId: string;
}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class trip_stoppoint_departRes extends ObjectType {
    @IsString()
    stopId: string;

    @IsString()
    status: string;

    @IsString()
    departedAt: string;
}

export const schema = {
    res: [trip_stoppoint_departRes],
    body: trip_stoppoint_departReqBody,
    query: trip_stoppoint_departReqQuery,
    params: trip_stoppoint_departReqParams
};

export type RerturnType = typeof schema['res'] extends (infer R)[] 
  ? R extends new (...args: any[]) => any 
    ? InstanceType<R>
    : never
  : never;

export type Req = Request<trip_stoppoint_departReqParams, any, trip_stoppoint_departReqBody, trip_stoppoint_departReqQuery>;
