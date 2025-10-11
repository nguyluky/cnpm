import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { ObjectType } from "@lib/validate";
import { Formats, IsArray, IsEnum, IsObject, IsString } from "@lib/type_declaration";
import { TimeTable } from "./share.type";

// { busId?: string; driverId?: string; meta?: any }
export class updateReqBody {

    @IsString({
        optional: true
    })
    busId?: string;

    @IsString({
        optional: true
    })
    driverId?: string;

    @IsObject(Object, {
        optional: true
    })
    meta?: any;

    @IsString({
        optional: true,
        format: Formats["iso.time"]
    })
    startTime?: string;

    @IsString({
        optional: true,
        format: Formats["iso.date"]
    })
    startDate?: string;

    @IsString({
        optional: true,
        format: Formats["iso.date"]
    })
    endDate?: string;

    @IsEnum({
        value: ["MORNING", "AFTERNOON"],
        optional: true
    })
    type?: "MORNING" | "AFTERNOON" = "MORNING";

    @IsString({
        optional: true
    })
    routeId?: string;

    @IsArray(TimeTable, {
        optional: true
    })
    times?: TimeTable[];

}
export class updateReqQuery {}
export class updateReqParams {
    @IsString({
        format: Formats.uuid
    })
    id: string;
}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class updateRes extends ObjectType {}

export const schema = {
    res: [updateRes],
    body: updateReqBody,
    query: updateReqQuery,
    params: updateReqParams
};
export type RerturnType = typeof schema['res'] extends (infer R)[] 
  ? R extends new (...args: any[]) => any 
    ? InstanceType<R>
    : never
  : never;

export type Req = Request<updateReqParams, any, updateReqBody, updateReqQuery>;
