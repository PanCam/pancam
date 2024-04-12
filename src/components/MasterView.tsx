// import Webcam from "react-webcam";
import MessageInput from "./MessageInput";
import { MutableRefObject, useEffect, useRef } from "react";
import useSocket from "../services/socket";
import usePeer from "../services/peer";
import Peer, { MediaConnection } from "peerjs";
import { IMatchedData } from "../interface/matched_data.interface";

function MasterView() {
    // Peerjs listners
    const onOpen = (id: string) => {
        console.log('Connected to PeerJS server. ID:', id);
    }

    const onCall = (call: MediaConnection, peer: Peer | null) => {
        console.log('Incoming call')
        console.log(peer);
        if (peer === undefined) return;

        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            call.answer(stream);
            call.on('stream', (remoteStream) => {
                console.log('Remote stream:', remoteStream);
                if (inComingVdoRef.current) {
                    inComingVdoRef.current.srcObject = remoteStream;
                }
            });
        });
    }
    const onPDisconnect = () => { }

    // Socket listners
    const onConnected = () => {
        console.log('Connected to server')
    }
    const onMatched = (data: IMatchedData, peer: Peer | null) => {
        console.log('Matched:', data);
        if (data.call) {
            console.log(peer)
            makeCall(data.peerId);
        }
    }
    const onDisconnected = () => { }
    const onError = (error: Error) => {
        console.error('Error:', error);
    }

    const onWait = () => { }

    const peer = usePeer({ onOpen: onOpen, onCall: onCall, onDisconnected: onPDisconnect });
    const socket = useSocket(peer, { onConnected: onConnected, onMatched: onMatched, onDisconnect: onDisconnected, onError: onError, onWaiting: onWait });
    const videoRef: MutableRefObject<HTMLVideoElement | null> = useRef(null);
    const inComingVdoRef: MutableRefObject<HTMLVideoElement | null> = useRef(null)


    const makeCall = (peerId: string) => {
        console.log('Making call to:', peerId);
        console.log(peer)
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            const call = peer?.call(peerId, stream);
            call?.on('stream', (remoteStream) => {
                console.log('Remote stream:', remoteStream);
                if (inComingVdoRef.current) {
                    inComingVdoRef.current.srcObject = remoteStream;
                }
            });
        })

    }

    const match = (peerId: string) => {
        if (socket) {
            socket.emit('match', { peerId: peerId });
        }
    }


    useEffect(() => {
        getMediaStream();
        // return () => {
        //     if (stream) {
        //         stream.getTracks().forEach((track) => {
        //             track.stop();
        //         });
        //     }
        // };
    }, [])


    const getMediaStream = async () => {
        try {
            navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
                console.log(stream)
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            });
        } catch (error) {
            console.error('Error accessing media devices:', error);
        }
    };

    return (

        <div className="flex master-size p-2">
            <div className="bg-black w-2/6 flex-col">
                <div className="h-2/4">
                    <video ref={inComingVdoRef} autoPlay playsInline />
                </div>
                <video ref={videoRef} autoPlay playsInline muted />
            </div>
            <div className="w-2/3  px-2">
                <div className="h-5/6 sizeH90 border-2">

                </div>
                <MessageInput onPressed={() => {
                    if (peer != null) {
                        match(peer.id);
                    } else {
                        console.log('Peer is null')
                    }
                }} />
            </div>
        </div>
    )
}

export default MasterView