import { FaCamera } from "react-icons/fa";
import { ChangePassword, LeaveTheAccount } from "./_components";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  useProfileQuery,
  useUpdateProfileMutation,
  useUploadImageMutation,
} from "@/integration/api/authApi";
import { useEffect, useState } from "react";
import { ProfileResponse } from "@/integration/api/authApi/types";
import { useStorage } from "@/utils";
import { useNavigate } from "react-router-dom";
import { useGetAllExpenseQuery } from "@/integration/api/expenseApi";
import { Loader } from "@/components";
import { MoneyFormatter } from "@/utils/money-formatter";
import { useSelector } from "react-redux";
import { RootState } from "@/integration";

export const Profile = () => {
  const { data: profile, isError } = useProfileQuery({});
  const [updateProfile] = useUpdateProfileMutation();
  const [uploadImage] = useUploadImageMutation();
  const [user, setUser] = useState<ProfileResponse>();
  const navigate = useNavigate();
  const { bakerRoomId } = useSelector((state: RootState) => state.expense);

  // bakerRoomId dan to'g'ri ID ni olish (array bo'lsa birinchi element, string bo'lsa o'zi)
  const roomId =
    profile?.bakerRoom ||
    (Array.isArray(bakerRoomId) ? bakerRoomId[0] : bakerRoomId);

  const { data: getExpenses, isLoading } = useGetAllExpenseQuery(
    roomId as string,
    {
      skip: !roomId,
    },
  );

  useEffect(() => {
    if (isError) {
      useStorage.removeCredentials();
      navigate("/login");
    }

    if (profile) {
      setUser(profile);
    }
  }, [profile, isError, navigate]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const uploadResult = await uploadImage(formData).unwrap();

      await updateProfile({
        id: user?._id as string,
        body: { avatar: uploadResult },
      }).unwrap();
    } catch (error) {
      console.error("Failed to upload avatar", error);
    }
  };

  const balance = getExpenses?.reduce((acc, cur) => {
    if (
      (cur?.fromUser as ProfileResponse)._id === profile?._id &&
      !cur?.reason
    ) {
      return acc + cur?.amount;
    }

    return acc;
  }, 0);
  return (
    <div>
      <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[12px] py-[30px] fixed top-0 w-full -mt-[30px] -ml-[20px]">
        <div className="flex items-center text-[#FFCC15] justify-start gap-x-[20px] pt-[35px]">
          <div className="relative">
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className="absolute size-[100px] opacity-0"
            />
            <img
              src={profile?.avatar && profile?.avatar}
              alt="avatar"
              loading="lazy"
              className="rounded-full size-[90px]"
            />
            <div className="bg-slate-300/50 rounded-full p-2 max-w-max absolute bottom-0 right-0">
              <FaCamera size={20} className="text-white" />
            </div>
          </div>
          <p className="text-[24px] font-semibold text-white">
            {profile?.fullName}
          </p>
        </div>
      </div>

      <div className="text-[#FFCC15] text-[20px] font-[700] pt-[130px]">
        Balans: {MoneyFormatter(String(balance))}
      </div>

      <Accordion type="single" collapsible className="pt-[20px]">
        <AccordionItem value="item-1" className="text-[#1C2C57]">
          <AccordionTrigger className="bg-white rounded-[8px] p-[13px]">
            Maoshlarim
          </AccordionTrigger>
          <AccordionContent>
            <div>
              <div className="grid grid-cols-2 text-[14px] text-[#FFCC15] pt-[40px] p-[8px]">
                <p>Maosh</p>
                <p>Sana</p>
              </div>

              <div className="border-[1px] border-[#FFCC15] rounded-[8px] bg-white">
                {isLoading && <Loader className="size-[40px] mx-auto" />}
                {getExpenses
                  ?.filter(
                    (item) =>
                      (item?.fromUser as ProfileResponse)._id ===
                        profile?._id && !item?.reason,
                  )
                  .map((item) => (
                    <div key={item?._id}>
                      <div className="grid grid-cols-2 text-[14px] font-[500] p-[8px]">
                        <p>{MoneyFormatter(String(item?.amount))}</p>
                        <p>{new Date(item?.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="border-b-[1px] border-[#FFCC15] w-full" />
                    </div>
                  ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="grid grid-cols-1 w-full gap-y-[20px] pt-[62px] text-[#1C2C57]">
        {/* <EditUserName userID={user?._id}/> */}

        <ChangePassword />

        <LeaveTheAccount />
      </div>
    </div>
  );
};
