import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { ObjectType } from "@lib/validate";
import { IsNumber, IsObject, IsString } from "@lib/type_declaration";
import { GeoLocation } from "@src/types/share.type";

export class updateStoppointsReqBody {
    @IsString()
    name: string

    @IsNumber()
    sequence: number

    @IsObject(GeoLocation)
    location: GeoLocation
}
export class updateStoppointsReqQuery {}
export class updateStoppointsReqParams {
    @IsString()
    id: string
}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class updateStoppointsRes extends ObjectType {}

export const schema = {
    res: [updateStoppointsRes],
    body: updateStoppointsReqBody,
    query: updateStoppointsReqQuery,
    params: updateStoppointsReqParams
};

export type RerturnType = typeof schema['res'] extends (infer R)[] 
  ? R extends new (...args: any[]) => any 
    ? InstanceType<R>
    : never
  : never;

export type Req = Request<updateStoppointsReqParams, any, updateStoppointsReqBody, updateStoppointsReqQuery>;
