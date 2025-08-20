import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { Title } from "@/components";
import { EditIcon } from "lucide-react";
import {
  useGetBakerRoomIdInOvenBreadsQuery,
  usePatchBakerRoomIdInOvenBreadsMutation,
  useProfileQuery,
} from "@/integration";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useHandleRequest } from "@/hooks";
export const InOven = () => {
  const [open, setOpen] = useState(false);
  const [bakeBreadId, setBakeBreadId] = useState("");
  const { data: profile } = useProfileQuery({});
  const { data: breads } = useGetBakerRoomIdInOvenBreadsQuery({
    id: profile?.bakerRoom as string,
  });
  const [bakeBread] = usePatchBakerRoomIdInOvenBreadsMutation({});
  const handleRequest = useHandleRequest();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      count: 0,
    },
  });

  const onSubmit = (data: { count: number }) => {
    handleRequest({
      request: async () => {
        return await bakeBread({
          id: bakeBreadId as string,
          body: { count: Number(data.count) },
        }).unwrap();
      },
      onSuccess: () => {
        reset();
        setOpen(!open);
      },
    });
  };

  console.log(breads);

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
          <Title text={"Tandirda"} className="text-white mx-auto" />
        </div>
      </div>
      <div className="flex flex-col gap-y-4 mt-20 px-4">
        {breads && breads?.inOvenBreads?.length > 0 ? (
          breads?.inOvenBreads?.map((item) => (
            <div
              key={item._id}
              className="border border-yellow-300 rounded-[8px] px-6 py-2 bg-white flex justify-between items-center"
            >
              <h3 className="text-blue-950 text-base font-extrabold">
                {item.count} ta {item?.doughType?.title}
              </h3>
              <button
                onClick={() => {
                  setOpen(true);
                  setBakeBreadId(item._id);
                  reset({ count: item.count });
                }}
              >
                <EditIcon size={16} />
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">Hech narsa yo‘q</p>
        )}
      </div>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="bg-blue-950 rounded-t-xl">
          <div className="px-4 my-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-y-4">
                <label
                  htmlFor="count"
                  className="text-yellow-400 text-base font-semibold"
                >
                  Yopilgan non
                </label>
                <Controller
                  name="count"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <>
                      <Input
                        type="number"
                        id="count"
                        placeholder="Non soni"
                        {...field}
                      />
                      {errors.count && (
                        <p className="text-red-500">Count is required</p>
                      )}
                    </>
                  )}
                />
              </div>
              <div className="flex justify-end">
                <Button
                  className="mt-4 text-blue-950 bg-yellow-400"
                  type="submit"
                >
                  Yopish
                </Button>
              </div>
            </form>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
