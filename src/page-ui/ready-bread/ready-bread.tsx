import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { Tabs, Title } from "@/components";
import {
  useGetBakerRoomIdKelganBreadsQuery,
  useGetBakerRoomIdQolganBreadsQuery,
  useGetBakerRoomIdTayyorBreadsQuery,
  useGetBakerRoomIdTayyorBreadsTimesQuery,
  useProfileQuery,
} from "@/integration";

export const ReadyBread = () => {
  const { data: me } = useProfileQuery({});
  const { data: times } = useGetBakerRoomIdTayyorBreadsTimesQuery({
    id: me?.bakerRoom as string,
  });
  const { data: tayyor } = useGetBakerRoomIdTayyorBreadsQuery({
    id: me?.bakerRoom as string,
  });
  const { data: qolgan } = useGetBakerRoomIdQolganBreadsQuery({
    id: me?.bakerRoom as string,
  });
  const { data: keltirilgan } = useGetBakerRoomIdKelganBreadsQuery({
    id: me?.bakerRoom as string,
  });

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
          <Title text={"Tayyor nonlar"} className="text-white mx-auto" />
        </div>
      </div>

      <div className="pt-[70px]">
        <Tabs
          defaultValue="1"
          tabs={[
            {
              label: "Tayyor",
              value: "1",
              children: (
                <div className="flex flex-col gap-y-3 mt-10">
                  {tayyor?.data?.length ? (
                    tayyor.data.map((item, idx) => (
                      <div
                        key={idx}
                        className="border-2 border-yellow-500 px-4 py-2 flex justify-between w-full rounded-lg bg-white"
                      >
                        <h3 className="text-blue-950 text-base font-semibold">
                          {item?.count} ta {item?.breadTitle}
                        </h3>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500">Ma'lumot yo'q</p>
                  )}
                </div>
              ),
            },
            {
              label: "Qolgan",
              value: "2",
              children: (
                <div className="flex flex-col gap-y-3 mt-10">
                  {qolgan?.data?.length ? (
                    qolgan.data.map((item, idx) => (
                      <div
                        key={idx}
                        className="border-2 border-yellow-500 px-4 py-2 flex w-full rounded-lg justify-between bg-white items-center"
                      >
                        <h3 className="text-blue-950 text-base font-semibold">
                          {item?.count} ta {item?.breadTitle}
                        </h3>
                        <h3 className="text-blue-950 text-base font-semibold">
                          {new Date().toISOString().split("T")[0]}
                        </h3>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500">Ma'lumot yo'q</p>
                  )}
                </div>
              ),
            },
            {
              label: "Keltirilgan",
              value: "3",
              children: (
                <div className="flex flex-col gap-y-3 mt-10">
                  {keltirilgan?.length ? (
                    keltirilgan.map((item, idx) => (
                      <div
                        key={idx}
                        className="border-2 border-yellow-500 px-4 py-2 flex justify-between w-full rounded-lg bg-white"
                      >
                        <h3 className="text-blue-950 text-base font-semibold">
                          {item?.driver?.fullName}
                        </h3>
                        <h3 className="text-blue-950 text-base font-semibold">
                          {item?.breadCount} ta {item?.breadInfo?.title}
                        </h3>
                        <h3 className="text-blue-950 text-base font-semibold">
                          {item?.createdAt?.split("T")[0]}
                        </h3>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500">Ma'lumot yo'q</p>
                  )}
                </div>
              ),
            },
            {
              label: "Vaqtlari",
              value: "4",
              children: (
                <div className="flex flex-col gap-y-3 mt-10">
                  {times?.length ? (
                    times.map((item, idx) => (
                      <div
                        key={idx}
                        className="border-2 border-yellow-500 px-4 py-2 flex justify-between w-full rounded-lg bg-white"
                      >
                        <h3 className="text-blue-950 text-base font-semibold">
                          {item?.count} ta {item?.doughType?.title}
                        </h3>
                        <h3 className="text-blue-950 text-base font-semibold">
                          {item?.createdAt?.split("T")[0]}
                        </h3>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500">Ma'lumot yo'q</p>
                  )}
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
};
