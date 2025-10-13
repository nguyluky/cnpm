import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { ObjectType } from "@lib/validate";
import { Formats, IsArray, IsEnum, IsObject, IsString } from "@lib/type_declaration";
import { ScheduleInfo, TimeTable } from "./share.type";
import { BusData, RouteData } from "@src/types/share.type";
import { warn } from "console";

// { busId: string; routeId: string; driverId: string; times: [{ dayOfWeek: number; departureTime: string }]; meta?: any }
export class createReqBody {
    @IsString()
    busId: string;

    @IsString()
    routeId: string;

    @IsString()
    driverId: string;

    @IsArray(TimeTable)
    times: string; // JSON string of array of { dayOfWeek: number; departureTime: string }

    @IsObject(Object, { optional: true })
    meta?: any;

    @IsString({
        format: Formats["iso.datetime"]

    })
    startDate: string;

    @IsString({
        format: Formats["iso.datetime"]
    })
    endDate: string;

    @IsString({
        format: Formats["iso.time"]
    })
    startTime: string;

    @IsEnum({
        value: ["MORNING", "AFTERNOON"],
    })
    type: "MORNING" | "AFTERNOON" = "MORNING";
}
export class createReqQuery { }
export class createReqParams { }

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class createRes extends ScheduleInfo {
}

export const schema = {
    res: [createRes],
    body: createReqBody,
    query: createReqQuery,
    params: createReqParams
};

export type RerturnType = typeof schema['res'] extends (infer R)[] 
  ? R extends new (...args: any[]) => any 
    ? InstanceType<R>
    : never
  : never;

export type Req = Request<createReqParams, any, createReqBody, createReqQuery>;
