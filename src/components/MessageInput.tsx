interface Args {
    onPressed: () => void;
}
export default function MessageInput(data: Args) {
    return (
        <div className="flex w-full sizeH10 pb-3">
            <div onClick={data.onPressed} className="h-full mr-2 my-2 border-gray-400 border  flex justify-center items-center px-5 ">
                <span>Stop</span>
            </div>
            <div className="h-full w-full my-2 border-gray-400 border flex justify-center items-center ">
                <input type="text" className="w-full h-full pl-2" placeholder="Type your message" />
            </div>
            <div className="h-full ml-2 my-2 border-gray-400 border  flex justify-center items-center px-5">
                <img src="send.png" alt="send" />
            </div>
        </div>
    )
}
