import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { ObjectType } from "@lib/validate";
import { IsArray, IsNumber, IsString } from "@lib/type_declaration";
import z from "zod/v4";

export class loginReqBody {
    @IsString()
    username: string;

    @IsString()
    password: string;
}
export class loginReqQuery {}
export class loginReqParams {}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class loginRes extends ObjectType {
    @IsString()
    id: string;

    @IsString()
    username: string;

    @IsString()
    email: string;

    @IsArray(String)
    roles: string[];

    @IsString()
    accessToken: string;

    @IsString()
    refreshToken: string;
}

export const schema = {
    res: [loginRes],
    body: loginReqBody,
    query: loginReqQuery,
    params: loginReqParams
};


export type RerturnType = typeof schema['res'] extends (infer R)[] 
  ? R extends new (...args: any[]) => any 
    ? InstanceType<R>
    : never
  : never;

export type Req = Request<loginReqParams, any, loginReqBody, loginReqQuery>;
