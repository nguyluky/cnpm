import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { ObjectType } from "@lib/validate";
import { Formats, IsArray, IsObject, IsString } from "@lib/type_declaration";
import { BusData, RouteData } from "@src/types/share.type";
import { ScheduleInfo, TimeTable } from "./share.type";

export class getByIdReqBody { }
export class getByIdReqQuery { }
export class getByIdReqParams {
    @IsString({
        format: Formats.uuid
    })
    id: string;
}


export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class getByIdRes extends ScheduleInfo {}

export const schema = {
    res: [getByIdRes],
    body: getByIdReqBody,
    query: getByIdReqQuery,
    params: getByIdReqParams
};

export type RerturnType = typeof schema['res'] extends (infer R)[] 
  ? R extends new (...args: any[]) => any 
    ? InstanceType<R>
    : never
  : never;

export type Req = Request<getByIdReqParams, any, getByIdReqBody, getByIdReqQuery>;
