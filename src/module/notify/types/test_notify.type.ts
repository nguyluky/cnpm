import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { ObjectType } from "@lib/validate";
import { IsString } from "@lib/type_declaration";

export class test_notifyReqBody {
    @IsString()
    userId: string;

    @IsString()
    body: string;

    @IsString()
    title: string;
}
export class test_notifyReqQuery {}
export class test_notifyReqParams {}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class test_notifyRes extends ObjectType {
}

export const schema = {
    res: [test_notifyRes],
    body: test_notifyReqBody,
    query: test_notifyReqQuery,
    params: test_notifyReqParams
};

export type RerturnType = typeof schema['res'] extends (infer R)[] 
  ? R extends new (...args: any[]) => any 
    ? InstanceType<R>
    : never
  : never;

export type Req = Request<test_notifyReqParams, any, test_notifyReqBody, test_notifyReqQuery>;
