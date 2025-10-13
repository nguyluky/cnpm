import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { ObjectType } from "@lib/validate";
import { IsString } from "@lib/type_declaration";

export class deleteStoppointsReqBody {}
export class deleteStoppointsReqQuery {}
export class deleteStoppointsReqParams {
  @IsString()
  id: string
}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Delete Success"
}) class deleteStoppointsRes extends ObjectType {}

export const schema = {
    res: [deleteStoppointsRes],
    body: deleteStoppointsReqBody,
    query: deleteStoppointsReqQuery,
    params: deleteStoppointsReqParams
};

export type RerturnType = typeof schema['res'] extends (infer R)[] 
  ? R extends new (...args: any[]) => any 
    ? InstanceType<R>
    : never
  : never;

export type Req = Request<deleteStoppointsReqParams, any, deleteStoppointsReqBody, deleteStoppointsReqQuery>;
