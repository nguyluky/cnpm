import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { ObjectType } from "@lib/validate";
import { IsString } from "@lib/type_declaration";

export class updateStoppointReqBody {
    @IsString()
    stoppointId: string
}
export class updateStoppointReqQuery {}
export class updateStoppointReqParams {
    @IsString()
    id: string
}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class updateStoppointRes extends ObjectType {}

export const schema = {
    res: [updateStoppointRes],
    body: updateStoppointReqBody,
    query: updateStoppointReqQuery,
    params: updateStoppointReqParams
};

export type RerturnType = typeof schema['res'] extends (infer R)[] 
  ? R extends new (...args: any[]) => any 
    ? InstanceType<R>
    : never
  : never;

export type Req = Request<updateStoppointReqParams, any, updateStoppointReqBody, updateStoppointReqQuery>;
