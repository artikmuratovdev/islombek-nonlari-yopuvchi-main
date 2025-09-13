/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, useForm } from "react-hook-form";
import { PropsComp } from "./types";

import { useHandleRequest } from "@/hooks";
import { Role } from "@/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useCreateComplaintMutation } from "@/integration/api/complaintApi";
import { useGetAllUsersQuery } from "@/integration";

export const SentMessage = ({ setOpen }: any) => {
  const form = useForm();
  const [create, { isLoading }] = useCreateComplaintMutation();
  const handkeRequest = useHandleRequest();

  const { data: allUsers } = useGetAllUsersQuery({
    roles: [
      Role.ADMIN,
      Role.BAKER,
      Role.BAKER_TABLET,
      Role.DISPATCHER,
      Role.DIVIDER,
      Role.SUPPLIER,
      Role.DOUGHMAKER,
      Role.DIVIDER_TABLET,
    ],
  });

  console.log(allUsers);

  const onSubmit = (data: PropsComp) => {
    handkeRequest({
      request: async () => {
        const response = await create({
          to: data.to as string,
          content: data.content as string,
        }).unwrap();
        return response;
      },
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  return (
    <div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-3 w-full"
      >
        <Controller
          name="to"
          control={form.control}
          rules={{ required: "Xodimni tanlang" }}
          render={({ field }) => (
            <div className="flex flex-col gap-1">
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="h-[42px] bg-white text-ellipsis w-full rounded-lg border-2 border-[#ffcb15] text-[#1b2b56] text-base font-semibold font-inter mt-[50px]">
                  <SelectValue placeholder="Xodimni tanlang" />
                </SelectTrigger>
                <SelectContent className="bg-white rounded-lg border border-[#ffcb15] mt-[9px]">
                  {allUsers?.map((user) => (
                    <SelectItem
                      value={user._id}
                      key={user._id}
                      className="flex items-center"
                    >
                      {user.fullName}{" "}
                      <span className="text-xs">{user.role}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.to && (
                <p className="text-xs text-red-600">
                  {form.formState.errors.to.message?.toString()}
                </p>
              )}
            </div>
          )}
        />

        <Controller
          name="content"
          rules={{ required: "Shikoyatni kiriting!" }}
          control={form.control}
          render={({ field }) => (
            <>
              <textarea
                placeholder="Shikoyatni yozing!"
                className="bg-white rounded-lg"
                {...field}
              />
              <p className="text-xs text-red-600">
                {typeof form.formState.errors.content?.message === "string" &&
                  form.formState.errors.content.message}
              </p>
            </>
          )}
        />
        <div className="flex justify-end">
          <Button
            type="submit"
            className=" bg-[#ffcb15] rounded-lg text-[#1b2b56] text-base font-semibold font-inter hover:bg-[#ffcb15] mt-[7px]"
          >
            {isLoading ? "Yuborilmoqda..." : "Yuborish"}
          </Button>
        </div>
      </form>
    </div>
  );
};
