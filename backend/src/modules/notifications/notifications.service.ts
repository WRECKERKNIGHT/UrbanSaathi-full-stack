import { Injectable, Logger } from '@nestjs/common';
import { Server } from 'socket.io';
import { WebSocketServer } from '@nestjs/websockets';

@Injectable()
export class NotificationsService {
    @WebSocketServer()
    server: Server;

    private readonly logger = new Logger(NotificationsService.name);

    setServer(server: Server) {
        this.server = server;
    }

    /**
     * Emits an event to a specific user's room
     */
    emitToUser(userId: string, event: string, data: any) {
        if (!this.server) {
            this.logger.error('WebSocket server not initialized');
            return;
        }
        this.logger.log(`Emitting ${event} to user: ${userId}`);
        this.server.to(`user_${userId}`).emit(event, data);
    }

    /**
     * Emits an event to multiple users
     */
    emitToMany(userIds: string[], event: string, data: any) {
        if (!this.server) {
            this.logger.error('WebSocket server not initialized');
            return;
        }
        this.logger.log(`Emitting ${event} to ${userIds.length} users`);
        userIds.forEach(userId => {
            this.server.to(`user_${userId}`).emit(event, data);
        });
    }

    /**
     * Broadcasts an event to all connected clients
     */
    broadcast(event: string, data: any) {
        if (!this.server) {
            this.logger.error('WebSocket server not initialized');
            return;
        }
        this.logger.log(`Broadcasting ${event}`);
        this.server.emit(event, data);
    }
}
