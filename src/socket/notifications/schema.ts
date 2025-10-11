import { SocketEmitEvent } from "@lib/socket_declaration";

export class NewNotificationEvent extends SocketEmitEvent<any> {
    constructor(data: any, to?: string | string[]) {
        super('NewNotification', data, to);
    }
}
