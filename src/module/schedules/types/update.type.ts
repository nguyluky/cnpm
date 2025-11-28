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
        format: Formats["iso.datetime"]
    })
    startDate?: string;

    @IsString({
        optional: true,
        format: Formats["iso.datetime"]
    })
    endDate?: string;

    @IsEnum({
        value: ["DISPATCH", "RETURN"],
        optional: true
    })
    type?: "DISPATCH" | "RETURN";

    @IsString({
        optional: true
    })
    routeId?: string;

    @IsObject(TimeTable, {
        optional: true
    })
    times?: TimeTable;

}
export class updateReqQuery {}
export class updateReqParams {
    @IsString()
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
