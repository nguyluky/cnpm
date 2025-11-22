import { ApiRequestStatus } from "@lib/httpMethod";
import { IsNumber, IsObject, IsString } from "@lib/type_declaration";
import { BusData, BusMetadata } from "@src/types/share.type";
import { Request } from "express";
import "reflect-metadata";

export class createBusReqBody {
  @IsString()
  licensePlate: string;

  @IsNumber()
  capacity: number;

  @IsObject(BusMetadata)
  metadata: BusMetadata;
}
export class createBusReqQuery {}
export class createBusReqParams {}

export
@ApiRequestStatus({
  statusCode: 200,
  statusMess: "Success",
})
class createBusRes extends BusData {}

export const schema = {
  res: [createBusRes],
  body: createBusReqBody,
  query: createBusReqQuery,
  params: createBusReqParams,
};

export type RerturnType = (typeof schema)["res"] extends (infer R)[]
  ? R extends new (...args: any[]) => any
    ? InstanceType<R>
    : never
  : never;

export type Req = Request<
  createBusReqParams,
  any,
  createBusReqBody,
  createBusReqQuery
>;
