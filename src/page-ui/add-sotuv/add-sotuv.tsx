/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Minus, Plus, Check } from "lucide-react";
import { IoArrowBack, IoNotifications } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  useAddBakerRoomBreadSaleMutation,
  useGetAllUsersQuery,
  useGetBakerRoomBreadSaleBreadPricesQuery,
  useProfileQuery,
} from "@/integration";
import { Controller, useForm } from "react-hook-form";
import { useHandleRequest } from "@/hooks";
import toast from "react-hot-toast";

interface breadType {
  _id: string;
  title: string;
  breadPrice: number;
  breadSoldPrice: number;
  amount?: number;
}

export const AddSotuv = () => {
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      breadsInfo: [] as breadType[],
      client: "",
      paidAmount: 0,
      isDebt: false,
      commit: "",
      phone: "",
    },
  });

  const navigate = useNavigate();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<number | null>(null);
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [, setQarzChecked] = useState(false);
  const [bottomSheetOpen2, setBottomSheetOpen2] = useState(true);
  const { data: me } = useProfileQuery({});

  const { data: client } = useGetAllUsersQuery({ roles: ["CLIENT"] });
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { data: bread } = useGetBakerRoomBreadSaleBreadPricesQuery();
  const handleRequest = useHandleRequest();
  const [addBakerRoomBreadSale] = useAddBakerRoomBreadSaleMutation();

  useEffect(() => {
    if (bread) {
      setValue(
        "breadsInfo",
        bread.map((b: breadType) => ({ ...b, amount: 0 }))
      );
    }
  }, [bread, setValue]);

  const handleSavePrice = (id: string) => {
    if (tempPrice === null) return;
    const currentBreadsInfo = control._formValues.breadsInfo as breadType[];
    const updatedBreadsInfo = currentBreadsInfo.map((item: breadType) =>
      item._id === id ? { ...item, breadSoldPrice: tempPrice } : item
    );
    setValue("breadsInfo", updatedBreadsInfo);
    setEditingId(null);
    setTempPrice(null);
  };

  const onSubmit = async (data: any) => {
    handleRequest({
      request: () => {
        return addBakerRoomBreadSale({
          id: me?.bakerRoom as string,
          body: {
            client: data?.client,
            paidAmount: data?.paidAmount,
            isDebt: data?.isDebt,
            commit: data?.commit,
            phone: data?.phone,
            breadsInfo: data?.breadsInfo,
          },
        }).unwrap();
      },
      onSuccess: () => {
        reset();
        setTimeout(() => {
          navigate("/sotuv");
        }, 1000);
        toast.success("Muvaffaqiyatli qo'shildi");
      },
      onError: (err) => {
        toast.error(
          (err as { message?: string })?.message || "Xatolik yuz berdi"
        );
      },
    });
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

      <main className="pt-16">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-3"
        >
          {/* breadsInfo list */}
          <Controller
            name="breadsInfo"
            control={control}
            render={({ field }) => (
              <>
                {field.value.map((item: breadType, index: number) => (
                  <div
                    key={item._id}
                    className="border-2 border-yellow-500 px-4 flex justify-between items-center py-2 rounded-xl bg-white"
                  >
                    <h3 className="text-blue-950 text-sm font-bold">
                      {item.title}
                    </h3>

                    {/* Narx tahrirlash */}
                    <div className="flex gap-x-1 items-center">
                      {editingId === item._id ? (
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            value={tempPrice ?? item.breadSoldPrice}
                            onChange={(e) =>
                              setTempPrice(Number(e.target.value))
                            }
                            className="w-20 h-6 text-sm"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...field.value];
                              updated[index].breadSoldPrice =
                                tempPrice ?? item.breadSoldPrice;
                              field.onChange(updated);
                              handleSavePrice(item._id);
                            }}
                          >
                            <Check size={16} color="green" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <h3 className="text-blue-950 text-sm font-bold">
                            {item.breadSoldPrice}
                          </h3>
                          <button
                            type="button"
                            onClick={() => {
                              setEditingId(item._id);
                              setTempPrice(item.breadSoldPrice);
                            }}
                          >
                            <Edit size={16} color="#1C2C57" />
                          </button>
                        </>
                      )}
                    </div>

                    <div className="flex items-center gap-x-2">
                      <button
                        type="button"
                        className="w-5 h-5 bg-blue-950 rounded-full flex items-center justify-center"
                        onClick={() => {
                          const updated = [...field.value];
                          updated[index].amount = Math.max(
                            (item.amount || 0) - 1,
                            0
                          );
                          field.onChange(updated);
                        }}
                      >
                        <Minus size={16} color="#FFCC15" />
                      </button>
                      <h3 className="text-blue-950 text-sm font-bold">
                        {item.amount}
                      </h3>
                      <button
                        type="button"
                        className="w-5 h-5 bg-blue-950 rounded-full flex items-center justify-center"
                        onClick={() => {
                          const updated = [...field.value];
                          updated[index].amount = (item.amount || 0) + 1;
                          field.onChange(updated);
                        }}
                      >
                        <Plus size={16} color="#FFCC15" />
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}
          />

          {/* umumiy summa */}
          <Controller
            name="breadsInfo"
            control={control}
            render={({ field }) => {
              const totalSum = field.value.reduce(
                (sum: number, item: breadType) =>
                  sum + (item.breadSoldPrice || 0) * (item.amount || 0),
                0
              );
              return (
                <h4 className="text-white text-xl font-semibold">
                  Umumiy summa: {totalSum}
                </h4>
              );
            }}
          />

          {/* qarz checkbox */}
          <Controller
            name="isDebt"
            control={control}
            render={({ field }) => (
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="qarz"
                    className="text-white border-2 border-yellow-400"
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      field.onChange(!!checked);
                      setQarzChecked(!!checked);
                      setBottomSheetOpen(!!checked);
                    }}
                  />
                  <Label htmlFor="qarz" className="text-white">
                    Qarz
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="bg-[#FFCC15] text-blue-950 text-sm font-bold px-6 py-1"
                >
                  Qo'shish
                </Button>
              </div>
            )}
          />
        </form>
      </main>

      {/* Drawer 1: qarz */}
      <Drawer
        open={bottomSheetOpen}
        onOpenChange={(open) => {
          setBottomSheetOpen(open);
          if (!open) {
            setQarzChecked(false);
          }
        }}
      >
        <DrawerContent className="bg-blue-950">
          <div className="h-full px-3 py-4">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-y-3 relative"
            >
              {/* paidAmount */}
              <div className="flex flex-col gap-y-1">
                <label htmlFor="paidAmount" className="text-yellow-400">
                  Olingan pul
                </label>
                <Controller
                  name="paidAmount"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <>
                      <Input
                        {...field}
                        placeholder="Olingan pul"
                        id="paidAmount"
                      />
                      {errors.paidAmount && (
                        <span className="text-red-500">
                          This field is required
                        </span>
                      )}
                    </>
                  )}
                />
              </div>

              {/* client tanlash */}
              <div className="flex flex-col gap-y-1 relative">
                <label htmlFor="client" className="text-yellow-400">
                  Mijozni tanlang
                </label>
                <Controller
                  name="client"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => {
                    const selected = client?.find((m) => m._id === field.value);
                    return (
                      <div className="relative">
                        <Input
                          id="client"
                          placeholder="Mijoz ismini yozing"
                          value={search || selected?.fullName || ""}
                          onChange={(e) => {
                            setSearch(e.target.value);
                            setIsOpen(true);
                            field.onChange("");
                          }}
                          onFocus={() => setIsOpen(true)}
                          autoComplete="off"
                        />

                        {isOpen && (
                          <ul className="absolute bottom-full mb-1 bg-white border rounded-md w-full max-h-40 overflow-y-auto shadow-lg">
                            {client && client.length > 0 ? (
                              client
                                .filter((m) =>
                                  m.fullName
                                    .toLowerCase()
                                    .includes(search.toLowerCase())
                                )
                                .map((m) => (
                                  <li
                                    key={m._id}
                                    className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                                    onClick={() => {
                                      field.onChange(m._id);
                                      setSearch(m.fullName);
                                      setIsOpen(false);
                                    }}
                                  >
                                    {m.fullName}
                                  </li>
                                ))
                            ) : (
                              <li className="px-3 py-2 text-gray-500">
                                Mijozlar topilmadi
                              </li>
                            )}
                          </ul>
                        )}

                        {errors.client && (
                          <span className="text-red-500">
                            This field is required
                          </span>
                        )}
                      </div>
                    );
                  }}
                />
              </div>

              {/* sabab */}
              <Controller
                name="commit"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <div className="flex flex-col gap-y-1">
                    <textarea
                      {...field}
                      placeholder="Qarz sababi"
                      className="resize-none rounded-md p-2 border border-gray-300"
                    />
                    {errors.commit && (
                      <span className="text-red-500">
                        This field is required
                      </span>
                    )}
                  </div>
                )}
              />

              <div className="flex justify-end">
                <Button type="submit" className="text-blue-950 bg-yellow-500">
                  Yuborish
                </Button>
              </div>
            </form>
          </div>
        </DrawerContent>
      </Drawer>

      {/* Drawer 2: umumiy summa */}
      <Drawer open={bottomSheetOpen2} onOpenChange={setBottomSheetOpen2}>
        <DrawerContent className="bg-blue-950">
          <div className="h-full px-3 py-4">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-y-3"
            >
              <h2 className="text-white text-xl font-medium">Umumiy summa:</h2>

              {/* phone */}
              <div className="flex flex-col gap-y-2 mt-5">
                <label
                  htmlFor="phone"
                  className="text-yellow-400 text-base font-semibold"
                >
                  Telefon raqami
                </label>
                <Controller
                  name="phone"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <>
                      <Input
                        {...field}
                        placeholder="Telefon raqami"
                        id="phone"
                        type="number"
                      />
                      {errors.phone && (
                        <span className="text-red-500">
                          This field is required
                        </span>
                      )}
                    </>
                  )}
                />
              </div>

              <div className="flex justify-end">
                <Button className="text-blue-950 bg-yellow-500" type="submit">
                  Yuborish
                </Button>
              </div>
            </form>
          </div>
        </DrawerContent>
      </Drawer>
    </section>
  );
};
