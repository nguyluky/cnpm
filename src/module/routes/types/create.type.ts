import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { ObjectType } from "@lib/validate";
import { Formats, IsArray, IsNumber, IsObject, IsString, toSchema } from "@lib/type_declaration";
import { AnyObject, GeoLocation } from "@src/types/share.type";
import z from "zod/v4";

// { name: string; startLocation: any; endLocation: any; meta?: any; stopPointIds: string[] }
export class createReqBody {
    @IsString()
    name: string;

    @IsObject(GeoLocation)
    startLocation: GeoLocation;

    @IsObject(GeoLocation)
    endLocation: GeoLocation;

    @IsObject(AnyObject, { optional: true })
    meta?: AnyObject;

    @IsArray(String, { maxItems: 1 })
    stopPointIds: string[];
}
export class createReqQuery {}
export class createReqParams {}


export class StopPoints extends ObjectType {
    @IsString({
        format: Formats.uuid
    })
    id: string;

    @IsString()
    name: string;

    @IsObject(GeoLocation)
    location: GeoLocation;

    @IsNumber()
    sequence: number;

    @IsObject(AnyObject)
    meta: AnyObject;
}

// { id, name, stopPoints: [...] }
export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class createRes extends ObjectType {
    @IsString()
    id: string;

    @IsString()
    name: string;


    @IsArray(StopPoints)
    stopPoints: StopPoints[];
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
