import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { ObjectType } from "@lib/validate";
import { IsArray, IsNumber, IsString } from "@lib/type_declaration";
import { StopPointsData } from "@src/types/share.type";

export class getAllReqBody {}
export class getAllReqQuery {}
export class getAllReqParams {
  @IsString()
  id: string;
}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class getAllRes extends ObjectType {

    @IsArray(StopPointsData)
    data: StopPointsData[];

    @IsNumber()
    total: number;
}

export const schema = {
    res: [getAllRes],
    body: getAllReqBody,
    query: getAllReqQuery,
    params: getAllReqParams
};

export type RerturnType = typeof schema['res'] extends (infer R)[] 
  ? R extends new (...args: any[]) => any 
    ? InstanceType<R>
    : never
  : never;

export type Req = Request<getAllReqParams, any, getAllReqBody, getAllReqQuery>;
