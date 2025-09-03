import { Button } from "@/components/ui/button";
import { useGetBakerRoomBreadSaleQuery } from "@/integration";
import { formatPhoneNumber } from "@/utils/phoneNumberFormat";
import { IoArrowBack, IoNotifications } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";

export const Sotuv = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const { data: product } = useGetBakerRoomBreadSaleQuery({ id: id as string });

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
          {product?.client?.fullName} <br />{" "}
          {product?.client?.phone && formatPhoneNumber(product?.client?.phone)}
        </h3>
        <button onClick={() => navigate("/notification")}>
          <IoNotifications size={25} color="#FFCC15" />
        </button>
      </header>
      <main className="mt-24">
        <div className="flex flex-col gap-y-3">
          {product?.breadsInfo.map((item, idx) => (
            <div
              key={idx}
              className="border-2 border-yellow-500 px-4 py-3 rounded-xl bg-white flex justify-between items-center"
            >
              <h3 className="text-blue-950 text-sm font-bold ">
                {item?.title}
              </h3>
              <h3 className="text-blue-950 text-sm font-bold ">
                {item?.breadSoldPrice} so'm
              </h3>
              <h3 className="text-blue-950 text-sm font-bold ">
                {item?.amount} ta
              </h3>
            </div>
          ))}

          <h3 className="text-white text-lg font-bold ">
            Umumiy summa: {product?.totalAmount.toLocaleString("ru-RU")} so'm
          </h3>
          <h3 className="text-yellow-400 text-lg font-semibold">
            {product?.createdAt.slice(0, 10)} {product?.createdAt.slice(11, 16)}
          </h3>
          <div className="border-2 border-yellow-500 px-4 py-3 rounded-xl flex justify-between items-center">
            <h3 className=" text-yellow-400 text-base font-semibold mb-5">
              {product?.commit}
            </h3>
          </div>
        </div>
      </main>
    </section>
  );
};
