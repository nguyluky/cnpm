import { SocketController, SocketEmitEvent } from "@lib/socket_declaration";
import {
    SocketEmit,
    SocketNamespace,
    SocketResponse
} from "@lib/socket_decorators";
import { Formats, IsEnum, IsString } from "@lib/type_declaration";
import { JWT_AUTH } from "@src/utils/jwt";
import { Socket } from "socket.io";

// Example notification schemas
class NotificationData {
    @IsString()
    userId: string;
    @IsString()
    type: string;
    @IsString()
    message: string;
    @IsString({format: Formats["iso.datetime"], optional: true})
    data?: string;

    @IsString({format: Formats["iso.datetime"]})
    timestamp: string;
}

class SystemAlertData {
    @IsString()
    message!: string;
    @IsEnum({
        value:  ['info' , 'warning' , 'error']
    })
    @IsEnum({
        value: ['info' , 'warning' , 'error']
    })
    level: 'info' | 'warning' | 'error';

    @IsString({format: Formats["iso.datetime"]})
    timestamp: string;
}

class UserMentionData {
    @IsString()
    userId: string;
    @IsString()
    mentionedBy: string;
    @IsString()
    postId: string;
    @IsString()
    message: string;
    @IsString({format: Formats["iso.datetime"]})
    timestamp: string;
}

@SocketNamespace('/notifications', { 
    description: 'Real-time notifications system',
    auth: [JWT_AUTH]
})
export class SocketNotificationController extends SocketController {

    onConnect(client: Socket): void {
        const userId = client.data?.user?.id || client.id;
        client.join(`/notifications:${userId}`);
        console.log(`User ${userId} connected to notifications`);
    }

    @SocketEmit('NewNotification', {
        description: 'Send notification to specific user'
    })
    @SocketResponse(NotificationData)
    sendNotification(userId: string, notification: any) {
        return new SocketEmitEvent('NewNotification', {
            userId,
            ...notification,
            timestamp: new Date()
        }, userId);
    }

    @SocketEmit('SystemAlert', {
        description: 'System-wide alert message'
    })
    @SocketResponse(SystemAlertData)
    broadcastSystemAlert(alertData: any) {
        return new SocketEmitEvent('SystemAlert', {
            ...alertData,
            timestamp: new Date()
        }, undefined, undefined, true); // Broadcast to all
    }

    @SocketEmit('UserMentioned', {
        description: 'User was mentioned in a post or comment'
    })
    @SocketResponse(UserMentionData)
    notifyUserMention(userId: string, mentionData: any) {
        return new SocketEmitEvent('UserMentioned', {
            userId,
            ...mentionData,
            timestamp: new Date()
        }, userId);
    }

    @SocketEmit('UserOnline', {
        description: 'Notify when a user comes online'
    })
    @SocketResponse(class UserOnlineData {
        userId!: string;
        timestamp!: Date;
    })
    notifyUserOnline(userId: string) {
        return new SocketEmitEvent('UserOnline', {
            userId,
            timestamp: new Date()
        }, undefined, undefined, true); // Broadcast
    }
}
