import { useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';
import { IMatchedData } from '../interface/matched_data.interface';
import Peer from 'peerjs';

interface Args {
    onMatched: (data: IMatchedData, peer: Peer | null) => void;
    onDisconnect: () => void;
    onError: (error: Error) => void;
    onConnected: () => void;
    onWaiting: () => void;
}

const useSocket = (peer: Peer | null, data: Args) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    useEffect(() => {
        const initSocket = () => {
            const newSocket: Socket = io('ws://gateway.pancam.live');
            newSocket.on('connected', data.onConnected);
            newSocket.on('matched', (d: IMatchedData) => { data.onMatched(d, peer) });
            newSocket.on('disconnect', data.onDisconnect);
            newSocket.on('waiting', data.onWaiting);
            setSocket(newSocket);
        }
        if (peer) {
            initSocket();
        }
        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, [peer]);

    return socket;
};

export default useSocket;
