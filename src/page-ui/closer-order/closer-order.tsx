import { Title } from '@/components';
import { useGetPreOrdersQuery } from '@/integration';
import { useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const CloserOrder = () => {
  const { data: preOrders , refetch} = useGetPreOrdersQuery();

  useEffect(() => {
    refetch();
  },[preOrders])

  console.log(preOrders);

  const setAsDate = (deliveryTime: Date | string | undefined | null): string => {
    if (!deliveryTime) return "------";

    let date: Date = new Date();

    if (typeof deliveryTime === 'string') {
      const customFormat = /^(\d{2})\.(\d{2})\.(\d{4}) (\d{2}):(\d{2})$/;
      const match = deliveryTime.match(customFormat);
      if (match) {
        const [, day, month, year, hours, minutes] = match;
        date = new Date(
          Number(year),
          Number(month) - 1,
          Number(day),
          Number(hours),
          Number(minutes)
        );
      } else {
        date = new Date(deliveryTime);
      }
    } else {
      date = deliveryTime;
    }

    if (isNaN(date.getTime())) return date.toString();

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}`;
  };

  return (
    <div>
      <div className='border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[12px] pt-[20px] -ml-[20px] fixed top-0 w-full'>
        <div className='flex justify-center items-center'>
          <Title text={'Zakazlar'} className='text-white mx-auto' />
        </div>
      </div>

      <div className='flex mt-16 justify-between items-center text-center font-bold my-4'>
        <p className='bg-[#FFCC15] w-20 h-6 rounded-md text-[#1C2C57] text-[16px]'>
          Manzil
        </p>
        <p className='bg-[#FFCC15] w-20 h-6 rounded-md text-[#1C2C57] text-[16px]'>
          Soni
        </p>
        <p className='bg-[#FFCC15] w-20 h-6 rounded-md text-[#1C2C57] text-[10px] py-1'>
          Topshrish vaqti
        </p>
      </div>

      <div className='w-full flex flex-col gap-4 mt-8 mb-20'>
        {preOrders?.map((item) => (
          <Link
            key={item._id}
            to={`/buyurtma/${item._id}`}
            className='bg-[#FFCC15] h-12 p-2 rounded-lg font-bold flex gap-2 items-center justify-between'
          >
            <span className='text-[#1C2C57] text-[14px] flex-1'>
              {item.client}
            </span>
            <span className='text-[#1C2C57] text-[15px] flex-1 text-center'>
              {item.breadCount}
            </span>
            <span className='text-[#1C2C57] text-[12px] flex-1 text-right'>
              {setAsDate(item.deliveryTime)}
            </span>
          </Link>
        ))}
      </div>
      <Link
        to={'/yangi-buyurtma'}
        className='rounded-full p-[18px] bg-[#FFCC15] fixed bottom-[90px] right-[20px]'
      >
        <FaPlus size={15} className='cursor-pointer text-[#1C2C57]' />
      </Link>
    </div>
  );
};
