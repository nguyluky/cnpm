import * as getVAPIDpubType from "./types/getVAPIDpub.type";
import { Get, Post, Put, Delete, Summary, useAuth } from "@lib/httpMethod";
import prisma from "@src/config/prisma.config";
import { Validate } from "@lib/validate";
import * as test_notifyType from "./types/test_notify.type";
import * as save_subscriptionType from "./types/save_subscription.type";
import { JWT_AUTH } from "@src/utils/jwt";
import crypto from "crypto";
import { sendWebPushNotificationByUserId } from "@src/utils/web-pull";
import env from "@src/env";

export default class NotifyController {
    @Post("/save_subscription")
    @Summary("Save Subscription")
    @useAuth(JWT_AUTH)
    @Validate(save_subscriptionType.schema)
    async save_subscription(req: save_subscriptionType.Req): Promise<save_subscriptionType.RerturnType> {
        const { subscription } = req.body;
        const userId = req.user.id;

        const subscriptionString = JSON.stringify(subscription);
        // NOTE:
        // hash subscriptionString make this id
        // make sure that length of id is < 191
        const subscriptionId = crypto.createHash('sha1').update(subscriptionString).digest('hex');


        await prisma.notifySubscription.upsert({
            where: { id: subscriptionId },
            create: {
                id: subscriptionId,
                userId,
                subscription: subscription as any,
            },
            update: {
                userId,
            },
        })

        return save_subscriptionType.save_subscriptionRes.parse({});
    }

    @Post("/test_notify")
    @Validate(test_notifyType.schema)
    async test_notify(req: test_notifyType.Req): Promise<test_notifyType.RerturnType> {
        const { userId, body, title} = req.body;

        await sendWebPushNotificationByUserId(userId, JSON.stringify({
            title: title,
            body,
        }));
        
        return test_notifyType.test_notifyRes.parse({});
    }

    @Get("/getVAPIDpub")
    @Summary("Get VAPID Public Key")
    @Validate(getVAPIDpubType.schema)
    async getVAPIDpub(req: getVAPIDpubType.Req): Promise<getVAPIDpubType.RerturnType> {
        return getVAPIDpubType.getVAPIDpubRes.parse({
            vapidPublicKey: env.WEB_PUSH_PUBLIC_KEY,
        });
    }

}
