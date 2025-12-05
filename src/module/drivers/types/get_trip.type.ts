import { ApiRequestStatus } from "@lib/httpMethod";
import { IsArray, IsEnum, IsObject, IsString } from "@lib/type_declaration";
import { ObjectType } from "@lib/validate";
import { RouteInfoWithPath, StopPointTrip } from "@src/types/share.type";
import { Request } from "express";
import "reflect-metadata";
import { BusInfo } from "./shared.type";

export class get_tripReqBody {}
export class get_tripReqQuery {}
export class get_tripReqParams {
    @IsString()
    id: string;
}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class get_tripRes extends ObjectType {
    @IsString()
    id: string;

    @IsEnum({
        value: ['PLANNED', 'ONGOING', 'COMPLETED', 'CANCELLED'],
    })
    status: 'PLANNED' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';

    @IsObject(RouteInfoWithPath)
    rotute: RouteInfoWithPath;

    @IsObject(BusInfo)
    bus: BusInfo;

    @IsArray(StopPointTrip)
    stops: StopPointTrip[];
}

export const schema = {
    res: [get_tripRes],
    body: get_tripReqBody,
    query: get_tripReqQuery,
    params: get_tripReqParams
};

export type RerturnType = typeof schema['res'] extends (infer R)[] 
  ? R extends new (...args: any[]) => any 
    ? InstanceType<R>
    : never
  : never;

export type Req = Request<get_tripReqParams, any, get_tripReqBody, get_tripReqQuery>;
