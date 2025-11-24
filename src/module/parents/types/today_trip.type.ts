import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { ObjectType } from "@lib/validate";
import { IsArray, IsEnum, IsObject, IsString } from "@lib/type_declaration";
import { number } from "zod/v4";


export class today_tripReqBody {}
export class today_tripReqQuery {}
export class today_tripReqParams {
    @IsString()
    studentId: string;
}


export class Route_Info extends ObjectType {
    @IsString()
    routeId: string;

    @IsString()
    routeName: string;

    @IsArray(Object)
    path: [number, number][];
}


export class StopPoint extends ObjectType {
    @IsString()
    stopId: string;

    @IsString()
    stopName: string;

    @IsArray(Object)
    pos: number[];
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

    @IsEnum({
        value: ['DISPATCH', 'RETURN'],
    })
    type: string;

    @IsObject(Route_Info)
    route: Route_Info;

    @IsObject(StopPoint)
    stopPoint: StopPoint;
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
