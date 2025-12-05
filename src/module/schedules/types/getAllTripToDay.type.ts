import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { ObjectType } from "@lib/validate";
import { IsArray, IsEnum, IsNumber, IsObject, IsString } from "@lib/type_declaration";
import { RouteInfo, RouteInfoWithPath, StopPointTrip } from "@src/types/share.type";
import { DriverData } from "./share.type";
import { BusInfo } from "@src/module/drivers/types/shared.type";

export class getAllTripToDayReqBody {}
export class getAllTripToDayReqQuery {}
export class getAllTripToDayReqParams {}

export class TripToDay extends ObjectType {

    @IsString()
    scheduleId: string;

    @IsString()
    tripId: string;

    @IsEnum({
        value: ['PLANNED', 'ONGOING', 'COMPLETED', 'CANCELLED'],
    })
    sattus: 'PLANNED' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';

    @IsObject(RouteInfo)
    route: RouteInfo;

    @IsObject(BusInfo)
    bus: BusInfo;


    @IsObject(DriverData)
    driver: DriverData;

    @IsArray(StopPointTrip)
    stops: StopPointTrip[];
}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class getAllTripToDayRes extends ObjectType {
    @IsArray(TripToDay)
    data: TripToDay[];

    @IsNumber()
    total: number;
}

export const schema = {
    res: [getAllTripToDayRes],
    body: getAllTripToDayReqBody,
    query: getAllTripToDayReqQuery,
    params: getAllTripToDayReqParams
};

export type RerturnType = typeof schema['res'] extends (infer R)[] 
  ? R extends new (...args: any[]) => any 
    ? InstanceType<R>
    : never
  : never;

export type Req = Request<getAllTripToDayReqParams, any, getAllTripToDayReqBody, getAllTripToDayReqQuery>;
