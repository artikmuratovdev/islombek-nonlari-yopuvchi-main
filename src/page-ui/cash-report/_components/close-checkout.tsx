import { SelectUser } from "@/components";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { RootState, useGetUsersQuery, useProfileQuery } from "@/integration";
import { useCloseCashMutation } from "@/integration/api/expenseApi";
import { MoneyFormatter } from "@/utils/money-formatter";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

interface FormValues {
  amount: string;
  fromUser: string;
  toUser: string;
  reason: string;
}

export const CloseCheckout = ({ refetch }: { refetch: () => void }) => {
  const { data: me } = useProfileQuery({});
  const { data: getUsers, isLoading: getUsersLoading } = useGetUsersQuery([
    "CEO",
    "ADMIN",
    "DRIVER",
    "SUPPLIER",
    "DOUGHMAKER",
    "DISPATCHER",
    "BAKER",
    "DIVIDER",
  ]);
  const [open, setOpen] = useState(false);
  const [closeCash, { isLoading }] = useCloseCashMutation();

  const { balance, bakerRoomId } = useSelector(
    (state: RootState) => state.expense,
  );

  // bakerRoomId dan to'g'ri ID ni olish (array bo'lsa birinchi element, string bo'lsa o'zi)
  const roomId =
    me?.bakerRoom ||
    (Array.isArray(bakerRoomId) ? bakerRoomId[0] : bakerRoomId);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({});

  const onSubmit = async (data: any): Promise<void> => {
    try {
      if (isNaN(data.amount)) {
        throw new Error("Summa to'g'ri formatda emas.");
      }
      const sentData = { bakerRoomId: roomId, ...data };
      sentData.amount = Number(data.amount);
      const { message } = await closeCash(sentData).unwrap();
      toast.success(message);
      refetch();
      reset({ amount: "", fromUser: "", toUser: "", reason: "" });
      setOpen(false);
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  return (
    <div>
      <Toaster />
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <div className="text-[#1C2C57] fixed bottom-[80px] left-[20px] right-[20px]">
            <Button
              variant="outline"
              className="border border-[#FFCC15] w-full text-[16px]"
              onClick={() => setOpen(true)}
            >
              Kassani yopish
            </Button>
          </div>
        </SheetTrigger>
        <SheetContent
          aria-describedby={undefined}
          side="bottom"
          className="bg-[#1C2C57] border-none rounded-t-[20px]"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <SheetHeader className="border-2 border-[#FFCC15] rounded-[12px] p-[15px]">
              <SheetTitle className="text-white font-[600] text-left">
                Umumiy balans: {MoneyFormatter(String(balance))}
              </SheetTitle>
              <div className="flex items-center gap-2">
                <label
                  htmlFor="amount"
                  className="text-start text-[12px] text-[#FFCC15] font-[600]"
                >
                  Berilgan pul
                </label>
              </div>
              <Controller
                name="amount"
                control={control}
                rules={{
                  required: "Summani kiritish shart!",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Faqat raqam kiriting",
                  },
                }}
                render={({ field: { onChange, value, ...field } }) => (
                  <input
                    type="text"
                    className="border border-[#FFCC15] outline-none p-1 rounded-[8px] w-full"
                    placeholder="0"
                    value={value ? MoneyFormatter(value) : ""}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/\D/g, "");
                      onChange(rawValue);
                    }}
                    {...field}
                  />
                )}
              />
              {errors.amount && (
                <span className="text-red-500 text-start">
                  {errors.amount.message}
                </span>
              )}

              <div className="flex items-center gap-2 mt-2">
                <label
                  htmlFor="fromUser"
                  className="text-start text-[12px] text-[#FFCC15] font-[600]"
                >
                  Bergan xodim
                </label>
              </div>
              <Controller
                name="fromUser"
                control={control}
                rules={{
                  required: "Xodimni tanlash shart!",
                }}
                render={({ field }) => (
                  <SelectUser
                    className="bg-white"
                    userData={getUsers}
                    setId={field.onChange}
                    title="Xodim tanlash"
                    isLoading={getUsersLoading}
                    {...field}
                  />
                )}
              />
              {errors.fromUser && (
                <span className="text-red-500 text-start">
                  {errors.fromUser.message}
                </span>
              )}

              <div className="flex items-center gap-2 mt-2">
                <label
                  htmlFor="toUser"
                  className="text-start text-[12px] text-[#FFCC15] font-[600]"
                >
                  Olgan xodim
                </label>
              </div>
              <Controller
                name="toUser"
                control={control}
                rules={{
                  required: "Xodimni tanlash shart!",
                }}
                render={({ field }) => (
                  <SelectUser
                    className="bg-white"
                    userData={getUsers?.filter(
                      (user) => user.role === "DRIVER" || user.role === "ADMIN",
                    )}
                    setId={field.onChange}
                    title="Xodim tanlash"
                    isLoading={getUsersLoading}
                    {...field}
                  />
                )}
              />
              {errors.toUser && (
                <span className="text-red-500 text-start">
                  {errors.toUser.message}
                </span>
              )}

              <div className="flex items-center gap-2 mt-2">
                <label
                  htmlFor="reason"
                  className="text-start text-[12px] text-[#FFCC15] font-[600]"
                >
                  Sababi
                </label>
              </div>
              <Controller
                name="reason"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    className="border border-[#FFCC15] outline-none p-1 rounded-[8px]"
                    maxLength={255}
                    {...field}
                  />
                )}
              />
              {errors.reason && (
                <span className="text-red-500 text-start">
                  {errors.reason.message}
                </span>
              )}

              <Button
                variant={"yellow"}
                className="text-[16px] font-[600] ml-auto mt-[10px] text-[#1C2C57]"
                type="submit"
                disabled={isLoading}
              >
                Yuborish
              </Button>
            </SheetHeader>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};
