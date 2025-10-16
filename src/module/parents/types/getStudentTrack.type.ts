import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { ObjectType } from "@lib/validate";
import { IsObject, IsString } from "@lib/type_declaration";
import { GeoLocation } from "@src/types/share.type";

export class getStudentTrackReqBody {}
export class getStudentTrackReqQuery {}
export class getStudentTrackReqParams {
    @IsString()
    id: string;
}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class getStudentTrackRes extends ObjectType {
  @IsString()
  studentId:string

  @IsObject(GeoLocation)
  location: GeoLocation
}

export const schema = {
    res: [getStudentTrackRes],
    body: getStudentTrackReqBody,
    query: getStudentTrackReqQuery,
    params: getStudentTrackReqParams
};

export type RerturnType = typeof schema['res'] extends (infer R)[] 
  ? R extends new (...args: any[]) => any 
    ? InstanceType<R>
    : never
  : never;

export type Req = Request<getStudentTrackReqParams, any, getStudentTrackReqBody, getStudentTrackReqQuery>;
