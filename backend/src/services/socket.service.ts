// src/services/socket.service.ts
import { Server, Socket } from 'socket.io';

class SocketService {
    private static io: Server;
    private static instance: SocketService;

    private constructor() {}

    public static getInstance(): SocketService {
        if (!SocketService.instance) {
            SocketService.instance = new SocketService();
        }
        return SocketService.instance;
    }

    public static setIO(io: Server) {
        SocketService.io = io;
    }

    // Emit to all clients
    public emitToAll(event: string, data: any) {
        if (SocketService.io) {
            SocketService.io.emit(event, data);
        }
    }

    // Emit to specific room
    public emitToRoom(room: string, event: string, data: any) {
        if (SocketService.io) {
            SocketService.io.to(room).emit(event, data);
        }
    }

    // Emit to specific socket
    public emitToSocket(socketId: string, event: string, data: any) {
        if (SocketService.io) {
            SocketService.io.to(socketId).emit(event, data);
        }
    }

    // Join room
    public joinRoom(socketId: string, room: string) {
        const socket = SocketService.io.sockets.sockets.get(socketId);
        if (socket) {
            socket.join(room);
        }
    }

    // Leave room
    public leaveRoom(socketId: string, room: string) {
        const socket = SocketService.io.sockets.sockets.get(socketId);
        if (socket) {
            socket.leave(room);
        }
    }
}

export default SocketService;