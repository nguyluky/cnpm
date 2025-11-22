import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { ObjectType } from "@lib/validate";
import { IsString } from "@lib/type_declaration";

export class trip_stoppoint_endReqBody {}
export class trip_stoppoint_endReqQuery {}
export class trip_stoppoint_endReqParams {
    @IsString()
    tripId: string;
}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class trip_stoppoint_endRes extends ObjectType {
    @IsString()
    tripId: string;

    @IsString()
    status: string;

    @IsString()
    startAt: string;

    @IsString()
    endAt: string;
}

export const schema = {
    res: [trip_stoppoint_endRes],
    body: trip_stoppoint_endReqBody,
    query: trip_stoppoint_endReqQuery,
    params: trip_stoppoint_endReqParams
};

export type RerturnType = typeof schema['res'] extends (infer R)[] 
  ? R extends new (...args: any[]) => any 
    ? InstanceType<R>
    : never
  : never;

export type Req = Request<trip_stoppoint_endReqParams, any, trip_stoppoint_endReqBody, trip_stoppoint_endReqQuery>;
