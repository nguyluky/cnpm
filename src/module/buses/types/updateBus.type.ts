import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { ObjectType } from "@lib/validate";
import { Formats, IsNumber, IsObject, IsString } from "@lib/type_declaration";
import { BusData, BusMetadata } from "@src/types/share.type";

export class updateBusReqBody {
  @IsString()
  licensePlate: string;

  @IsNumber()
  capacity: number;

  @IsObject(BusMetadata)
  metadata: BusMetadata;
}

export class updateBusReqQuery {}

export class updateBusReqParams {
  @IsString({
    format: Formats.uuid,
  })
  id: string;
}

export
@ApiRequestStatus({
  statusCode: 200,
  statusMess: "Success",
})
class updateBusRes extends BusData {}

export const schema = {
  res: [updateBusRes],
  body: updateBusReqBody,
  query: updateBusReqQuery,
  params: updateBusReqParams,
};

export type RerturnType = (typeof schema)["res"] extends (infer R)[]
  ? R extends new (...args: any[]) => any
    ? InstanceType<R>
    : never
  : never;

export type Req = Request<
  updateBusReqParams,
  any,
  updateBusReqBody,
  updateBusReqQuery
>;

