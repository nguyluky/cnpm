import { Namespace, Server, Socket } from 'socket.io';
import { verifyAccessToken } from './jwt';

// c -> s
interface SocketEvents {
    joinNotificationRoom: (accessToken: string) => void;
    joinTripRoom: (tripId: string) => void;
    NewNotification: (notification: any) => void;
    LiveLocationUpdate: (location: { lat: number; lng: number }) => void;
    SystemAlert: (message: string) => void;
    UpdateLocation: (location: { lat: number; lng: number }) => void;
}

// s -> c
interface SocketEmits {
    NewNotification: (notification: any) => void;
    LiveLocationUpdate: (location: { lat: number; lng: number }) => void;
    SystemAlert: (message: string) => void;
    UpdateLocation: (location: { lat: number; lng: number }) => void;
    Success: () => void;
}

let io: Server<SocketEvents, SocketEmits>;

export function setSocketIO(socketIO: Server) {
    io = socketIO;
    console.log('Socket.IO initialized');

    io.on('connection', (socket: Socket<SocketEvents, SocketEmits>) => {
        console.log(`New client connected: ${socket.id}`);
        socket.on('joinNotificationRoom', (accessToken: string) => {
            const decoded = verifyAccessToken(accessToken);
            const userId = decoded.user.id;
            socket.join(`/notifications:${userId}`);
        });

        socket.on('joinTripRoom', (tripId: string) => {
            console.log(`Socket joining trip room: /trip:${tripId}`);
            socket.join(`/trip:${tripId}`);
        });
        socket.emit('Success');

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });

}

export function sendNotification(userId: string, notification: any) {
    if (!io) throw new Error('Socket.IO not initialized');

    io.to(`/notifications:${userId}`).emit('NewNotification', {
        ...notification,
        timestamp: new Date()
    });
}


export function sendLiveLocationUpdate(tripId: string, location: { lat: number; lng: number }) {
    if (!io) throw new Error('Socket.IO not initialized');

    io.to(`/trip:${tripId}`).emit('LiveLocationUpdate', {
        ...location,
    });
}

export function broadcastAlert(message: string) {
    if (!io) throw new Error('Socket.IO not initialized');

    io.emit('SystemAlert', message);
}
