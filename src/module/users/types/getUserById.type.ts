import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { ObjectType } from "@lib/validate";
import { IsString } from "@lib/type_declaration";
import { UserData } from "./share.type";

export class getUserByIdReqBody {}
export class getUserByIdReqQuery {}
export class getUserByIdReqParams {
    @IsString()
    id: string;
}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class getUserByIdRes extends UserData {}

export const schema = {
    res: [getUserByIdRes],
    body: getUserByIdReqBody,
    query: getUserByIdReqQuery,
    params: getUserByIdReqParams
};

export type RerturnType = typeof schema['res'] extends (infer R)[] 
  ? R extends new (...args: any[]) => any 
    ? InstanceType<R>
    : never
  : never;

export type Req = Request<getUserByIdReqParams, any, getUserByIdReqBody, getUserByIdReqQuery>;
