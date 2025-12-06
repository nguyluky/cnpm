import { ApiRequestStatus } from "@lib/httpMethod";
import { IsArray, IsEnum, IsObject, IsString } from "@lib/type_declaration";
import { ObjectType } from "@lib/validate";
import { RouteInfo } from "@src/types/share.type";
import { RequestWithUser } from "@src/utils/jwt";
import { Request } from "express";
import "reflect-metadata";
import { BusInfo } from "./shared.type";

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
        value: ['DISPATCH', 'RETURN'],
    })
    type: 'DISPATCH' | 'RETURN';

    @IsArray(Number)
    daysOfWeek: number[];

    @IsString({description: "HH:mm format"})
    startTime: string;

    @IsString()
    startDate: string;

    @IsString({optional: true})
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
