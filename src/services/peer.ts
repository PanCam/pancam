import { useState, useEffect } from 'react';
import Peer, { MediaConnection } from 'peerjs';

interface Args {
    onOpen: (id: string) => void;
    onCall: (call: MediaConnection, peer: Peer | null) => void;
    onDisconnected: () => void;
}

const usePeer = (data: Args) => {
    const [peer, setPeer] = useState<Peer | null>(null);

    useEffect(() => {
        const initializePeer = async () => {
            try {
                const newPeer = new Peer();
                newPeer.on('open', (id) => {
                    data.onOpen(id);
                });
                newPeer.on('call', (d: MediaConnection) => data.onCall(d, newPeer));
                newPeer.on('disconnected', data.onDisconnected);
                setPeer(newPeer);
                console.log('line')
                console.log(peer);
            } catch (error) {
                console.error('Error initializing PeerJS:', error);
            }
        };

        initializePeer();

        // Clean up function
        return () => {
            if (peer) {
                peer.disconnect();
            }
        };
    }, []);
    return peer;
};

export default usePeer;

