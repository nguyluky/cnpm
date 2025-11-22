import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { ObjectType } from "@lib/validate";
import { BusData, PaginatedQuery, RouteData, StudentData } from "@src/types/share.type";
import { IsArray, IsEnum, IsNumber, IsObject, IsString } from "@lib/type_declaration";
import { RequestWithUser } from "@src/utils/jwt";

export class getToDaySchedulesReqBody { }
export class getToDaySchedulesReqQuery { }
export class getToDaySchedulesReqParams { }

export class ToDaySchedules extends ObjectType {

    @IsString()
    scheduleId: string;

    @IsString()
    tripId: string;

    @IsString()
    date: string;

    @IsEnum({
        value: ['PLANNED', 'ONGOING', 'COMPLETED', 'CANCELLED'],
    })
    static: 'PLANNED' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';

    @IsEnum({
        value: ['DISPATH', "RETURN"],
    })
    type: 'DISPATH' | "RETURN";

    @IsString()
    startTime: string;
}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class getToDaySchedulesRes extends ObjectType {
    @IsArray(ToDaySchedules)
    data: ToDaySchedules[];

    @IsNumber()
    total: number;
}

export const schema = {
    res: [getToDaySchedulesRes],
    body: getToDaySchedulesReqBody,
    query: getToDaySchedulesReqQuery,
    params: getToDaySchedulesReqParams
};

export type RerturnType = typeof schema['res'] extends (infer R)[]
    ? R extends new (...args: any[]) => any
    ? InstanceType<R>
    : never
    : never;

export type Req = Request<getToDaySchedulesReqParams, any, getToDaySchedulesReqBody, getToDaySchedulesReqQuery> & RequestWithUser;
