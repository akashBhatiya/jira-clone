import { Server, Socket } from 'socket.io';

export default class SocketEventHandler {
    private static instance: SocketEventHandler;
    private io: Server;

    private constructor(io: Server) {
        this.io = io;
    }

    public static getInstance(io: Server): SocketEventHandler {
        if (!SocketEventHandler.instance) {
            SocketEventHandler.instance = new SocketEventHandler(io);
        }
        return SocketEventHandler.instance;
    }

    public initializeEvents(): void {
        this.io.on('connection', (socket: Socket) => {
            console.log('Client connected:', socket.id);
            
            // Initialize all event listeners
            this.handleRoomEvents(socket);
            this.handleBrowserStreamEvents(socket);
            this.handleDisconnect(socket);
            // Add more event category handlers here
        });
    }

    private handleRoomEvents(socket: Socket): void {
        socket.on('join-room', (roomId: string) => {
            socket.join(roomId);
            console.log(`Client ${socket.id} joined room: ${roomId}`);
        });

        socket.on('leave-room', (roomId: string) => {
            socket.leave(roomId);
            console.log(`Client ${socket.id} left room: ${roomId}`);
        });
    }

    private handleBrowserStreamEvents(socket: Socket): void {
        socket.on('start-stream', (data: { roomId: string }) => {
            console.log(`Starting stream in room: ${data.roomId}`);
            // Add stream start logic if needed
        });

        socket.on('stop-stream', (data: { roomId: string }) => {
            console.log(`Stopping stream in room: ${data.roomId}`);
            // Add stream stop logic if needed
        });
    }

    private handleDisconnect(socket: Socket): void {
        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    }
}