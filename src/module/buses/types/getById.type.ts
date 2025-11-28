import { ApiRequestStatus } from "@lib/httpMethod";
import { Formats, IsString } from "@lib/type_declaration";
import { BusData } from "@src/types/share.type";
import { Request } from "express";
import "reflect-metadata";

export class getByIdReqBody {}
export class getByIdReqQuery {}
export class getByIdReqParams {
  @IsString()
  id: string;
}

export
@ApiRequestStatus({
  statusCode: 200,
  statusMess: "Success",
})
class getByIdRes extends BusData {}

export const schema = {
  res: [getByIdRes],
  body: getByIdReqBody,
  query: getByIdReqQuery,
  params: getByIdReqParams,
};

export type RerturnType = (typeof schema)["res"] extends (infer R)[]
  ? R extends new (...args: any[]) => any
    ? InstanceType<R>
    : never
  : never;

export type Req = Request<
  getByIdReqParams,
  any,
  getByIdReqBody,
  getByIdReqQuery
>;
