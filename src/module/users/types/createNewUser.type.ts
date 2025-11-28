import { ApiRequestStatus } from "@lib/httpMethod";
import { IsArray, IsString } from "@lib/type_declaration";
import { ObjectType } from "@lib/validate";
import { Request } from "express";
import "reflect-metadata";

export class createNewUserReqBody {
    @IsString()
    username: string;

    @IsString()
    email: string;

    @IsString()
    password: string;

    @IsArray(String)
    roles: string[];
}
export class createNewUserReqQuery {}
export class createNewUserReqParams {}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class createNewUserRes extends ObjectType {}

export const schema = {
    res: [createNewUserRes],
    body: createNewUserReqBody,
    query: createNewUserReqQuery,
    params: createNewUserReqParams
};

export type RerturnType = typeof schema['res'] extends (infer R)[] 
  ? R extends new (...args: any[]) => any 
    ? InstanceType<R>
    : never
  : never;

export type Req = Request<createNewUserReqParams, any, createNewUserReqBody, createNewUserReqQuery>;
