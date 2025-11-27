import { ApiRequestStatus } from "@lib/httpMethod";
import { Formats, IsArray, IsObject, IsString } from "@lib/type_declaration";
import { ObjectType } from "@lib/validate";
import { AnyObject, RouteMeta } from "@src/types/share.type";
import { Request } from "express";
import "reflect-metadata";

// { name?: string; meta?: any; stopPointIds?: string[] }
export class updateReqBody {
  @IsString()
  name: string;

  @IsObject(RouteMeta, { optional: true })
  meta?: RouteMeta;

  @IsArray(String, { minItems: 1, maxItems: 50 })
  stopPointIds: string[];
}
export class updateReqQuery {}
export class updateReqParams {
  @IsString({
    format: Formats.uuid,
  })
  id: string;
}

// { id, name, updatedAt }
export @ApiRequestStatus({
  statusCode: 200,
  statusMess: "Success",
})
class updateRes extends ObjectType {
  @IsString({
    format: Formats.uuid,
  })
  id: string;

  @IsString()
  name: string;

  @IsString({
    format: Formats["iso.datetime"],
  })
  updatedAt: string;
}

export const schema = {
  res: [updateRes],
  body: updateReqBody,
  query: updateReqQuery,
  params: updateReqParams,
};

export type RerturnType = (typeof schema)["res"] extends (infer R)[]
  ? R extends new (...args: any[]) => any
    ? InstanceType<R>
    : never
  : never;

export type Req = Request<updateReqParams, any, updateReqBody, updateReqQuery>;
