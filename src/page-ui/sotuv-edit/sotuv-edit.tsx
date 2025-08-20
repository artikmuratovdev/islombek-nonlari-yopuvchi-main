/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Edit, Minus, Plus } from "lucide-react";
import { IoArrowBack, IoNotifications } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditaddBakerRoomBreadSaleMutation,
  useGetBakerRoomBreadSaleQuery,
  useProfileQuery,
} from "@/integration";
import { useHandleRequest } from "@/hooks";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";

type ProductCardProps = {
  id: string;
  name: string;
  control: any;
  amount: number;
};

const ProductCard = ({ id, name, control }: ProductCardProps) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="bg-white border-2 border-yellow-500 px-2 py-3 rounded-xl flex justify-between items-center">
      <h3 className="text-blue-950 text-sm font-bold">{name}</h3>

      <div className="flex items-center gap-x-2">
        <Controller
          name={`${id}.price`}
          control={control}
          render={({ field }) =>
            isEditing ? (
              <input
                type="number"
                value={field.value}
                onChange={(e) => field.onChange(Number(e.target.value))}
                onBlur={() => setIsEditing(false)}
                autoFocus
                className="border border-blue-950 rounded px-2 w-20 text-blue-950 font-bold text-sm"
              />
            ) : (
              <h3 className="text-blue-950 text-sm font-bold">
                {field.value?.toLocaleString()}
              </h3>
            )
          }
        />
        <Edit
          size={20}
          color="#1C2C57"
          className="cursor-pointer"
          onClick={() => setIsEditing(true)}
        />
      </div>

      <div className="flex items-center gap-x-2">
        <Controller
          name={`${id}.count`}
          control={control}
          render={({ field }) => (
            <>
              <button
                className="w-5 h-5 bg-blue-950 rounded-full flex items-center justify-center"
                onClick={(e) => {
                  e.preventDefault();
                  const newCount = field.value > 0 ? field.value - 1 : 0;
                  field.onChange(newCount);
                }}
              >
                <Minus size={16} color="#FFCC15" />
              </button>
              <h3 className="text-blue-950 text-sm font-bold">{field.value}</h3>
              <button
                className="w-5 h-5 bg-blue-950 rounded-full flex items-center justify-center"
                onClick={(e) => {
                  e.preventDefault();
                  field.onChange(field.value + 1);
                }}
              >
                <Plus size={16} color="#FFCC15" />
              </button>
            </>
          )}
        />
      </div>
    </div>
  );
};

export const SotuvEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [edit] = useEditaddBakerRoomBreadSaleMutation();
  const handleRequest = useHandleRequest();
  const { data: breads } = useGetBakerRoomBreadSaleQuery({ id: id as string });
  const { data: me } = useProfileQuery({});

  const { control, handleSubmit, watch, reset } = useForm({
    defaultValues: {},
  });

  useEffect(() => {
    if (breads?.breadsInfo) {
      reset(
        breads.breadsInfo.reduce(
          (acc: any, p: any) => ({
            ...acc,
            [p._id]: { price: p.breadSoldPrice, count: p.amount ?? 0 },
          }),
          {}
        )
      );
    }
  }, [breads, reset]);

  const products = watch();
  const total = Object.values(products || {}).reduce(
    (sum: number, p: any) => sum + p.price * p.count,
    0
  );

  const onSubmit = async (data: any) => {
    const productsArray = Object.entries(data).map(([id, value]: any) => {
      const bread = breads?.breadsInfo?.find((p: any) => p._id === id);

      return {
        _id: id,
        title: bread?.title || "",
        breadPrice: bread?.breadPrice || 0,
        breadSoldPrice: value.price,
        amount: value.count,
      };
    });

    handleRequest({
      request: () =>
        edit({
          bakerRoomId: me?.bakerRoom as string,
          id: id as string,
          body: {
            breadsInfo: productsArray,
          },
        }),
      onSuccess: () => {
        toast.success("Muvaffaqiyatli qo'shildi");
        navigate("/sotuv");
      },
      onError: (err) => {
        toast.error(
          (err as { message?: string })?.message || "Xatolik yuz berdi"
        );
      },
    });

    console.log("Yuboriladigan ma'lumot:", {
      breadsInfo: productsArray,
    });

    reset();
  };

  return (
    <section>
      <header className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[12px] pt-[20px] -ml-[20px] fixed top-0 w-full flex justify-between items-center">
        <Button
          className="w-8 h-8 rounded-full bg-[#FFCC15]"
          onClick={() => navigate(-1)}
        >
          <IoArrowBack size={16} />
        </Button>
        <h3 className="text-center justify-center text-white text-2xl font-semibold">
          Sotuv
        </h3>
        <button onClick={() => navigate("/notification")}>
          <IoNotifications size={25} color="#FFCC15" />
        </button>
      </header>

      <main className="mt-16">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-y-3">
            {breads?.breadsInfo?.map((p) => (
              <ProductCard
                key={p._id}
                id={p._id}
                name={p.title}
                amount={p.amount}
                control={control}
              />
            ))}

            <h3 className="text-white text-xl font-semibold">
              Umumiy summa: {total.toLocaleString()}
            </h3>

            <div className="flex justify-end">
              <Button
                className="bg-yellow-400 text-blue-950 px-10"
                type="submit"
              >
                Saqlash
              </Button>
            </div>
          </div>
        </form>
      </main>
    </section>
  );
};
