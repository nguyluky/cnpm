import { ApiRequestStatus } from "@lib/httpMethod";
import { Formats, IsObject, IsString } from "@lib/type_declaration";
import { StudentData, StudentMetadata } from "@src/types/share.type";
import { Request } from "express";
import "reflect-metadata";

export class updateReqBody {
  @IsString()
  name: string;

  @IsObject(StudentMetadata)
  metadata: StudentMetadata;
}

export class updateReqQuery {}

export class updateReqParams {
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
class updateRes extends StudentData {}

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
