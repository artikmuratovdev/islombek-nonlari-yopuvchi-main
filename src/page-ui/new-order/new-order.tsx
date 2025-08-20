/* eslint-disable @typescript-eslint/no-explicit-any */
import { Title } from "@/components";
import { LoavesesNumber } from "@/components/common/loaveses-number";
import { CLOSER_ORDER_FORM_LIST } from "@/constants";
import { useCreateOrderMutation, useGetBreadPriceQuery } from "@/integration";
import { MoneyFormatter } from "@/utils/money-formatter";
import { formatPhoneNumber } from "@/utils/phoneNumberFormat";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { IoArrowBack } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

export const NewOrder = () => {
  const { data: breadPrices } = useGetBreadPriceQuery();

  const [breads, setBreads] = useState<BreadsInfo[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    setTotalAmount(
      breads.reduce((acc, cur) => acc + cur.breadSoldPrice * cur.amount, 0)
    );
  }, [breads]);

  useEffect(() => {
    if (breadPrices) {
      setBreads(
        breadPrices.map((bread) => ({
          ...bread,
          amount: bread.amount || 0,
        }))
      );
    }
  }, [breadPrices]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      client: "",
      phone: "",
      address: "",
      commit: "",
      deliveryTime: "",
      paidAmount: "",
    },
  });
  type FieldName =
    | "client"
    | "phone"
    | "address"
    | "commit"
    | "deliveryTime"
    | "paidAmount";
  type FormValues = {
    client: string;
    phone: string;
    address: string;
    commit: string;
    deliveryTime: string;
    paidAmount: string;
  };

  const navigate = useNavigate();
  const [createOrder] = useCreateOrderMutation();

  const onSubmit = async (data: FormValues) => {
    if (data.phone.startsWith("+998") || data.phone.startsWith("998")) {
      data.phone = data.phone.replace(/\D/g, "").slice(-9);
    } else {
      data.phone = data.phone.replace(/\D/g, "").trim();
    }

    if (data.phone.length !== 9) {
      toast.error("Telefon raqamni to`g`ri kiriting");
      return;
    }
    const submittedData = {
      ...data,
      breadsInfo: breads.filter((bread) => bread.amount > 0),
      deliveryTime: data.deliveryTime.replace("T", " "),
      paidAmount: Number(data.paidAmount),
    };

    if (submittedData.breadsInfo.length === 0) {
      toast.error("Savat bo'sh bo'lmasligi zarur");
      return;
    }
    try {
      const response = await createOrder(submittedData).unwrap();
      toast.success("Buyurtma muvaffaqiyatli qabul qilindi");
      reset();
      navigate(`/zakazlar`);
      return response;
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  return (
    <div>
      <Toaster />
      <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[12px] pt-[20px] -ml-[20px] fixed top-0 w-full">
        <div className="flex justify-between items-center">
          <Link to={"/zakazlar"}>
            <IoArrowBack
              size={25}
              className="bg-[#FFCC15] text-[#1C2C57] rounded-full p-1 shrink-0 cursor-pointer"
            />
          </Link>
          <Title text={"Yangi buyurtma"} className="text-white mx-auto" />
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-3 mt-16"
      >
        {CLOSER_ORDER_FORM_LIST.map((item) => (
          <div key={item.name} className="w-full">
            <label
              htmlFor={item.name}
              aria-label={item.name}
              className="w-full text-[16px] font-semibold text-[#FFCC15]"
            >
              {item.labelText}
            </label>
            <Controller
              name={item?.name as FieldName}
              control={control}
              rules={{
                required: `${item.labelText} is required`,
                ...(item.type === "number"
                  ? {
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "Faqat raqam kiriting",
                      },
                    }
                  : {}),
              }}
              render={({ field }) => (
                <input
                  type={item.type === "dateAndTime" ? "datetime-local" : "text"}
                  placeholder={item.placeholder}
                  aria-label={item.name}
                  className="border border-[#FFCC15] outline-none p-1 px-2 font-semibold text-[#1C2C57] rounded-[8px] w-full"
                  {...field}
                  {...(item.type === "phone"
                    ? {
                        onChange: (e) => {
                          field.onChange(formatPhoneNumber(e.target.value));
                        },
                      }
                    : {})}
                  {...(item.type === "dateAndTime"
                    ? {
                        min: "0000-01-01T00:00",
                        max: "9000-12-31T23:59",
                      }
                    : {})}
                  {...(item.type === "number"
                    ? {
                        inputMode: "numeric",
                        value: field.value ? MoneyFormatter(field.value) : "",
                        onChange: (e) => {
                          field.onChange(e.target.value.replace(/\D/g, ""));
                        },
                      }
                    : {})}
                />
              )}
            />
            {item?.name && errors[item?.name as keyof FormValues] && (
              <p className="text-red-500 text-[12px]">
                {errors[item?.name as keyof FormValues]?.message}
              </p>
            )}
          </div>
        ))}

        <LoavesesNumber
          type="default"
          total={totalAmount}
          breadPrices={breads}
          setBreadPrices={setBreads}
        />

        <button
          type="submit"
          className="w-[200px] ml-auto mt-2 py-2 bg-[#FFCC15] rounded-[8px] text-[#1C2C57] font-bold"
        >
          Saqlash
        </button>
      </form>
    </div>
  );
};
