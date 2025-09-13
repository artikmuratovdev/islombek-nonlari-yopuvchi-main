/* eslint-disable @typescript-eslint/no-unused-vars */
import { TbMessageReport } from "react-icons/tb";
import { TiMessages } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useStorage } from "@/utils";
import { Loader } from "@/components";
import { useSelector } from "react-redux";
import {
  useGetAllUsersQuery,
  useGetBakerRoomQuery,
  useGetBakerRoomSalaryQuery,
  useProfileQuery,
  useAddBakerRoomSalaryDailyWorkerMutation,
  useSalaryBakerRoomSalaryDailyWorkerMutation,
  RootState,
} from "@/integration";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown } from "lucide-react";
import { useHandleRequest } from "@/hooks";
import toast from "react-hot-toast";
import { Controller, useForm } from "react-hook-form";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FormData {
  salary: number;
}

export const CloserHome = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [bakerUserId, setBakerUserId] = useState("");
  const [addBakerRoomSalaryDailyWorker] =
    useAddBakerRoomSalaryDailyWorkerMutation({});

  const [salaryBakerRoomSalaryDailyWorker, { isLoading: isLoadingSalary }] =
    useSalaryBakerRoomSalaryDailyWorkerMutation({});

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleToggle2 = () => {
    setIsOpen2((prev) => !prev);
  };

  const { data: me } = useProfileQuery({});

  const { bakerRoomId } = useSelector((state: RootState) => state.expense);

  console.log("baker", bakerRoomId);
  const { data: baker, isLoading } = useGetBakerRoomQuery({
    id: bakerRoomId.toString(),
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!useStorage.getTokens().accessToken) {
      navigate("/login");
    }
  }, [navigate]);

  const { data: users } = useGetAllUsersQuery({
    roles: ["BAKER"],
  });

  const { data: salary } = useGetBakerRoomSalaryQuery({
    id: me?.bakerRoom as string,
  });

  const handleRequest = useHandleRequest();

  const addBakerRoomSalaryDailyWorkerHandler = async (userId: string) => {
    handleRequest({
      request: () =>
        addBakerRoomSalaryDailyWorker({
          id: me?.bakerRoom as string,
          body: { user: userId },
        }),
      onSuccess: () => {
        toast.success("Muvaffaqiyatli qo'shildi");
      },
      onError: (err) => {
        toast.error(
          (err as { message?: string })?.message || "Xatolik yuz berdi"
        );
      },
    });
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const [open, setOpen] = useState(false);

  const onSubmit = (data: FormData) => {
    handleRequest({
      request: () =>
        salaryBakerRoomSalaryDailyWorker({
          id: me?.bakerRoom as string,
          body: { user: bakerUserId, salary: Number(data?.salary) },
        }),
      onSuccess: () => {
        toast.success("Muvaffaqiyatli qo'shildi");
        reset();
        setOpen(!open);
      },
      onError: (err) => {
        toast.error(
          (err as { message?: string })?.message || "Xatolik yuz berdi"
        );
      },
    });
  };

  return (
    <div className="pt-[10px]">
      <div className="flex items-center text-[#FFCC15] justify-between">
        <Link to="/shikoyatlar" aria-label="Shikoyatlar">
          <TbMessageReport size={25} />
        </Link>

        <Link to="/messages" aria-label="Xabarlar">
          <TiMessages size={25} />
        </Link>
      </div>

      <div className="grid grid-cols-2 w-full gap-[10px] pt-[30px]">
        <div className="rounded-[16px] cursor-pointer border-[3px] text-center bg-white text-[#1C2C57] py-[20px] border-[#FFCC15]">
          {isLoading ? (
            <Loader dark />
          ) : (
            <p className="text-[32px] font-[600]">
              {baker?.bakerRoom?.doughsCount || 0}
            </p>
          )}
          <p className="text-[20px] font-[800]">Xamir</p>
        </div>

        <div
          onClick={() => navigate("/zuvala")}
          className="rounded-[16px] cursor-pointer border-[3px] text-center bg-white text-[#1C2C57] py-[20px] border-[#FFCC15]"
        >
          {isLoading ? (
            <Loader dark />
          ) : (
            <p className="text-[32px] font-[600]">
              {baker?.bakerRoom?.roundsCount.toLocaleString("ru-RU") || 0}
            </p>
          )}
          <p className="text-[20px] font-[800]">Zuvala</p>
        </div>

        <div
          onClick={() => navigate("/tandirda")}
          className="rounded-[16px] cursor-pointer border-[3px] text-center bg-white text-[#1C2C57] py-[20px] border-[#FFCC15]"
        >
          {isLoading ? (
            <Loader dark />
          ) : (
            <p className="text-[32px] font-[600]">
              {baker?.bakerRoom?.inOvenCount || 0}
            </p>
          )}
          <p className="text-[20px] font-[800]">Tandir</p>
        </div>

        <div
          onClick={() => navigate("/nonlar")}
          className="rounded-[16px] cursor-pointer border-[3px] text-center bg-white text-[#1C2C57] py-[20px] border-[#FFCC15]"
        >
          {isLoading ? (
            <Loader dark />
          ) : (
            <p className="text-[32px] font-[600]">
              {baker?.bakerRoom?.breadsCount.toLocaleString("ru-RU") || 0}
            </p>
          )}
          <p className="text-[20px] font-[800]">Non</p>
        </div>

        <div
          onClick={() => navigate("/")}
          className="rounded-[16px] cursor-pointer border-[3px] text-center bg-white text-[#1C2C57] py-[20px] border-[#FFCC15]"
        >
          {isLoading ? (
            <Loader dark />
          ) : (
            <p className="text-[32px] font-[600]">
              {baker?.bakerRoom?.deliveredCount.toLocaleString("ru-RU") || 0}
            </p>
          )}
          <p className="text-[20px] font-[800]">Yetkazuvchi</p>
        </div>

        <div
          onClick={() => navigate("/sotuv")}
          className="rounded-[16px] cursor-pointer border-[3px] text-center bg-white text-[#1C2C57] py-[20px] border-[#FFCC15]"
        >
          {isLoading ? (
            <Loader dark />
          ) : (
            <p className="text-[32px] font-[600]">
              {baker?.bakerRoom?.soldCount.toLocaleString("ru-RU") || 0}
            </p>
          )}
          <p className="text-[20px] font-[800]">Sotuv</p>
        </div>
      </div>
      <div className="flex flex-col gap-y-3">
        <div>
          <Accordion
            type="single"
            collapsible
            className="w-full"
            value={isOpen2 ? "item-1" : ""}
            onValueChange={(val) => setIsOpen2(val === "item-1")}
          >
            <AccordionItem value="item-1">
              <AccordionTrigger
                onClick={handleToggle2}
                className="h-12 bg-white mt-5 border-2 border-yellow-400 rounded-lg px-4 flex items-center justify-between"
              >
                <div className="px-3 py-px bg-zinc-300 rounded-md">
                  <h4 className="text-blue-950 text-base font-semibold">
                    {salary?.bakerInfo?.totalCount.toLocaleString("ru-RU") || 0}
                  </h4>
                </div>
                <div className="flex gap-x-3 items-center">
                  <div className="px-3 py-px bg-zinc-300 rounded-md">
                    <h4 className="text-blue-950 text-base font-semibold">
                      {salary?.bakerInfo?.totalMoney.toLocaleString("ru-RU") ||
                        0}
                    </h4>
                  </div>
                  <div className="p-1 bg-[#1C2C57] rounded-[8px]">
                    <ChevronDown
                      className={`h-6 w-6 shrink-0 text-[#FFCC15] transition-transform duration-300 ${
                        isOpen2 ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </div>
              </AccordionTrigger>

              <AccordionContent className="mt-2">
                <div className="flex justify-between items-center px-2">
                  <h4 className="text-yellow-400 text-sm font-medium w-2/5">
                    Zuvala turi
                  </h4>
                  <h4 className="text-yellow-400 text-sm font-medium w-1/4">
                    Soni
                  </h4>
                  <h4 className="text-yellow-400 text-sm font-medium w-1/4">
                    Narxi
                  </h4>
                  <h4 className="text-yellow-400 text-sm font-medium w-1/4">
                    Umumiy
                  </h4>
                </div>
                <div className="flex flex-col bg-white rounded-lg border-2 border-yellow-500 mt-1 gap-y-2">
                  {salary?.bakerInfo?.doughs?.map((item, index) => {
                    console.log(item);

                    return (
                      <div key={index}>
                        <div className="flex justify-between items-center px-2 py-1 pb-2">
                          <h4 className="text-blue-950 text-base font-semibold w-2/5">
                            {item?.doughType?.title}
                          </h4>
                          <h4 className="text-blue-950 text-base font-semibold w-1/4">
                            {item?.count.toLocaleString("ru-RU")}
                          </h4>
                          <h4 className="text-blue-950 text-base font-semibold w-1/4">
                            {item?.doughType?.price_for_baker.toLocaleString(
                              "ru-RU"
                            )}
                          </h4>
                          <h4 className="text-blue-950 text-base font-semibold w-1/4">
                            {item?.totalMoney.toLocaleString("ru-RU")}
                          </h4>
                        </div>
                        <div className="w-full bg-yellow-500 h-px" />
                      </div>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="flex flex-col gap-y-3 my-2">
          {salary?.bakerInfo?.bakers?.map((item, index: number) => {
            return (
              <div
                key={index}
                onClick={() => {
                  setOpen(!open);
                  setBakerUserId(item.user?._id as string);
                }}
                className="w-full bg-white border-2 border-yellow-500 rounded-lg flex items-center justify-between px-4 py-2"
              >
                <h3 className="text-blue-950 text-base font-semibold">
                  {item?.user?.fullName}
                </h3>
                <div className="px-3 py-px bg-zinc-300 rounded-md">
                  <h3 className="text-blue-950 text-base font-semibold">
                    {item?.salary.toLocaleString("ru-RU")}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
        <div>
          <Accordion
            type="single"
            collapsible
            className="w-full"
            value={isOpen ? "item-1" : ""}
            onValueChange={(val) => setIsOpen(val === "item-1")}
          >
            <AccordionItem value="item-1">
              <AccordionTrigger
                onClick={handleToggle}
                className="h-12 bg-white border-2 border-yellow-400 rounded-lg px-4 flex items-center justify-between"
              >
                <h4 className="text-blue-950 text-base font-semibold">
                  Xodimlarni qo’shish
                </h4>
                <div className="p-1 bg-[#1C2C57] rounded-[8px]">
                  <ChevronDown
                    className={`h-6 w-6 shrink-0 text-[#FFCC15] transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </AccordionTrigger>

              <AccordionContent className="flex flex-col bg-white rounded-lg border-2 border-yellow-500 mt-2">
                {users?.map((item, index, arr) => {
                  return (
                    <div
                      onClick={() =>
                        addBakerRoomSalaryDailyWorkerHandler(item._id)
                      }
                      key={index}
                      className="py-1 flex flex-col gap-y-1"
                    >
                      <h4 className="text-blue-950 text-base font-semibold px-4 cursor-pointer">
                        {item.fullName}
                      </h4>
                      {index !== arr.length - 1 && (
                        <div className="w-full bg-yellow-500 h-px" />
                      )}
                    </div>
                  );
                })}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <Drawer open={open} onClose={() => setOpen(false)} closeThreshold={0}>
        <DrawerContent className="bg-blue-950 px-5 py-4 pt-4">
          <form onSubmit={handleSubmit(onSubmit)} className="pt-5">
            <div>
              <label htmlFor="salary" className="text-white">
                Yopuvchiga pul berish
              </label>
              <div>
                <h4 className="text-white text-base font-semibold">
                  Yopuvchidagi pul:{" "}
                  {salary?.bakerInfo?.totalMoney.toLocaleString("ru-RU") || 0}
                </h4>
              </div>
              <Controller
                control={control}
                name="salary"
                rules={{ required: "Yopuvchiga pul berish" }}
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      type="number"
                      id="salary"
                      className="mt-2"
                      placeholder="Yopuvchiga pul berish"
                    />
                    {errors.salary && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.salary.message?.toString()}
                      </p>
                    )}
                  </>
                )}
              />
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isLoadingSalary}
                  className="bg-yellow-400 text-blue-950 mt-2"
                >
                  {isLoadingSalary ? "Yuklanmoqda..." : "Yuborish"}
                </Button>
              </div>
            </div>
          </form>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
