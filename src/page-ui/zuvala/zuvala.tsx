import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { Title } from "@/components";
import { Edit, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useGetDoughsQuery,
  usePatchDoughsMutation,
  useProfileQuery,
} from "@/integration";
import { useHandleRequest } from "@/hooks";
import toast from "react-hot-toast";
import { TimeAgo } from "./_components";

export const Zuvala = () => {
  const { data: me } = useProfileQuery({});
  const { data: dough } = useGetDoughsQuery({ id: me?.bakerRoom as string });
  const [patchDoughs] = usePatchDoughsMutation({});
  const handleRequest = useHandleRequest();

  const onSubmit = async (id: string) => {
    handleRequest({
      request: async () => {
        return await patchDoughs({ id }).unwrap();
      },
      onSuccess: () => {
        toast.success("Muvaffaqiyatli qo'shildi");
      },
    });
  };

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
          <Title text={"Zuvala"} className="text-white mx-auto" />
        </div>
      </div>

      <div className="flex flex-col gap-y-3 pt-[100px]">
        {dough?.map((item) => (
          <div className="bg-white border-2 border-yellow-500 rounded-[8px] px-3 py-2 flex justify-between items-center">
            <h3 className="text-blue-950 text-sm font-semibold">
              {item?.doughBallInfo?.dough_ball_count} ta{" "}
              {item?.dough_type?.title}
            </h3>
            <h3 className="text-blue-950 text-sm font-semibold">
              {item.createdAt.slice(11, 16)}
            </h3>
            <div className="px-3 py-1 bg-yellow-500 rounded-md">
              <TimeAgo createdAt={item.createdAt} />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button>
                  <MoreVertical size={20} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mr-10">
                <button
                  onClick={() => onSubmit(item._id)}
                  className="flex gap-x-3 items-center px-2"
                >
                  <Edit size={20} color="#1C2C57" />
                  <p className="text-blue-950 text-sm font-semibold">
                    Tandirga yopish
                  </p>
                </button>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
      </div>
    </div>
  );
};