import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { ObjectType } from "@lib/validate";
import { IsString } from "@lib/type_declaration";

export class deleteReqBody {}
export class deleteReqQuery {}
export class deleteReqParams {
    @IsString()
    id: string;
}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class deleteRes extends ObjectType {}

export const schema = {
    res: [deleteRes],
    body: deleteReqBody,
    query: deleteReqQuery,
    params: deleteReqParams
};
export type RerturnType = typeof schema['res'] extends (infer R)[] 
  ? R extends new (...args: any[]) => any 
    ? InstanceType<R>
    : never
  : never;

export type Req = Request<deleteReqParams, any, deleteReqBody, deleteReqQuery>;
