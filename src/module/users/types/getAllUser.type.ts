import { ApiRequestStatus } from "@lib/httpMethod";
import { IsArray, IsObject, IsString } from "@lib/type_declaration";
import { ObjectType } from "@lib/validate";
import { PaginatedQuery, PaginationMetaData } from "@src/types/share.type";
import { Request } from "express";
import "reflect-metadata";
import { UserData } from "./share.type";

export class getAllUserReqBody { }
export class getAllUserReqQuery extends PaginatedQuery {
    @IsString({
        optional: true
    })
    role: string;
}
export class getAllUserReqParams { }


export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class getAllUserRes extends ObjectType {
    @IsArray(UserData)
    data: UserData[];

    @IsObject(PaginationMetaData)
    meta: PaginationMetaData;
}

export const schema = {
    res: [getAllUserRes],
    body: getAllUserReqBody,
    query: getAllUserReqQuery,
    params: getAllUserReqParams
};

export type RerturnType = typeof schema['res'] extends (infer R)[]
    ? R extends new (...args: any[]) => any
    ? InstanceType<R>
    : never
    : never;

export type Req = Request<getAllUserReqParams, any, getAllUserReqBody, getAllUserReqQuery>;
