import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { ObjectType } from "@lib/validate";
import { IsBoolean, IsNumber, IsString } from "@lib/type_declaration";

export class trip_locationReqBody {
    @IsNumber()
    latitude: number;

    @IsNumber()
    longitude: number;
}
export class trip_locationReqQuery { }
export class trip_locationReqParams {

    @IsString()
    tripId: string;
}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class trip_locationRes extends ObjectType {
    @IsBoolean()
    ok: boolean = true;
}

export const schema = {
    res: [trip_locationRes],
    body: trip_locationReqBody,
    query: trip_locationReqQuery,
    params: trip_locationReqParams
};

export type RerturnType = typeof schema['res'] extends (infer R)[]
    ? R extends new (...args: any[]) => any
    ? InstanceType<R>
    : never
    : never;

export type Req = Request<trip_locationReqParams, any, trip_locationReqBody, trip_locationReqQuery>;
