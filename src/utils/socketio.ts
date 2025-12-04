import { Namespace, Server, Socket } from 'socket.io';
import { verifyAccessToken } from './jwt';
import prisma from '@src/config/prisma.config';

// c -> s
interface SocketEvents {
    joinNotificationRoom: (accessToken: string) => void;
    joinTripRoom: (tripId: string) => void;
    NewNotification: (notification: any) => void;
    LiveLocationUpdate: (location: { lat: number; lng: number }) => void;
    SystemAlert: (message: string) => void;
    UpdateLocation: (location: { lat: number; lng: number }) => void;
}


interface NotificationType {
    type: string;
    message: string;
    data?: string;
    timestamp: Date;
}

// s -> c
interface SocketEmits {
    NewNotification: (notification: NotificationType) => void;
    LiveLocationUpdate: (location: { lat: number; lng: number }) => void;
    SystemAlert: (message: string) => void;
    UpdateLocation: (location: { lat: number; lng: number }) => void;
    Success: () => void;
    Error: (message: string) => void;
}

let io: Server<SocketEvents, SocketEmits>;

export function setSocketIO(socketIO: Server) {
    io = socketIO;
    console.log('Socket.IO initialized');

    io.on('connection', (socket: Socket<SocketEvents, SocketEmits>) => {
        console.log(`New client connected: ${socket.id}`);
        socket.on('joinNotificationRoom', (accessToken: string) => {
            try {
                const decoded = verifyAccessToken(accessToken);
                const userId = decoded.user.id;
                socket.join(`/notifications:${userId}`);
            }
            catch (err) {
                socket.emit('Error', 'Invalid access token');
            }
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

// notify parents if the trip is start
export async function notifyTripStart(routeId: string) {
    if (!io) throw new Error('Socket.IO not initialized');
    // prisma.studentAssignment.
    const userIds = await prisma.user.findMany({
        where: {
            Student: {
                StudentAssignment: {
                    some: {
                        routeId: routeId
                    }
                }
            }
        },
        select: {
            id: true
        }
    })
    io.to(userIds.map(a => `/notifications:${a.id}`)).emit('NewNotification', {
        type: 'TripStart',
        message: `The bus trip has started.`,
        data: undefined,
        timestamp: new Date(),
    })
}

// send to users if bus is arriving at their station
export async function notifyBusArrivalStation(spId: string, location: { lat: number; lng: number }) {
    if (!io) throw new Error('Socket.IO not initialized');
    // prisma.studentAssignment.
    const userIds = await prisma.user.findMany({
        where: {
            Student: {
                StudentAssignment: {
                    some: {
                        stopId: spId
                    }
                }
            }
        },
        select: {
            id: true
        }
    })

    io.to(userIds.map(a => `/notifications:${a.id}`)).emit('NewNotification', {
        type: 'BusArrival',
        message: `The bus is arriving at your station.`,
        data: JSON.stringify(location),
        timestamp: new Date(),
    })
}

export async function notifyBusDepartureStation(spId: string, location: { lat: number; lng: number }) {
    if (!io) throw new Error('Socket.IO not initialized');
    // prisma.studentAssignment.
    const userIds = await prisma.user.findMany({
        where: {
            Student: {
                StudentAssignment: {
                    some: {
                        stopId: spId
                    }
                }
            }
        },
        select: {
            id: true
        }
    })

    io.to(userIds.map(a => `/notifications:${a.id}`)).emit('NewNotification', {
        type: 'BusDeparture',
        message: `The bus has departed from your station.`,
        data: JSON.stringify(location),
        timestamp: new Date(),
    })
}

export async function notifyPickupStudent(stId: string) {
    if (!io) throw new Error('Socket.IO not initialized');
    const userIds = await prisma.user.findMany({
        where: {
            Student: {
                StudentAssignment: {
                    some: {
                        studentId: stId
                    }
                }
            }
        },
        select: {
            id: true
        }
    });


    io.to(userIds.map(a => `/notifications:${a.id}`)).emit('NewNotification', {
        type: 'StudentPickup',
        message: `Your child is being picked up.`,
        data: undefined,
        timestamp: new Date(),
    })
}


export async function notifyDropoffStudent(stId: string) {
    if (!io) throw new Error('Socket.IO not initialized');
    // prisma.studentAssignment.
    const userIds = await prisma.user.findMany({
        where: {
            Student: {
                StudentAssignment: {
                    some: {
                        studentId: stId
                    }
                }
            }
        },
        select: {
            id: true
        }
    });

    io.to(userIds.map(a => `/notifications:${a.id}`)).emit('NewNotification', {
        type: 'StudentDropoff',
        message: `Your child has been dropped off.`,
        data: undefined,
        timestamp: new Date(),
    })
}
