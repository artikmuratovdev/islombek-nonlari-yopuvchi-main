import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ForBakery, Private } from "./_components";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { Title } from "@/components";

export const CloserExpense = () => {
  return (
    <div>
      <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[12px] pt-[20px] -ml-[20px] fixed top-0 w-full">
        <div className="flex justify-between items-center">
          <Link to={"/"}>
            <IoArrowBack
              size={25}
              className="bg-[#FFCC15] text-[#1C2C57] rounded-full p-1 shrink-0 cursor-pointer"
            />
          </Link>
          <Title text={"Xarajatlar"} className="text-white mx-auto" />
        </div>
      </div>
      <Tabs defaultValue="for-bakery" className="w-full">
        <TabsList className="grid grid-cols-2 bg-white text-[15px] font-[700] text-[#1C2C57] ">
          <TabsTrigger value="for-bakery" className="py-[7px]">
            Nonvoyxona uchun
          </TabsTrigger>
          <TabsTrigger value="private" className="py-[7px]">
            Shaxsiy
          </TabsTrigger>
        </TabsList>
        <TabsContent value="for-bakery">
          <ForBakery />
        </TabsContent>
        <TabsContent value="private">
          <Private />
        </TabsContent>
      </Tabs>
    </div>
  );
};
