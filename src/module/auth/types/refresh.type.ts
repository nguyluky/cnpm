import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { ObjectType } from "@lib/validate";
import { IsString } from "@lib/type_declaration";

export class refreshReqBody {
    @IsString()
    refreshToken: string;
}
export class refreshReqQuery {}
export class refreshReqParams {}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class refreshRes extends ObjectType {
    @IsString()
    accessToken: string;
}

export const schema = {
    res: [refreshRes],
    body: refreshReqBody,
    query: refreshReqQuery,
    params: refreshReqParams
};

export type RerturnType = typeof schema['res'] extends (infer R)[] 
  ? R extends new (...args: any[]) => any 
    ? InstanceType<R>
    : never
  : never;

export type Req = Request<refreshReqParams, any, refreshReqBody, refreshReqQuery>;
