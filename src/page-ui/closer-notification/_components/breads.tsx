import { Button } from "@/components/ui/button";
import { useUpdateNotificationMutation } from "@/integration";
import { GetNotification } from "@/integration/api/notificationApi/types";
import { FaRegClock } from "react-icons/fa";
import { LuCalendarDays } from "react-icons/lu";

export const Breads = ({ data }: { data: GetNotification[] }) => {
  const [updateNotification] = useUpdateNotificationMutation();

  return (
    <div className="pt-[35px] text-white space-y-3">
      {data
        ?.filter((item) => item.type === "DELIVERED" && item.delivery)
        .map((item) => (
          <div
            key={item._id}
            className="rounded-[12px] border-[2px] border-[#FFCC15] p-[10px]"
          >
            <p className="text-[20px] font-[600]">{item.from.fullName}</p>
            <div className="flex items-center justify-between pt-[10px]">
              <div className="flex items-center gap-x-2">
                <LuCalendarDays size={20} />
                <p className="text-[10px] font-[400]">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-x-2">
                <FaRegClock size={20} />
                <p className="text-[10px] font-[400]">
                  {new Date(item.createdAt).toLocaleTimeString()}
                </p>
              </div>
              <p className="text-[15px] font-[500]">
                {item.delivery?.breads || 0} non
              </p>
            </div>
            {item?.status === "PENDING" && (
              <div className="flex items-center justify-between pt-[25px]">
                <Button
                  variant="destructive"
                  onClick={() =>
                    updateNotification({ id: item._id, status: "REJECTED" })
                  }
                >
                  Bekor qilish
                </Button>
                <Button
                  variant="greenary"
                  onClick={() =>
                    updateNotification({ id: item._id, status: "ACCEPTED" })
                  }
                >
                  Tasdiqlash
                </Button>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};
