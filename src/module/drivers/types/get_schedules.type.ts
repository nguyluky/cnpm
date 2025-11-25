import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { ObjectType } from "@lib/validate";
import { IsArray, IsEnum, IsObject, IsString } from "@lib/type_declaration";
import { RequestWithUser } from "@src/utils/jwt";
import { BusInfo, RouteInfo } from "./shared.type";

export class get_schedulesReqBody { }
export class get_schedulesReqQuery { }
export class get_schedulesReqParams { }

export class Scheduless extends ObjectType {

    @IsString()
    id: string;

    @IsObject(RouteInfo)
    route: RouteInfo;

    @IsObject(BusInfo)
    bus: BusInfo;

    @IsEnum({
        value: ['MORNING', 'AFTERNOON'],
    })
    type: 'MORNING' | 'AFTERNOON';

    @IsArray(Number)
    daysOfWeek: number[];

    @IsString({description: "HH:mm format"})
    startTime: string;

    @IsString({description: "ISO 8601 date string"})
    startDate: string;

    @IsString({description: "ISO 8601 date string", optional: true})
    endDate?: string;
}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class get_schedulesRes extends ObjectType {
    @IsArray(Scheduless)
    data: Scheduless[];
}

export const schema = {
    res: [get_schedulesRes],
    body: get_schedulesReqBody,
    query: get_schedulesReqQuery,
    params: get_schedulesReqParams
};

export type RerturnType = typeof schema['res'] extends (infer R)[]
    ? R extends new (...args: any[]) => any
    ? InstanceType<R>
    : never
    : never;

export type Req = Request<get_schedulesReqParams, any, get_schedulesReqBody, get_schedulesReqQuery> & RequestWithUser;
