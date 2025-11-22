import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { ObjectType } from "@lib/validate";
import { RequestWithUser } from "@src/utils/jwt";
import { Formats, IsString } from "@lib/type_declaration";

export class trip_startReqBody { }
export class trip_startReqQuery { }
export class trip_startReqParams {
    @IsString()
    id: string;
}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class trip_startRes extends ObjectType {
    @IsString()
    tripId: string;

    @IsString()
    status: string;

    @IsString({
        format: Formats["iso.datetime"]
    })
    startedAt: string;
}

export const schema = {
    res: [trip_startRes],
    body: trip_startReqBody,
    query: trip_startReqQuery,
    params: trip_startReqParams
};

export type RerturnType = typeof schema['res'] extends (infer R)[]
    ? R extends new (...args: any[]) => any
    ? InstanceType<R>
    : never
    : never;

export type Req = Request<trip_startReqParams, any, trip_startReqBody, trip_startReqQuery> & RequestWithUser;
