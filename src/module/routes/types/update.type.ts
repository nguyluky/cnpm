import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { ObjectType } from "@lib/validate";
import { Formats, IsArray, IsObject, IsString } from "@lib/type_declaration";
import { AnyObject, GeoLocation } from "@src/types/share.type";
import z from "zod/v4";

// { name?: string; meta?: any; stopPointIds?: string[] }
export class updateReqBody {
    @IsString({
        format: Formats.uuid
    })
    name: string;

    @IsObject(AnyObject)
    meta: GeoLocation;

    @IsArray(String, {minItems: 1})
    stopPointIds: string[];
}
export class updateReqQuery {}
export class updateReqParams {
    @IsString({
        format: Formats.uuid
    })
    id: string;
}


// { id, name, updatedAt }
export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class updateRes extends ObjectType {
    @IsString({
        format: Formats.uuid
    })
    id: string;

    @IsString()
    name: string;

    @IsString({
        format: Formats["iso.datetime"]
    })
    updatedAt: string;
}

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
