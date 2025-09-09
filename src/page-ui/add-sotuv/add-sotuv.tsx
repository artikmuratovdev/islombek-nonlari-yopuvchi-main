import {
  RootState,
  useAddBakerRoomBreadSaleMutation,
  useGetAllUsersQuery,
  useGetBakerRoomBreadSaleBreadPricesQuery,
} from '@/integration';
import { useEffect, useState } from 'react';
import BreadList from './components/BreadList';
import { breadInfo } from '@/integration/api/bakerRoomSavdoApi/types';
import { Button } from '@/components/ui/button';
import { IoArrowBack, IoNotifications } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useSelector } from 'react-redux';
import { TextArea } from '@/components/common/TextArea/text-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import toast, { Toaster } from 'react-hot-toast';
import { useHandleRequest } from '@/hooks';

type FormValues = {
  breadsInfo: breadInfo[];
  client: string;
  paidAmount: number;
  isDebt: boolean;
  commit: string;
  phone: string;
};

export const AddSotuv = () => {
  const { data: breadPrice } = useGetBakerRoomBreadSaleBreadPricesQuery();
  const { data: client } = useGetAllUsersQuery({ roles: ['CLIENT'] });
  const [addSale] = useAddBakerRoomBreadSaleMutation();

  const [breads, setBreads] = useState<breadInfo[]>([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();
  const { totalAmount } = useSelector((state: RootState) => state.sotuv);
  const { bakerRoomId } = useSelector((state: RootState) => state.expense);
  const handleRequest = useHandleRequest();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      breadsInfo: [],
      client: '',
      paidAmount: 0,
      isDebt: false,
      commit: '',
      phone: '',
    },
  });

  useEffect(() => {
    setValue('breadsInfo', breads, { shouldValidate: true });
  }, [breads, setValue]);

  const isDebt = watch('isDebt');

  const checkChanged = (breadsInfo: breadInfo[]) => {
    if (!breadPrice) return false;
    return breadsInfo.some((item, idx) => {
      const ref = breadPrice[idx];
      if (!ref) return true;
      return item.breadSoldPrice !== ref.breadSoldPrice;
    });
  };

  const onSubmit = async (data: FormValues) => {
    if (totalAmount === 0) {
      toast.error("Umumiy summa 0 bo'lishi mumkin emas");
      return;
    }

    const isChanged = checkChanged(data.breadsInfo);
    if (isChanged) {
      setOpenDrawer(true);
      return;
    }

    data.breadsInfo = data.breadsInfo.filter((el) => el.amount !== 0);

    await handleRequest({
      request: async () => {
        const request = await addSale({
          id: bakerRoomId,
          body: {
            breadsInfo: data.breadsInfo,
            isDebt: false,
            paidAmount: totalAmount,
          },
        })
        return request
      },
      onSuccess: (data:any) => {
        toast.success(data.data.message || "Muvaffaqiyatli qo'shildi");
        navigate('/sotuv');
      },
      onError: (err:any) => {
        console.log(err.message);
        toast.error(err.message || "Xatolik yuz berdi");
      }
    })
  };

  const onDebtSubmit = async (data: FormValues) => {
    if (totalAmount === 0) {
      toast.error("Umumiy summa 0 bo'lishi mumkin emas");
      return;
    }

    data.breadsInfo = data.breadsInfo.filter((el) => el.amount !== 0);

    await handleRequest({
      request: async () => {
        const request = await addSale({
          id: bakerRoomId,
          body: {
            breadsInfo: data.breadsInfo,
            isDebt: true,
            client: data.client,
            paidAmount: totalAmount,
            commit: data.commit,
          },
        })
        return request
      },
      onSuccess: (data:any) => {
        toast.success(data.data.message || "Muvaffaqiyatli qo'shildi");
        navigate('/sotuv');
      },
      onError: (err:any) => {
        console.log(err.message);
        toast.error(err.message || "Xatolik yuz berdi");
      }
    })
  };

  const onPriceChangedSubmit = async (data: FormValues) => {
    if (totalAmount === 0) {
      toast.error("Umumiy summa 0 bo'lishi mumkin emas");
      return;
    }

    // Telefonni formatlash
    if (data.phone.startsWith('+998') || data.phone.startsWith('998')) {
      data.phone = data.phone.replace(/\D/g, '').slice(-9);
    } else {
      data.phone = data.phone.replace(/\D/g, '').trim();
    }

    data.breadsInfo = data.breadsInfo.filter((el) => el.amount !== 0);
    data.paidAmount = totalAmount;

    await handleRequest({
      request: async () => {
        const request = await addSale({
          id: bakerRoomId,
          body: data,
        })
        return request
      },
      onSuccess: (data:any) => {
        toast.success(data.data.message || "Muvaffaqiyatli qo'shildi");
        navigate('/sotuv');
      },
      onError: (err:any) => {
        toast.error(err.message || "Xatolik yuz berdi");
      }
    })
  };

  return (
    <>
      {/* Main Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Toaster />
        {/* HEADER */}
        <header className='border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[12px] pt-[20px] -ml-[20px] fixed top-0 w-full flex justify-between items-center'>
          <Button
            type='button'
            className='w-8 h-8 rounded-full bg-[#FFCC15]'
            onClick={() => navigate(-1)}
          >
            <IoArrowBack size={16} />
          </Button>
          <h3 className='text-center text-white text-2xl font-semibold'>
            Sotuv
          </h3>
          <button type='button' onClick={() => navigate('/notification')}>
            <IoNotifications size={25} color='#FFCC15' />
          </button>
        </header>

        {/* BREAD LIST */}
        <div className='space-y-3 pt-2 mb-5 mt-10'>
          {breadPrice && (
            <BreadList breadPrices={breadPrice} setBreads={setBreads} />
          )}
        </div>

        {/* BOTTOM */}
        <div className='flex justify-between'>
          <Controller
            name='isDebt'
            control={control}
            render={({ field }) => (
              <Label
                htmlFor='qarz'
                className='text-white flex gap-x-2 items-center'
              >
                <span className='relative border-2 border-yellow-400 rounded-full w-6 h-6'>
                  <Checkbox
                    id='qarz'
                    checked={field.value}
                    onCheckedChange={(val) => field.onChange(!!val)}
                    className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-none'
                  />
                </span>
                Qarz
              </Label>
            )}
          />

          <Button
            type='submit'
            className='bg-[#FFCC15] text-blue-950 text-sm font-bold px-6 py-1'
          >
            Saqlash
          </Button>
        </div>
      </form>

      {/* Drawer: Debt form */}
      <Drawer open={isDebt} onOpenChange={(open) => setValue('isDebt', open)}>
        <DrawerContent className='bg-blue-950'>
          <form
            onSubmit={handleSubmit(onDebtSubmit)}
            className='h-full px-3 py-4 flex flex-col gap-y-3'
          >
            {/* PaidAmount */}
            <div className='flex flex-col gap-y-1'>
              <label htmlFor='paidAmount' className='text-yellow-400'>
                Olingan pul
              </label>
              <Controller
                name='paidAmount'
                control={control}
                rules={{
                  required: 'Pulni kiriting',
                  min: { value: 0, message: '0 dan katta bo‘lishi kerak' },
                }}
                render={({ field }) => (
                  <>
                    <input
                      type='number'
                      value={(field.value ?? '')
                        .toString()
                        .replace(/^0+(?=\d)/, '')}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className='w-full p-1 border border-[#FFCC15] rounded bg-white
                        [&::-webkit-inner-spin-button]:appearance-none 
                        [&::-webkit-outer-spin-button]:appearance-none 
                        [appearance:textfield]'
                    />
                    {errors.paidAmount && (
                      <span className='text-red-500'>
                        {errors.paidAmount.message?.toString()}
                      </span>
                    )}
                  </>
                )}
              />
            </div>

            {/* Client */}
            <div className='flex flex-col gap-y-1'>
              <label htmlFor='client' className='text-yellow-400'>
                Mijoz
              </label>
              <Controller
                name='client'
                control={control}
                rules={{ required: 'Xodimni tanlang' }}
                render={({ field }) => (
                  <>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className='h-[42px] bg-white rounded-lg border-2 border-[#ffcb15] text-[#1b2b56] text-base font-semibold'>
                        <SelectValue placeholder='Mijozni tanlang' />
                      </SelectTrigger>
                      <SelectContent className='bg-white rounded-lg border border-[#ffcb15] mt-[9px]'>
                        {client?.map((item) => (
                          <SelectItem
                            key={item._id}
                            value={item._id}
                            className='text-[#1b2b56] text-base font-semibold'
                          >
                            {item.fullName} --- {item.role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.client && (
                      <span className='text-red-500'>
                        {errors.client.message?.toString()}
                      </span>
                    )}
                  </>
                )}
              />
            </div>

            {/* Commit */}
            <Controller
              name='commit'
              control={control}
              rules={{ required: 'Sababni yozing' }}
              render={({ field }) => (
                <div className='flex flex-col gap-y-1'>
                  <textarea
                    {...field}
                    placeholder='Qarz sababi'
                    className='resize-none h-28 rounded-md p-2 border border-gray-300'
                  />
                  {errors.commit && (
                    <span className='text-red-500'>
                      {errors.commit.message?.toString()}
                    </span>
                  )}
                </div>
              )}
            />

            <div className='flex justify-end'>
              <Button type='submit' className='text-blue-950 bg-yellow-500'>
                Yuborish
              </Button>
            </div>
          </form>
        </DrawerContent>
      </Drawer>

      {/* Drawer: Price changed */}
      <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
        <DrawerContent className='bg-blue-950'>
          <form
            onSubmit={handleSubmit(onPriceChangedSubmit)}
            className='h-full px-3 py-4 flex flex-col gap-y-3'
          >
            <h2 className='text-white text-2xl font-medium'>
              Umumiy summa: {totalAmount.toLocaleString('uz-UZ')}
            </h2>

            {/* Phone */}
            <div className='flex flex-col gap-y-1'>
              <label htmlFor='phone' className='text-yellow-400'>
                Telefon raqami
              </label>
              <Controller
                name='phone'
                control={control}
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      id='phone'
                      placeholder='Telefon raqami'
                      className='text-blue-950 bg-white'
                    />
                    {errors.phone && (
                      <p className='text-red-600 font-semibold text-base'>
                        {errors.phone.message?.toString()}
                      </p>
                    )}
                  </>
                )}
              />
            </div>

            {/* Commit */}
            <Controller
              name='commit'
              control={control}
              rules={{ required: 'Izohni yozing!' }}
              render={({ field }) => (
                <>
                  <TextArea
                    {...field}
                    placeholder='Shikoyat yoki izoh yozing'
                    className='bg-white rounded-lg'
                  />
                  {errors.commit && (
                    <p className='text-xs text-red-600'>
                      {errors.commit.message?.toString()}
                    </p>
                  )}
                </>
              )}
            />

            <div className='flex justify-end'>
              <Button type='submit' className='text-blue-950 bg-yellow-500'>
                Yuborish
              </Button>
            </div>
          </form>
        </DrawerContent>
      </Drawer>
    </>
  );
};