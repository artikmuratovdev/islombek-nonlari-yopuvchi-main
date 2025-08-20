import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Title } from "@/components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoArrowBack } from "react-icons/io5";
import { useGetMessageQuery, useGetUserQuery, useSendMessageMutation } from "@/integration/api";
import { socket } from "@/utils";
import { useAutoScroll } from "@/hooks";

export const ChattingArea = () => {
  const { id } = useParams();
  const chatRef = useAutoScroll();
  const { data: user } = useGetUserQuery(id as GetUserRequest);
  const { data: messages, refetch, } = useGetMessageQuery({ id } as GetMessageRequest);
  const [sendMessage, { isLoading: sendMessageLoading }] = useSendMessageMutation();
  const [message, setMessage] = useState("");


  useEffect(() => {
    socket.on("message", (data) => {
      if (data.to === id || data.from === id) {
        refetch();
      }
    });
    return () => {
      socket.off("message");
    };
  }, [id, refetch]);


  const handleSendMessage = async () => {
    if (!message.trim()) return;
    const newMessage = await sendMessage({ content: message, to: id as string }).unwrap();
    socket.emit("message", newMessage);
    setMessage("");
    refetch();
  };

  const dates: { [x: string]: true | undefined } = {};

  return (
    <>
      <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[12px] pt-[20px] fixed -top-1 w-full">
        <div className="flex items-center gap-x-4 w-full">
          <Link to={'/message'}>
            <IoArrowBack
              size={25}
              className="bg-[#FFCC15] text-[#1C2C57] rounded-full p-1 shrink-0 cursor-pointer"
            />
          </Link>
          <img src={user?.avatar} alt="avatar" loading="lazy" className="rounded-full size-[40px]" />
          <Title text={user?.fullName} className="text-white line-clamp-1 w-full" />
        </div>
      </div>

      <div ref={chatRef} className="pb-[100px] pt-[82px] px-[10px] overflow-y-auto">
        {messages?.map((msg, index) => (msg = messages[messages.length - index - 1], <>
          {!dates[msg.createdAt.slice(0, 10)] && (dates[msg.createdAt.slice(0, 10)] = true, <div className="text-center text-white text-sm text-[12px] font-semibold my-2">{msg.createdAt.slice(0, 10)}</div>)}
          <div
            key={index}
            className={`w-[70%] p-3 rounded-t-[10px] mt-[10px] ${msg.from === id
              ? "rounded-br-[10px] bg-white text-[#1C2C57]"
              : "ml-auto rounded-bl-[10px] bg-[#9191ED] text-white"
              }`}
          >
            <p className="text-[15px] font-[400] break-words">{msg.content}</p>
            <p className="text-[12px] font-[400] text-end">{new Date(msg.createdAt).toLocaleTimeString()}</p>
          </div>
        </>
        ))}
      </div>

      <div className="flex items-center gap-x-2 fixed bottom-0 w-full p-2 bg-white">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full outline-none"
          placeholder="Type a message..."
        />
        <Button onClick={handleSendMessage} disabled={sendMessageLoading} className="bg-[#FFCC15] rounded-[8px] py-[10px] px-[20px] font-[700] text-white">
          Send
        </Button>
      </div>
    </>
  );
};

