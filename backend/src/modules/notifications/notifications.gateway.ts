import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@WebSocketGateway({
    cors: {
        origin: '*', // In production, restrict this to your frontend URL
    },
})
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    private readonly logger = new Logger(NotificationsGateway.name);

    constructor(private readonly notificationsService: NotificationsService) { }

    afterInit(server: Server) {
        this.notificationsService.setServer(server);
        this.logger.log('WebSocket Gateway initialized');
    }

    handleConnection(client: Socket) {
        const userId = client.handshake.query.userId as string;

        if (userId) {
            client.join(`user_${userId}`);
            this.logger.log(`Client connected: ${client.id}, for user: ${userId}`);
        } else {
            this.logger.warn(`Client connected without userId: ${client.id}`);
        }
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    @SubscribeMessage('ping')
    handlePing(@ConnectedSocket() client: Socket): string {
        return 'pong';
    }
}
