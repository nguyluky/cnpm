import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { ObjectType } from "@lib/validate";
import { RequestWithUser } from "@src/utils/jwt";
import { IsObject, IsString } from "@lib/type_declaration";

class SubscriptionKeys extends ObjectType {
    @IsString()
    p256dh: string;

    @IsString()
    auth: string;
}

class Subscription extends ObjectType {
    @IsString()
    endpoint: string;

    @IsObject(SubscriptionKeys)
    keys: SubscriptionKeys;
}
export class save_subscriptionReqBody {
    @IsObject(Subscription)
    subscription: Subscription;
}
export class save_subscriptionReqQuery {}
export class save_subscriptionReqParams {}


export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class save_subscriptionRes extends ObjectType {

}

export const schema = {
    res: [save_subscriptionRes],
    body: save_subscriptionReqBody,
    query: save_subscriptionReqQuery,
    params: save_subscriptionReqParams
};

export type RerturnType = typeof schema['res'] extends (infer R)[] 
  ? R extends new (...args: any[]) => any 
    ? InstanceType<R>
    : never
  : never;

export type Req = Request<save_subscriptionReqParams, any, save_subscriptionReqBody, save_subscriptionReqQuery> & RequestWithUser;
