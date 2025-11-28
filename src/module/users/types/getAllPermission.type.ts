import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { ObjectType } from "@lib/validate";
import { IsArray, IsNumber, IsString } from "@lib/type_declaration";

export class getAllPermissionReqBody {}
export class getAllPermissionReqQuery {}
export class getAllPermissionReqParams {}

export class PermissionData extends ObjectType {
    @IsNumber()
    id: number;

    @IsString()
    name: string;

}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class getAllPermissionRes extends ObjectType {
    @IsArray(PermissionData)
    data: PermissionData[];

    @IsNumber()
    total: number;
}

export const schema = {
    res: [getAllPermissionRes],
    body: getAllPermissionReqBody,
    query: getAllPermissionReqQuery,
    params: getAllPermissionReqParams
};

export type RerturnType = typeof schema['res'] extends (infer R)[] 
  ? R extends new (...args: any[]) => any 
    ? InstanceType<R>
    : never
  : never;

export type Req = Request<getAllPermissionReqParams, any, getAllPermissionReqBody, getAllPermissionReqQuery>;
