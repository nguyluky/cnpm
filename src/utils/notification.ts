import { Server } from 'socket.io';

let io: Server;

export function setSocketIO(socketIO: Server) {
  io = socketIO;
}

export function sendNotification(userId: string, notification: any) {
  if (!io) throw new Error('Socket.IO not initialized');
  
  io.to(`/notifications:${userId}`).emit('NewNotification', {
    ...notification,
    timestamp: new Date()
  });
}

export function broadcastAlert(message: string) {
  if (!io) throw new Error('Socket.IO not initialized');
  
  io.emit('SystemAlert', {
    message,
    timestamp: new Date()
  });
}