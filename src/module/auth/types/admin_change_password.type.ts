import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { ObjectType } from "@lib/validate";
import { IsString } from "@lib/type_declaration";

export class admin_change_passwordReqBody {
    @IsString()
    email: string

    @IsString()
    password: string
}
export class admin_change_passwordReqQuery {}
export class admin_change_passwordReqParams {}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class admin_change_passwordRes extends ObjectType {}

export const schema = {
    res: [admin_change_passwordRes],
    body: admin_change_passwordReqBody,
    query: admin_change_passwordReqQuery,
    params: admin_change_passwordReqParams
};

export type RerturnType = typeof schema['res'] extends (infer R)[] 
  ? R extends new (...args: any[]) => any 
    ? InstanceType<R>
    : never
  : never;

export type Req = Request<admin_change_passwordReqParams, any, admin_change_passwordReqBody, admin_change_passwordReqQuery>;
