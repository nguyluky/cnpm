import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { ObjectType } from "@lib/validate";
import { IsEnum, IsString } from "@lib/type_declaration";


export class today_tripReqBody {}
export class today_tripReqQuery {}
export class today_tripReqParams {
    @IsString()
    studentId: string;
}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class today_tripRes extends ObjectType {
    @IsString()
    tripId: string;

    @IsEnum({
        value: ['ONGOING', 'COMPLETED', 'PENDING'],
    })
    status: string;

}

export const schema = {
    res: [today_tripRes],
    body: today_tripReqBody,
    query: today_tripReqQuery,
    params: today_tripReqParams
};

export type RerturnType = typeof schema['res'] extends (infer R)[] 
  ? R extends new (...args: any[]) => any 
    ? InstanceType<R>
    : never
  : never;

export type Req = Request<today_tripReqParams, any, today_tripReqBody, today_tripReqQuery>;
