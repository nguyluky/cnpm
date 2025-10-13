import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { ObjectType } from "@lib/validate";
import { RequestWithUser } from "@src/utils/jwt";
import { IsArray, IsEnum, IsNumber, IsObject, IsString } from "@lib/type_declaration";
import { StopPointsData, StudentData } from "@src/types/share.type";
import { StudentAttendance_status } from "@prisma/client";

export class getStudentsReqBody {}
export class getStudentsReqQuery {}
export class getStudentsReqParams {}

export class Students extends ObjectType {
    @IsString()
    id: string;

    @IsString()
    name: string;
    
    @IsObject(StopPointsData)
    stopPoint: StopPointsData;

    @IsEnum({
      value: [ 'PENDING', 'PICKED_UP', 'DROPPED_OFF', 'MISSED']
    })
    status: 'PENDING'| 'PICKED_UP'| 'DROPPED_OFF'| 'MISSED';
}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class getStudentsRes extends ObjectType {
    @IsArray(Students)
    data: Students[];

    @IsNumber() 
    total: number;
}

export const schema = {
    res: [getStudentsRes],
    body: getStudentsReqBody,
    query: getStudentsReqQuery,
    params: getStudentsReqParams
};

export type RerturnType = typeof schema['res'] extends (infer R)[] 
  ? R extends new (...args: any[]) => any 
    ? InstanceType<R>
    : never
  : never;

export type Req = Request<getStudentsReqParams, any, getStudentsReqBody, getStudentsReqQuery> & RequestWithUser;
