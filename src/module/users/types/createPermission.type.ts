import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { ObjectType } from "@lib/validate";
import { IsNumber, IsString } from "@lib/type_declaration";
import { RoleData } from "./share.type";

export class createPermissionReqBody {
    @IsString()
    name: string;
}
export class createPermissionReqQuery {}
export class createPermissionReqParams {}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class createPermissionRes extends ObjectType {
    @IsNumber()
    id: number;
    
    @IsString()
    name: string;
}

export const schema = {
    res: [createPermissionRes],
    body: createPermissionReqBody,
    query: createPermissionReqQuery,
    params: createPermissionReqParams
};

export type RerturnType = typeof schema['res'] extends (infer R)[] 
  ? R extends new (...args: any[]) => any 
    ? InstanceType<R>
    : never
  : never;

export type Req = Request<createPermissionReqParams, any, createPermissionReqBody, createPermissionReqQuery>;
