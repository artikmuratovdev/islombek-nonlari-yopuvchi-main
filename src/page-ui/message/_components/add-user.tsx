import { SelectUser } from "@/components";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useGetUsersQuery } from "@/integration/api";
import { useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const AddUser = () => {
  const { data: getUsers, isLoading: getUsersLoading } = useGetUsersQuery(["CEO", "ADMIN", "DRIVER", "SUPLIER", "BAKER", "DOUGHMAKER", "DISPETCHER", "CUSTOMER"])
  const [id, setId] = useState("")
  const navigate = useNavigate()
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <div className="rounded-full p-[12px] bg-[#FFCC15] fixed bottom-[20px] right-[20px]">
            <FaUserPlus size={25} />
          </div>
        </SheetTrigger>
        <SheetContent
          side="bottom"
          className="bg-[#1C2C57] border-none rounded-t-[20px]"
        >
          <SheetHeader className="border-2 border-[#FFCC15] rounded-[12px] p-[15px]">
            <SelectUser
              className="#1C2C57 text-[16px] font-[600] bg-white border border-[#FFCC15]"
              userData={getUsers}
              setId={setId}
              isLoading={getUsersLoading}
            />
            <Button
              variant={"yellow"}
              className="text-[16px] font-[600] ml-auto mt-[15px]"
              onClick={() => navigate(`/message/${id}`)}
            >
              Kiritish
            </Button>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};
