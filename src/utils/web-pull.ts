import webpush, { WebPushError } from "web-push"
import env from "../env"
import prisma from "@src/config/prisma.config"
import { Logger } from "./logger"

const logger = new Logger("WebPush");


export async function initializeWebPush() {
    webpush.setVapidDetails(
        `mailto:${env.WEB_PUSH_MAILTO}`,
        env.WEB_PUSH_PUBLIC_KEY,
        env.WEB_PUSH_PRIVATE_KEY
    )
}

export async function sendWebPushNotification(
    subscription: webpush.PushSubscription,
    payload: string
) {
    try {
        await webpush.sendNotification(subscription, payload)
    } catch (error) {
        logger.error("Error sending web push notification: " + JSON.stringify(error));
    }
}


export async function sendWebPushNotificationByUserId(
    userId: string,
    payload: string
) {
    const subscriptions = await prisma.notifySubscription.findMany({
        where: {
            userId: userId
        }
    })

    const tasks = subscriptions.map(async sub => {
        const data = sub.subscription as unknown as any;
        const subscription: webpush.PushSubscription = {
            endpoint: data.endpoint,
            keys: {
                p256dh: data.keys.p256dh,
                auth: data.keys.auth
            }
        }

        try {
            await webpush.sendNotification(subscription, payload)
            logger.info(`Web push notification sent to user ${userId} for subscription ${sub.id}`)
        }
        catch (error) {
            // NOTE: if error is 410 Gone or 404 Not Found, remove the subscription from database
            if (error instanceof WebPushError)
                await prisma.notifySubscription.delete({
                    where: {
                        id: sub.id
                    }
                })
            logger.warn(`Failed to send web push notification to user ${userId} for subscription ${sub.id}: ${error}`)
            logger.debug(JSON.stringify(error));
        }
    })

    await Promise.all(tasks)
}
