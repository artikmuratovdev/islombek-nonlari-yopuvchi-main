import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SelectUser } from "@/components";
import { useGetUsersQuery } from "@/integration/api";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

export const Private = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      sum: "",
      reason: "",
      user: "",
    },
  });

  const { data: getUsers, isLoading: getUsersLoading } = useGetUsersQuery([
    "DRIVER",
    "SUPLIER",
    "DOUGHMAKER",
    "DISPETCHER",
    "BAKER",
    "DIVIDER",
  ]);
  const setId = useState("")[1];
  const [open, setOpen] = useState(false);

  const onSubmit = async (data: {
    sum: string;
    reason: string;
  }): Promise<void> => {
    try {
      console.log(data);
      reset();
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="pt-[32px] w-full">
          <Button
            variant="outline"
            className="border border-[#FFCC15] w-full"
            onClick={() => setOpen(true)}
          >
            Xarajatni kiritish
          </Button>
        </SheetTrigger>
        <SheetContent
          side="bottom"
          className="bg-[#1C2C57] border-none rounded-t-[20px]"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <SheetHeader className="border-2 border-[#FFCC15] rounded-[12px] p-[15px]">
              <div className="flex items-center gap-x-2">
                <div>
                  <label
                    htmlFor="user"
                    className="text-start text-[12px] text-[#FFCC15] font-[600] w-full"
                  >
                    Qabul qiluvchi
                  </label>
                  <Controller
                    name="user"
                    control={control}
                    render={({ field }) => (
                      <SelectUser
                        className="bg-white"
                        userData={getUsers}
                        setId={setId}
                        isLoading={getUsersLoading}
                        title="Xodim tanlash"
                        {...field}
                      />
                    )}
                  />
                </div>

                <div>
                  <label
                    htmlFor="sum"
                    className="text-[12px] text-[#FFCC15] font-[600] w-full"
                  >
                    Summa
                  </label>
                  <Controller
                    name="sum"
                    control={control}
                    rules={{ required: "Summa is required" }}
                    render={({ field }) => (
                      <input
                        type="text"
                        className="border border-[#FFCC15] outline-none p-1 rounded-[8px] w-full"
                        {...field}
                      />
                    )}
                  />
                  {errors.sum && (
                    <p className="text-red-500 text-[12px]">
                      {errors.sum.message}
                    </p>
                  )}
                </div>
              </div>

              <label
                htmlFor="reason"
                className="text-start text-[12px] text-[#FFCC15] font-[600]"
              >
                Sababi
              </label>
              <Controller
                name="reason"
                control={control}
                rules={{ required: "Sababi is required" }}
                render={({ field }) => (
                  <input
                    type="text"
                    className="border border-[#FFCC15] outline-none p-1 rounded-[8px]"
                    {...field}
                  />
                )}
              />
              {errors.reason && (
                <p className="text-red-500 text-[12px]">
                  {errors.reason.message}
                </p>
              )}

              <Button
                variant={"greenary"}
                className="text-[16px] text-white font-[600] ml-auto mt-[10px]"
                type="submit"
                // disabled={isLoading}
              >
                Kiritish
              </Button>
            </SheetHeader>
          </form>
        </SheetContent>
      </Sheet>

      {/* <div className="space-y-3 pt-[72px]">
        {getExpensesLoading && <Loader className="mx-auto size-[50px]" />}
        {getExpenses &&
          getExpenses
            ?.filter((item) => !item?.reason)
            ?.map((item) => (
              <div
                key={item?._id}
                className="rounded-[8px] bg-white p-[10px] border-[1px] border-[#FFCC15] flex items-center justify-between text-[16px] text-[#1C2C57] font-[500]"
              >
                <p>{new Date(item?.createdAt).toLocaleDateString()}</p>
                <div className="flex items-center">
                  <p>{item?.amount}</p>
                  <Popover>
                    <PopoverTrigger>
                      <BsThreeDotsVertical />
                    </PopoverTrigger>
                    <PopoverContent className="bg-white border-2 border-[#1C2C57] rounded-[8px]">
                      <EditExpenseForPrivate
                        editId={item?._id}
                        amount={item?.amount}
                        comment={item?.comment}
                      />
                      <div className="flex items-center gap-2 p-2 px-4">
                        <RiDeleteBin5Line
                          size={25}
                          className="text-[#C71A1A]"
                        />
                        <button
                          className="text-[14px] text-[#C71A1A] font-semibold"
                          onClick={() => deleteExpense(item?._id)}
                        >
                          O'chirish
                        </button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            ))}
      </div> */}
    </div>
  );
};
