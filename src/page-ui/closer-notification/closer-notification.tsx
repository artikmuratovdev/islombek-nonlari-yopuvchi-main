import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Breads, Cashbacks } from "./_components";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { Title } from "@/components";
import { useGetNotificationsQuery } from "@/integration";
import { socket } from "@/utils";
import { useEffect } from "react";

export const CloserNotification = () => {
  const { data: getNotifications, refetch } = useGetNotificationsQuery({});

  useEffect(() => {
    const handleNotification = () => refetch();
    socket.on("notification", handleNotification);
    return () => {
      socket.off("notification", handleNotification);
    };
  }, []);


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
          <Title text={"Bildirishnoma"} className="text-white mx-auto" />
        </div>
      </div>

      <Tabs defaultValue="breads" className="w-full">
        <TabsList className="grid grid-cols-2 bg-white text-[15px] font-[700] text-[#1C2C57] ">
          <TabsTrigger value="breads" className="py-[7px]">
            Kelgan Nonlar
          </TabsTrigger>
          <TabsTrigger value="advance" className="py-[7px]">
            Avans
          </TabsTrigger>
        </TabsList>
        <TabsContent value="breads">
          <Breads data={getNotifications || []} />
        </TabsContent>
        <TabsContent value="advance">
          <Cashbacks data={getNotifications || []} />
        </TabsContent>
      </Tabs>
    </>
  );
};
