import { ApiRequestStatus } from "@lib/httpMethod";
import { IsArray, IsNumber, IsString } from "@lib/type_declaration";
import { ObjectType } from "@lib/validate";
import { RoleData } from "@src/module/users/types/share.type";
import { Request } from "express";
import "reflect-metadata";

export class getAllRolesReqBody {}
export class getAllRolesReqQuery {}
export class getAllRolesReqParams {}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class getAllRolesRes extends ObjectType {
    @IsArray(RoleData)
    data: RoleData[];

    @IsNumber()
    total: number;
}

export const schema = {
    res: [getAllRolesRes],
    body: getAllRolesReqBody,
    query: getAllRolesReqQuery,
    params: getAllRolesReqParams
};

export type RerturnType = typeof schema['res'] extends (infer R)[] 
  ? R extends new (...args: any[]) => any 
    ? InstanceType<R>
    : never
  : never;

export type Req = Request<getAllRolesReqParams, any, getAllRolesReqBody, getAllRolesReqQuery>;
