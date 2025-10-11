import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { ObjectType } from "@lib/validate";

export class profileReqBody {}
export class profileReqQuery {}
export class profileReqParams {}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class profileRes extends ObjectType {}

export const schema = {
    res: [profileRes],
    body: profileReqBody,
    query: profileReqQuery,
    params: profileReqParams
};

export type RerturnType = typeof schema['res'] extends (infer R)[] 
  ? R extends new (...args: any[]) => any 
    ? InstanceType<R>
    : never
  : never;

export type Req = Request<profileReqParams, any, profileReqBody, profileReqQuery>;
