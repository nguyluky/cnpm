import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { ObjectType } from "@lib/validate";
import { AnyObject, GeoLocation, PaginatedQuery, PaginationMetaData, RouteData } from "@src/types/share.type";
import { Formats, IsArray, IsObject, IsString, toSchema } from "@lib/type_declaration";

export class getAllReqBody { }
export class getAllReqQuery extends PaginatedQuery { }
export class getAllReqParams { }



export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class getAllRes extends ObjectType {
    @IsArray(RouteData)
    data: RouteData[];

    @IsObject(PaginationMetaData)
    meta: PaginationMetaData;
}

export const schema = {
    res: [getAllRes],
    body: getAllReqBody,
    query: getAllReqQuery,
    params: getAllReqParams
};

export type RerturnType = typeof schema['res'] extends (infer R)[] 
  ? R extends new (...args: any[]) => any 
    ? InstanceType<R>
    : never
  : never;

export type Req = Request<getAllReqParams, any, getAllReqBody, getAllReqQuery>;
