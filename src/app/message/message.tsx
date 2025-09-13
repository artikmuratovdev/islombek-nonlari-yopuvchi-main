import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BottomSheet } from "@/components/common/bottom-sheet";
import { AddPersonIcon } from "./add-person";
import { useGetAllMessagesQuery } from "@/integration/api/chat/chat";
import { AddPerson } from "./components";
import { IoArrowBack } from "react-icons/io5";

export const Messages = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { data: messages, refetch } = useGetAllMessagesQuery();

  useEffect(() => {
    refetch();
  }, [messages]);

  return (
    <div className="bg-[#1C2C57] min-h-screen -ml-[20px]">
      <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[12px] pt-[20px] fixed top-0 w-full">
        <div className="flex w-[95%] m-auto justify-center items-center">
          <Button
            className="w-8 h-8 rounded-full bg-[#FFCC15]"
            onClick={() => navigate(-1)}
          >
            <IoArrowBack size={16} />
          </Button>
          <h3 className="text-center w-full text-white text-2xl font-semibold font-inter leading-[31.20px]">
            Message
          </h3>
        </div>
      </div>
      <div className="mt-[70px] p-5">
        <div className="flex flex-col gap-y-[27px]">
          {messages?.map((item) => (
            <div
              onClick={() => navigate(`/chat/${item.user._id}`)}
              key={item.user._id}
              className="bg-white rounded-lg p-1"
            >
              <div className="flex gap-x-[10px] items-center">
                <img src={item.user.avatar} className="rounded-lg" alt="" />
                <div className="flex flex-col gap-y-1 items-start">
                  <h4 className="text-center text-[#1b2b56] text-sm font-black font-inter leading-[18.20px]">
                    {item.user.fullName}
                  </h4>
                  <h5 className="text-center text-[#1b2b56] text-xs font-semibold font-['Inter'] leading-none">
                    {item.lastMessage.content}
                  </h5>
                </div>
                <div className="flex ml-auto flex-col gap-y-1 items-end">
                  <h4 className="text-center bg-[#1b2b56] text-sm font-inter leading-[18.20px] w-7 h-7 rounded-full text-[#ffcb15] flex justify-center items-center">
                    {item.unreadCount}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Button
        onClick={() => setOpen(true)}
        className="fixed bottom-[104px] right-5 h-10 p-3 bg-[#ffcb15] text-3xl rounded-full justify-center items-center gap-1 inline-flex text-[#1C2C57] hover:bg-[#ffcb15]"
      >
        <AddPersonIcon />
      </Button>
      <BottomSheet children={<AddPerson />} open={open} setOpen={setOpen} />
    </div>
  );
};
