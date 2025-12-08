import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { ObjectType } from "@lib/validate";
import { IsString } from "@lib/type_declaration";

export class getVAPIDpubReqBody {}
export class getVAPIDpubReqQuery {}
export class getVAPIDpubReqParams {}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class getVAPIDpubRes extends ObjectType {
    @IsString()
    vapidPublicKey: string;
}

export const schema = {
    res: [getVAPIDpubRes],
    body: getVAPIDpubReqBody,
    query: getVAPIDpubReqQuery,
    params: getVAPIDpubReqParams
};

export type RerturnType = typeof schema['res'] extends (infer R)[] 
  ? R extends new (...args: any[]) => any 
    ? InstanceType<R>
    : never
  : never;

export type Req = Request<getVAPIDpubReqParams, any, getVAPIDpubReqBody, getVAPIDpubReqQuery>;
