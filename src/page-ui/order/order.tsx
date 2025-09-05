import { Title } from '@/components';
import { LoavesesNumber } from '@/components/common/loaveses-number';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { CLOSER_ORDER_FORM_LIST } from '@/constants';
import {
  RootState,
  useEditOrderMutation,
  useGetBreadPriceQuery,
  useGetOrderQuery,
  useProfileQuery,
  useSubmitOrderMutation,
} from '@/integration';
import { MoneyFormatter } from '@/utils/money-formatter';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { FaPlus } from 'react-icons/fa';
import { IoArrowBack } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

export const Order = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: order, refetch : getOrder} = useGetOrderQuery(id as string);
  const {data:me} = useProfileQuery({})
  const { data: bread , refetch: getBread} = useGetBreadPriceQuery();
  const [editOrder] = useEditOrderMutation();
  const [breads, setBreads] = useState<BreadsInfo[]>([]);
  const [qarz, setQarz] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [submitOrder] = useSubmitOrderMutation();


  useEffect(() => {
    if (order && bread) {
      const newBreads = [
        ...(order?.breadsInfo ?? []),
        ...bread.filter(
          (bread) => !order?.breadsInfo?.find((b) => b._id === bread._id)
        ),
      ].map((item) => ({
        ...item,
        amount: item.amount ?? 0,
      }));

      setBreads(newBreads);

      console.log('newbreads', newBreads);
    }
    setQarz(order?.debtAmount || 0);
  }, [order]);

  useEffect(() => {
    setTotalAmount(
      breads.reduce((acc, cur) => acc + cur.breadSoldPrice * cur.amount, 0)
    );
  }, [breads]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      paidAmount: '',
    },
  });

  const setAsDate = (deliveryTime: Date | string): string => {
    if (!deliveryTime) return '------';
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

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      getOrder();
      getBread();
    }
  }, [open, getOrder, getBread]);

  const bakerRoomId = useSelector((state:RootState) => state.expense.bakerRoomId)

  const onSubmit = async (data: any) => {
    const paid = Number(data.paidAmount.replace(/\s/g, ''));
    const postedData = {
      id: id as string,
      bakerRoomId,
      body: {
        paidAmount: paid,
        breadsInfo: breads.filter((bread) => bread.amount > 0),
      },
    };

    if (order && order.debtAmount > 0) {
      await editOrder(postedData).unwrap();
      setQarz(totalAmount - paid);
      toast.success('Qarz muvaffaqiyatli yangilandi');
      setOpen(false);
      reset();
    } else {
      setOpen(false);
      reset();
      toast.error('Qarz nolga teng');
    }
  };

  const submittingOrder = async () => {
    try {
      const res = await submitOrder([id as string,me?.bakerRoom as string]) as any;
      if (res?.error?.data?.message) toast.error(res?.error?.data?.message);
      if (res.data.message) toast.success('Zakaz topshirildi');
      console.log("res",res)
      setOpen(false);
      reset();
      navigate('/zakazlar');
    } catch (error:any) {
      console.log("err",error)
    }
  }

  return (
    <div className='mb-12'>
      <Toaster />
      <div className='border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[12px] pt-[20px] -ml-[20px] fixed top-0 w-full'>
        <div className='flex justify-between items-center'>
          <Link to={'/zakazlar'}>
            <IoArrowBack
              size={25}
              className='bg-[#FFCC15] text-[#1C2C57] rounded-full p-1 shrink-0 cursor-pointer'
            />
          </Link>
          <Title text={'Buyurtma'} className='text-white mx-auto' />
        </div>
      </div>

      <div className='flex flex-col gap-y-2 mt-16'>
        {CLOSER_ORDER_FORM_LIST.filter(
          (item) => item.name !== 'receivedMoney'
        ).map((item) => (
          <div key={item.name} className='w-full'>
            <span className='text-[16px] text-[#FFCC15] font-semibold'>
              {item.labelText}
            </span>
            <div className='w-full bg-white border border-[#FFCC15] p-1 rounded-[8px]'>
              <span className='text-[16px] text-[#1C2C57] font-semibold'>
                {order
                  ? item.name === 'deliveryTime'
                    ? setAsDate(order[item.name])
                    : order[item.name as keyof typeof order]?.toString()
                  : '-'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {order && (
        <LoavesesNumber
          type='table'
          breadPrices={breads}
          setBreadPrices={setBreads}
          total={totalAmount}
        />
      )}

      <div className='flex flex-col gap-y-4 mt-4'>
        {order?.paymentHistory.map((item, idx) => (
          <div
            key={idx}
            className='w-full bg-white rounded-[8px] border border-[#FFCC15] flex items-center justify-between px-2'
          >
            <div>
              <p className='text-[17px] font-semibold text-[#1C2C57]'>
                {item.fromUser.fullName}
              </p>
              <p className='text-[17px] font-semibold text-[#099431]'>
                {item.amount}
              </p>
            </div>
            <p className='text-[15px] font-semibold text-[#1C2C57] w-[90px] text-center'>
              {setAsDate(item.paymentDate)}
            </p>
          </div>
        ))}
      </div>

      <Button
        variant={'yellow'}
        className='text-[14px] text-[#1C2C57] font-[700] px-8 fixed bottom-5 left-5'
        onClick={submittingOrder}
      >
        Topshirish
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <div className='rounded-full p-[18px] bg-[#FFCC15] fixed bottom-[20px] right-[20px]'>
            <FaPlus size={15} className='cursor-pointer text-[#1C2C57]' />
          </div>
        </SheetTrigger>
        <SheetContent
          side={'bottom'}
          className='bg-[#1C2C57] border-none rounded-t-[20px]'
        >
          <SheetHeader className='border-2 border-[#FFCC15] rounded-[12px] p-[15px]'>
            <LoavesesNumber
              type='mini'
              breadPrices={breads}
              setBreadPrices={setBreads}
              total={totalAmount}
            />
            <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
              <div className='w-full text-left'>
                <label
                  htmlFor='receivedMoney'
                  className='w-full text-[16px] font-[600] text-[#FFCC15] '
                >
                  Olingan pul
                </label>
                <Controller
                  name='paidAmount'
                  control={control}
                  rules={{ required: 'Olingan pul is required' }}
                  render={({ field }) => (
                    <input
                      type='text'
                      placeholder='pul miqdori'
                      className='border border-[#FFCC15] outline-none p-1 px-2 font-semibold text-[#1C2C57] rounded-[8px] w-full'
                      {...field}
                      inputMode='numeric'
                      onKeyDown={(e) => {
                        if ('Ee+-.,'.includes(e.key)) e.preventDefault();
                      }}
                      onChange={(e) => {
                        field.onChange(
                          MoneyFormatter(e.target.value.replace(/\D/g, ''))
                        );
                      }}
                    />
                  )}
                />
                {errors.paidAmount && (
                  <p className='text-red-500 text-[12px]'>
                    {errors.paidAmount.message}
                  </p>
                )}
              </div>
              <p className='text-white text-[16px] font-[600] text-left mt-2'>
                Qarz: {MoneyFormatter(Number(qarz))}
              </p>
              <Button
                variant={'yellow'}
                className='text-[16px] flex font-[600] ml-auto mt-5 px-8'
              >
                saqlash
              </Button>
            </form>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};
