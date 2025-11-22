import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { ObjectType } from "@lib/validate";
import { IsString } from "@lib/type_declaration";

export class trip_stoppoint_arriveReqBody {}
export class trip_stoppoint_arriveReqQuery {}
export class trip_stoppoint_arriveReqParams {
    @IsString()
    tripId: string;

    @IsString()
    spId: string;
}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class trip_stoppoint_arriveRes extends ObjectType {
    @IsString()
    stopId: string;

    @IsString()
    status: string;

    @IsString()
    arrivedAt: string;
}

export const schema = {
    res: [trip_stoppoint_arriveRes],
    body: trip_stoppoint_arriveReqBody,
    query: trip_stoppoint_arriveReqQuery,
    params: trip_stoppoint_arriveReqParams
};

export type RerturnType = typeof schema['res'] extends (infer R)[] 
  ? R extends new (...args: any[]) => any 
    ? InstanceType<R>
    : never
  : never;

export type Req = Request<trip_stoppoint_arriveReqParams, any, trip_stoppoint_arriveReqBody, trip_stoppoint_arriveReqQuery>;
