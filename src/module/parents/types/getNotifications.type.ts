import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { Class_ } from "@lib/validate";

export class getNotificationsReqBody {}
export class getNotificationsReqQuery {}
export class getNotificationsReqParams {}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class getNotificationsRes extends Class_ {}

export const schema = {
    res: [getNotificationsRes],
    body: getNotificationsReqBody,
    query: getNotificationsReqQuery,
    params: getNotificationsReqParams
};

export type RerturnType = typeof schema['res'] extends (infer R)[] 
  ? R extends new (...args: any[]) => any 
    ? InstanceType<R>
    : never
  : never;

export type Req = Request<getNotificationsReqParams, any, getNotificationsReqBody, getNotificationsReqQuery>;
