import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { ObjectType } from "@lib/validate";
import { Formats, IsString } from "@lib/type_declaration";

export class deleteByIdReqBody { }
export class deleteByIdReqQuery { }
export class deleteByIdReqParams {
    @IsString({
        format: Formats.uuid
    })
    id: string;
}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class deleteByIdRes extends ObjectType { }

export const schema = {
    res: [deleteByIdRes],
    body: deleteByIdReqBody,
    query: deleteByIdReqQuery,
    params: deleteByIdReqParams
};

export type RerturnType = typeof schema['res'] extends (infer R)[] 
  ? R extends new (...args: any[]) => any 
    ? InstanceType<R>
    : never
  : never;

export type Req = Request<deleteByIdReqParams, any, deleteByIdReqBody, deleteByIdReqQuery>;
