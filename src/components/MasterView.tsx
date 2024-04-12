import Webcam from "react-webcam";
import MessageInput from "./MessageInput";

const WebcamComponent = () => <Webcam className="h-2/4 w-max bg-pink-50" />;
function MasterView() {
    return (
        <div className="flex master-size p-2">
            <div className="bg-black w-2/6 flex-col">
                <div className="h-2/4">
                    skcnjs
                </div>
                <WebcamComponent />
            </div>
            <div className="w-2/3  px-2">
                <div className="h-5/6 sizeH90 border-2">

                </div>
                <MessageInput />
            </div>
        </div>
    )
}

export default MasterView