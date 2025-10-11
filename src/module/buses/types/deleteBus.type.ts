import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { ObjectType } from "@lib/validate";
import { Formats, IsString } from "@lib/type_declaration";

export class deleteBusReqBody { }
export class deleteBusReqQuery { }
export class deleteBusReqParams {
    @IsString({
        format: Formats.uuid
    })
    id: string;
}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class deleteBusRes extends ObjectType { }

export const schema = {
    res: [deleteBusRes],
    body: deleteBusReqBody,
    query: deleteBusReqQuery,
    params: deleteBusReqParams
};

export type RerturnType = typeof schema['res'] extends (infer R)[] 
  ? R extends new (...args: any[]) => any 
    ? InstanceType<R>
    : never
  : never;

export type Req = Request<deleteBusReqParams, any, deleteBusReqBody, deleteBusReqQuery>;
