'use client';
import { io, Socket } from 'socket.io-client';
import { useEffect, useState } from 'react';

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const socket = io(SOCKET_URL, {
    autoConnect: false,
    transports: ['websocket'],
});

export const useSocket = (userId?: string) => {
    const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(() => {
        if (!userId) return;

        socket.io.opts.query = { userId };
        socket.connect();

        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.disconnect();
        };
    }, [userId]);

    return { socket, isConnected };
};
