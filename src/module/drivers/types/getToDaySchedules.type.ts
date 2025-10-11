import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { ObjectType } from "@lib/validate";
import { BusData, PaginatedQuery, RouteData, StudentData } from "@src/types/share.type";
import { IsArray, IsNumber, IsObject, IsString } from "@lib/type_declaration";
import { RequestWithUser } from "@src/utils/jwt";

export class getToDaySchedulesReqBody {}
export class getToDaySchedulesReqQuery {}
export class getToDaySchedulesReqParams {}

// { id, route: {...}, bus: {...}, students: [...] }


export class SchedulessToDay extends ObjectType {
    @IsString()
    id: string;

    @IsObject(RouteData)
    route: RouteData; 


    @IsObject(BusData)
    bus: BusData; 

    @IsArray(StudentData)
    students: StudentData[];
}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class getToDaySchedulesRes extends ObjectType {

    @IsArray(SchedulessToDay)
    data: SchedulessToDay[];

    @IsNumber()
    total: number;
}

export const schema = {
    res: [getToDaySchedulesRes, SchedulessToDay],
    body: getToDaySchedulesReqBody,
    query: getToDaySchedulesReqQuery,
    params: getToDaySchedulesReqParams
};

export type RerturnType = typeof schema['res'] extends (infer R)[] 
  ? R extends new (...args: any[]) => any 
    ? InstanceType<R>
    : never
  : never;

// export type ReturnType<T extends typeof schema['res'], U = T extends (infer R)[] ? R : T> = U extends ObjectType ? U : never;
export type Req = Request<getToDaySchedulesReqParams, any, getToDaySchedulesReqBody, getToDaySchedulesReqQuery> & RequestWithUser;
