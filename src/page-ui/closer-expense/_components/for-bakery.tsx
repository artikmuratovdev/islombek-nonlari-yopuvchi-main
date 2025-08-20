import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SelectReasons } from "./selectReasons";
import { Controller, useForm } from "react-hook-form";

export const ForBakery = () => {
  const setId = useState("")[1];
  const [open, setOpen] = useState(false)

  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      sum: "",
      reason: ""
    }
  });


  const onSubmit = async (data: { sum: string }): Promise<void> => {
    try {
      const sum = parseInt(data.sum);
      if (isNaN(sum)) {
        throw new Error("Summa to'g'ri formatda emas.");
      }
      reset()
      setOpen(false)
    } catch (error) {
      console.log(error);
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
          <SheetHeader className="border-2 border-[#FFCC15] rounded-[12px] p-[15px]">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label
                  htmlFor="sum"
                  className="text-start text-[12px] text-[#FFCC15] font-[600] block"
                >
                  Summa
                </label>
                <Controller
                  name="sum"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Summa kiriting" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className={`border outline-none p-1 rounded-[8px] w-full ${errors.sum ? 'border-red-500' : 'border-[#FFCC15]'}
                        }`}
                    />
                  )}
                />
                {errors.sum && (
                  <p className="text-red-500 text-xs mt-1">{errors.sum.message}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="reason"
                  className="text-start text-[12px] text-[#FFCC15] font-[600] block"
                >
                  Sababi
                </label>
                <Controller
                  name="reason"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <SelectReasons
                      {...field}
                      setId={setId}
                      title="Sabab qo'shish"
                      className={`w-full border outline-none p-1 rounded-[8px] bg-white ${errors.reason ? 'border-red-500' : 'border-[#FFCC15]'}`}
                    />
                  )}
                />
                {errors.reason && (
                  <p className="text-red-500 text-xs mt-1">{errors.reason.message}</p>
                )}
              </div>

              <Button
                variant={"greenary"}
                className="text-[16px] text-white font-[600] w-full mt-[10px]"
                type="submit"
                // disabled={isLoading}
              >
                Kiritish
              </Button>
            </form>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      {/* <div className="pt-[72px] space-y-3">
        {getExpensesLoading && <Loader className="mx-auto size-[50px]" />}
        {getExpenses && getExpenses?.filter((item) => item?.reason).map((item) => (
          <div key={item?._id} className="rounded-[8px] bg-white p-[10px] border-[1px] border-[#FFCC15] flex items-center justify-between text-[16px] text-[#1C2C57] font-[500]">
            <p>{item?.reason?.content}</p>
            <div className="flex items-center">
              <p>{item?.amount}</p>
              <Popover>
                <PopoverTrigger>
                  <BsThreeDotsVertical />
                </PopoverTrigger>
                <PopoverContent className="bg-white border-2 border-[#1C2C57] rounded-[8px]">
                  <EditExpense editId={item?._id} amount={item?.amount}/>
                  <div className="flex items-center gap-2 p-2 px-4">
                    <RiDeleteBin5Line size={25} className="text-[#C71A1A]" />
                    <button className="text-[14px] text-[#C71A1A] font-semibold" onClick={() => deleteExpense(item._id)}>O'chirish</button>
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
