import { Link } from "react-router-dom";
import { AddUser } from "./_components";
import { useGetMessagesQuery } from "@/integration/api";
import { IoArrowBack } from "react-icons/io5";
import { Loader, Title } from "@/components";

export const MessageUI = () => {
  const { data: getMessages, isLoading } = useGetMessagesQuery({})

  return (
    <>
      <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[12px] pt-[20px] -ml-[20px] fixed top-0 w-full">
        <div className="flex justify-between items-center">
          <Link to={'/'}>
            <IoArrowBack
              size={25}
              className="bg-[#FFCC15] text-[#1C2C57] rounded-full p-1 shrink-0 cursor-pointer"
            />
          </Link>
          <Title text={"Xabarlar"} className="text-white mx-auto" />
        </div>
      </div>

      <div className="pt-[50px] space-y-[25px]">
        {isLoading && <Loader className="mx-auto size-[50px]" />}
        {getMessages?.filter(item => item?.chat).map((item) => (
          <Link
            key={item?.chat?._id}
            to={`/message/${item?.chat?._id}`}
            className="rounded-[8px] bg-white p-1 flex items-center gap-x-[10px] cursor-pointer"
          >
            <img src={item?.chat?.avatar} alt="avatar" loading="lazy" className="size-[50px] rounded-[8px]" />
            <div className="text-[#1C2C57] flex flex-col">
              <span className="text-[19px] font-[900]">{item.chat?.fullName}</span>
              <span className="text-[12px] font-semibold">{item?.lastMessage}</span>
            </div>
          </Link>
        ))}
        <AddUser />
      </div>
    </>
  );
};
