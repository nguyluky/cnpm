import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { ObjectType } from "@lib/validate";
import { IsArray, IsNumber } from "@lib/type_declaration";
import { RoleData } from "./share.type";

export class addPermissionReqBody {
    @IsNumber()
    roleId: number;
    
    @IsArray(String)
    permissions: string[];
}
export class addPermissionReqQuery {}
export class addPermissionReqParams {}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class addPermissionRes extends RoleData { }

export const schema = {
    res: [addPermissionRes],
    body: addPermissionReqBody,
    query: addPermissionReqQuery,
    params: addPermissionReqParams
};

export type RerturnType = typeof schema['res'] extends (infer R)[] 
  ? R extends new (...args: any[]) => any 
    ? InstanceType<R>
    : never
  : never;

export type Req = Request<addPermissionReqParams, any, addPermissionReqBody, addPermissionReqQuery>;
