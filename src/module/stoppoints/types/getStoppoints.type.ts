import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { ObjectType } from "@lib/validate";
import { Formats, IsNumber, IsObject, IsString } from "@lib/type_declaration";
import { GeoLocation } from "@src/types/share.type";

export class getStoppointsReqBody {}
export class getStoppointsReqQuery {}
export class getStoppointsReqParams {
    @IsString()
    id: string
}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class getStoppointsRes extends ObjectType {
    @IsString()
    id: string

    @IsString()
    name: string

    @IsObject(GeoLocation)
    location: GeoLocation

    @IsString({format: Formats["iso.datetime"]})
    createdAt: string

    @IsString({format: Formats["iso.datetime"]})
    updatedAt: string
}

export const schema = {
    res: [getStoppointsRes],
    body: getStoppointsReqBody,
    query: getStoppointsReqQuery,
    params: getStoppointsReqParams
};

export type RerturnType = typeof schema['res'] extends (infer R)[] 
  ? R extends new (...args: any[]) => any 
    ? InstanceType<R>
    : never
  : never;

export type Req = Request<getStoppointsReqParams, any, getStoppointsReqBody, getStoppointsReqQuery>;
