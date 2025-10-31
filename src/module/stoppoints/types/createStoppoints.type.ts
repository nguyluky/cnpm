import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { ObjectType } from "@lib/validate";
import { IsNumber, IsObject, IsString } from "@lib/type_declaration";
import { GeoLocation } from "@src/types/share.type";

export class createStoppointsReqBody {
    @IsNumber()
    sequence: number;

    @IsString()
    name: string;

    @IsObject(GeoLocation)
    location: GeoLocation;


    
}
export class createStoppointsReqQuery {}
export class createStoppointsReqParams {}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class createStoppointsRes extends ObjectType {}

export const schema = {
    res: [createStoppointsRes],
    body: createStoppointsReqBody,
    query: createStoppointsReqQuery,
    params: createStoppointsReqParams
};

export type RerturnType = typeof schema['res'] extends (infer R)[] 
  ? R extends new (...args: any[]) => any 
    ? InstanceType<R>
    : never
  : never;

export type Req = Request<createStoppointsReqParams, any, createStoppointsReqBody, createStoppointsReqQuery>;
