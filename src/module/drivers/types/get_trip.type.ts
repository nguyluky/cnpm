import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { ObjectType } from "@lib/validate";
import { IsArray, IsEnum, IsNumber, IsObject, IsString } from "@lib/type_declaration";
import { BusInfo, RouteInfo } from "./shared.type";

export class get_tripReqBody {}
export class get_tripReqQuery {}
export class get_tripReqParams {
    @IsString()
    id: string;
}

export class RouteInfoWithPath extends RouteInfo {

    @IsArray(Object)
    path: number[][];

    @IsString()
    startTime: string;

}


export class StopPointTrip extends ObjectType {

    @IsString()
    id: string;

    @IsString()
    name: string;

    @IsArray(Number)
    location: number[];

    @IsNumber()
    sequence: number;

    @IsEnum({
    value: ['PENDING', 'ARRIVED', 'DONE', 'SKIPPED'],
    })
    status: 'PENDING' | 'ARRIVED' | 'DONE' | 'SKIPPED';
    
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
