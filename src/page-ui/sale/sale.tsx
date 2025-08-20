import { Link, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { Title } from "@/components";
import { UZBTime } from "@/components/common/uzb-time/uzb-time";
import { Edit, MoreVertical, PhoneCall, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import {
  useDeleteBakerRoomBreadSalesMutation,
  useLazyGetBakerRoomBreadSalesQuery,
} from "@/integration";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { useHandleRequest } from "@/hooks";
import toast from "react-hot-toast";

const generateRandomCode = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < 5; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const Sale = () => {
  const navigate = useNavigate();

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteInput, setDeleteInput] = useState("");
  const [randomCode, setRandomCode] = useState("");
  const [saleToDelete, setSaleToDelete] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const handleRequest = useHandleRequest();
  const [getSupplierProducts, { data: supplierProducts, isLoading }] =
    useLazyGetBakerRoomBreadSalesQuery();
  const [deleteBakerRoomBreadSales] = useDeleteBakerRoomBreadSalesMutation();

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    getSupplierProducts({
      startDate: "2023-01-01",
      endDate: today,
    });
  }, []);

  const openDeleteDialog = (id: string) => {
    setSaleToDelete(id);
    setRandomCode(generateRandomCode());
    setDeleteInput("");
    setDeleteOpen(true);
  };

  const handleDelete = async (id: string) => {
    handleRequest({
      request: () => deleteBakerRoomBreadSales(id),
      onSuccess: () => {
        getSupplierProducts({
          startDate: "2023-01-01",
          endDate: new Date().toISOString().split("T")[0],
        });
        setDeleteOpen(false);
        toast.success("Muvaffaqiyatli o'chirildi.");
      },
      onError: (error) => {
        getSupplierProducts({
          startDate: "2023-01-01",
          endDate: new Date().toISOString().split("T")[0],
        });
        toast.error(
          (error as { message?: string })?.message ||
            String(error) ||
            "Xatolik yuz berdi."
        );
      },
    });
  };

  return (
    <>
      <header className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[12px] pt-[20px] -ml-[20px] fixed top-0 w-full">
        <div className="flex justify-between items-center">
          <Link to={"/"}>
            <IoArrowBack
              size={25}
              className="bg-[#FFCC15] text-[#1C2C57] rounded-full p-1 shrink-0 cursor-pointer"
            />
          </Link>
          <Title text={"Sotuv"} className="text-white mx-auto" />
        </div>
      </header>
      <main className="px-1">
        <div className="pt-[70px] flex justify-end">
          <UZBTime
            fetchDate={true}
            onSelectDate={(data) => {
              getSupplierProducts({
                startDate: data.startDate,
                endDate: data.endDate,
              });
            }}
          />
        </div>
        <div className="flex flex-col gap-y-3 mt-10">
          {supplierProducts?.map((item) => (
            <div
              key={item._id}
              onClick={() => navigate(`/sotuv/${item._id}`)}
              className="flex justify-between items-center bg-white rounded-lg border-2 border-yellow-500 py-3 px-2"
            >
              <h3 className="text-red-700 text-sm font-bold">
                {item?.totalAmount}
              </h3>
              <div className="flex items-center gap-x-3">
                {item?.phone && (
                  <div className="flex items-center gap-x-2">
                    <PhoneCall size={16} />
                    <h3 className="text-blue-950 text-sm font-bold">
                      {item?.phone}
                    </h3>
                  </div>
                )}
                <DropdownMenu
                  open={openDropdown === item._id.toString()}
                  onOpenChange={(isOpen) =>
                    setOpenDropdown(isOpen ? item._id : null)
                  }
                >
                  <DropdownMenuTrigger asChild>
                    <button>
                      <MoreVertical size={20} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/sotuv/${item._id}/edit`);
                      }}
                      className="flex items-center gap-x-2"
                    >
                      <Edit color="#1C2C57" size={16} />
                      <h3 className="text-blue-950 text-sm font-semibold">
                        Tahrirlash
                      </h3>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        openDeleteDialog(item._id);
                        setOpenDropdown(null);
                      }}
                      className="flex items-center gap-x-2"
                    >
                      <Trash2 color="red" size={16} />
                      <h3 className="text-red-700 text-sm font-semibold">
                        O’chirish
                      </h3>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Button
        onClick={() => navigate("/sotuv/add")}
        className="fixed bottom-[50px] right-[20px] bg-yellow-500 rounded-full w-10 h-10"
      >
        <Plus size={20} color="#1C2C57" />
      </Button>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>O'chirishni tasdiqlang</AlertDialogTitle>
            <AlertDialogDescription>
              O'chirish uchun quyidagi <b>{randomCode}</b> kodini kiriting.
            </AlertDialogDescription>
            <Input
              value={deleteInput}
              onChange={(e) => setDeleteInput(e.target.value)}
              placeholder="kodni kiriting..."
            />
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setDeleteOpen(false);
                setDeleteInput("");
                setSaleToDelete(null);
                setRandomCode("");
              }}
              className="bg-[#1b2b56] text-white"
            >
              Bekor qilish
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => saleToDelete && handleDelete(saleToDelete)}
              disabled={deleteInput !== randomCode}
              className="bg-red-700 text-white disabled:opacity-50"
            >
              {isLoading ? "Loading..." : "O'chirish"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
