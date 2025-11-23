import { ApiRequestStatus } from "@lib/httpMethod";
import { IsObject, IsString } from "@lib/type_declaration";
import { StudentData, StudentMetadata } from "@src/types/share.type";
import { Request } from "express";
import "reflect-metadata";

export class createReqBody {
  @IsString()
  name: string;

  @IsString({
    // format: "uuid",
  })
  userId: string;

  @IsObject(StudentMetadata)
  metadata: StudentMetadata;
}

export class createReqQuery {}
export class createReqParams {}

export
@ApiRequestStatus({
  statusCode: 200,
  statusMess: "Success",
})
class createRes extends StudentData {}

export const schema = {
  res: [createRes],
  body: createReqBody,
  query: createReqQuery,
  params: createReqParams,
};

export type RerturnType = (typeof schema)["res"] extends (infer R)[]
  ? R extends new (...args: any[]) => any
    ? InstanceType<R>
    : never
  : never;

export type Req = Request<createReqParams, any, createReqBody, createReqQuery>;
