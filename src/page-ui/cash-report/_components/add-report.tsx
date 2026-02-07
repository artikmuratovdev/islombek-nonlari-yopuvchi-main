import { SelectUser } from "@/components";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { RootState, useGetUsersQuery, useProfileQuery } from "@/integration";
import { useCreateExpensesMutation } from "@/integration/api/expenseApi";
import { SelectReasons } from "@/page-ui/closer-expense/_components";
import { MoneyFormatter } from "@/utils/money-formatter";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";

export const AddReport = ({ refetch }: { refetch: () => void }) => {
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

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<SubmitData>({
    defaultValues: {
      sum: "",
      cost: "for_salary",
      submitted: "",
      reason: "",
      accept: "",
    },
  });
  const { bakerRoomId } = useSelector((state: RootState) => state.expense);

  // bakerRoomId dan to'g'ri ID ni olish (array bo'lsa birinchi element, string bo'lsa o'zi)
  const roomId =
    me?.bakerRoom ||
    (Array.isArray(bakerRoomId) ? bakerRoomId[0] : bakerRoomId);

  const [createExpense] = useCreateExpensesMutation();

  const [open, setOpen] = useState(false);

  interface SubmitData {
    sum: string;
    cost: "for_salary" | "for_work";
    submitted: string;
    reason: string;
    accept: string;
  }

  const onSubmit = async (data: SubmitData) => {
    const submittedData = {
      bakerRoomId: roomId,
      expense_type: data.cost,
      amount: Number(data.sum.replace(/\s/g, "")),
      fromUser: data.submitted,
      toUser: data.accept,
      reason: data.reason,
    };
    try {
      const result = await createExpense(submittedData).unwrap();
      toast.success(result.message);
      reset();
      refetch();
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      toast.error(err.data?.message || "Xatolik yuz berdi");
    }
    setOpen(false);
  };

  const acceptedDisabled = watch("reason");
  const getCost = watch("cost");

  return (
    <div>
      <Toaster />
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <div className="rounded-full p-[18px] bg-[#FFCC15] fixed bottom-[80px] right-[30px] z-30">
            <FaPlus size={15} className="cursor-pointer text-[#1C2C57]" />
          </div>
        </SheetTrigger>
        <SheetContent
          side={"bottom"}
          className="bg-[#1C2C57] border-none rounded-t-[20px]"
        >
          <SheetHeader className="border-2 border-[#FFCC15] rounded-[12px] p-[15px]">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <div className="w-full text-left">
                <label
                  htmlFor="sum"
                  className="w-full text-[12px] font-[600] text-[#FFCC15]"
                >
                  Summa
                </label>
                <Controller
                  name="sum"
                  control={control}
                  rules={{
                    required: "Olingan pul is required",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Faqat raqam kiriting",
                    },
                  }}
                  render={({ field }) => (
                    <input
                      type="text"
                      placeholder="pul miqdori"
                      className="border border-[#FFCC15] outline-none p-1 px-2 font-semibold text-[#1C2C57] rounded-[8px] w-full"
                      {...field}
                      inputMode="numeric"
                      value={field.value ? MoneyFormatter(field.value) : ""}
                      onChange={(e) => {
                        field.onChange(e.target.value.replace(/\D/g, ""));
                      }}
                    />
                  )}
                />
                {errors.sum && (
                  <p className="text-red-500 text-[12px]">
                    {errors.sum?.message}
                  </p>
                )}

                <div className="pt-3">
                  <label
                    htmlFor="cost"
                    className="w-full text-[16px] font-[600] text-[#FFCC15] mr-3"
                  >
                    Xarajat:
                  </label>

                  <Controller
                    name="cost"
                    control={control}
                    render={({ field }) => (
                      <label className="inline-flex items-center cursor-pointer space-x-2 mx-2">
                        <div className="w-4 h-4 rounded-full border border-[#FFCC15] flex items-center justify-center">
                          <input
                            {...field}
                            type="radio"
                            defaultChecked={!!field.value}
                            value={"for_salary"}
                            className="peer opacity-0 w-0"
                          />
                          <div className="w-2.5 h-2.5 rounded-full peer-checked:bg-[#FFCC15]" />
                        </div>
                        <span className="text-white font-[600]">Ish haqi</span>
                      </label>
                    )}
                  />

                  <Controller
                    name="cost"
                    control={control}
                    render={({ field }) => (
                      <label className="inline-flex items-center cursor-pointer space-x-2 mx-2">
                        <div className="w-4 h-4 rounded-full border border-[#FFCC15] flex items-center justify-center">
                          <input
                            {...field}
                            type="radio"
                            value={"for_work"}
                            className="peer opacity-0 w-0"
                          />
                          <div className="w-2.5 h-2.5 rounded-full peer-checked:bg-[#FFCC15]" />
                        </div>
                        <span className="text-white font-[600]">Ish uchun</span>
                      </label>
                    )}
                  />
                </div>

                <label
                  htmlFor="submitted"
                  className="w-full text-[12px] font-[600] text-[#FFCC15] "
                >
                  Topshirdi
                </label>
                <Controller
                  name="submitted"
                  control={control}
                  render={({ field }) => (
                    <SelectUser
                      className="bg-white"
                      userData={getUsers}
                      setId={(id) => setValue("submitted", id)}
                      title=""
                      isLoading={getUsersLoading}
                      {...field}
                    />
                  )}
                />
                {errors.sum && (
                  <p className="text-red-500 text-[12px]">
                    {errors.submitted?.message}
                  </p>
                )}

                {getCost === "for_work" && (
                  <>
                    <label
                      htmlFor="reason"
                      className="w-full text-[12px] font-[600] text-[#FFCC15] "
                    >
                      Sababi
                    </label>
                    <Controller
                      name="reason"
                      control={control}
                      render={({ field }) => (
                        <SelectReasons
                          className="bg-white"
                          setId={(id) => {
                            setValue("reason", id);
                            setValue("accept", "");
                          }}
                          {...field}
                        />
                      )}
                    />
                    {errors.sum && (
                      <p className="text-red-500 text-[12px]">
                        {errors.reason?.message}
                      </p>
                    )}
                  </>
                )}

                <label
                  htmlFor="accept"
                  className="w-full text-[12px] font-[600] text-[#FFCC15] "
                >
                  Qabul qildi
                </label>
                <Controller
                  name="accept"
                  control={control}
                  render={({ field }) => (
                    <SelectUser
                      className="bg-white"
                      userData={getUsers}
                      setId={(id) => setValue("accept", id)}
                      title=""
                      isLoading={getUsersLoading}
                      disabled={!!acceptedDisabled}
                      {...field}
                    />
                  )}
                />
                {errors.sum && (
                  <p className="text-red-500 text-[12px]">
                    {errors.accept?.message}
                  </p>
                )}
              </div>
              <div className="text-right">
                <Button
                  variant={"yellow"}
                  type="submit"
                  className="text-[16px] font-[600] mt-5 px-8"
                >
                  saqlash
                </Button>
              </div>
            </form>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};
