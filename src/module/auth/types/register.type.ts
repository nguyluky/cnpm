import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { ObjectType } from "@lib/validate";
import { IsString, IsNumber, IsArray, IsObject, IsEnum, Formats } from "@lib/type_declaration";
import z from "zod/v4";

export class registerReqBody {
    @IsString()
    username: string;


    @IsString()
    password: string;

    @IsString({
        format: Formats.email
    })
    email: string;
}
export class registerReqQuery { }
export class registerReqParams { }

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class registerRes extends ObjectType {
    @IsString({
        format: Formats.uuid
    })
    id: string;

    @IsString()
    username: string;

    @IsString({
        format: Formats.email
    })
    email: string;

    @IsArray(String)
    roles: string[];
}

export const schema = {
    res: [registerRes],
    body: registerReqBody,
    query: registerReqQuery,
    params: registerReqParams
};

export type RerturnType = typeof schema['res'] extends (infer R)[] 
  ? R extends new (...args: any[]) => any 
    ? InstanceType<R>
    : never
  : never;

export type Req = Request<registerReqParams, any, registerReqBody, registerReqQuery>;
