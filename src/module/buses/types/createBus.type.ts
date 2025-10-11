import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { ObjectType } from "@lib/validate";
import { Formats, IsNumber, IsObject, IsString } from "@lib/type_declaration";
import { AnyObject, BusData } from "@src/types/share.type";

export class createBusReqBody {
    @IsString()
    licensePlate: string;

    @IsNumber()
    capacity: number;

    @IsObject(AnyObject)
    metadata: AnyObject;
}
export class createBusReqQuery {}
export class createBusReqParams {}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class createBusRes extends BusData {}

export const schema = {
    res: [createBusRes],
    body: createBusReqBody,
    query: createBusReqQuery,
    params: createBusReqParams
};

export type RerturnType = typeof schema['res'] extends (infer R)[] 
  ? R extends new (...args: any[]) => any 
    ? InstanceType<R>
    : never
  : never;

export type Req = Request<createBusReqParams, any, createBusReqBody, createBusReqQuery>;
