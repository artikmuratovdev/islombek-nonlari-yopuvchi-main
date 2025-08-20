import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Controller, useForm } from 'react-hook-form';
import { SelectReasons } from './selectReasons';
import { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { SelectUser } from '@/components';
import { useGetUsersQuery } from '@/integration/api';
import { useEditExpenseMutation } from '@/integration/api/expenseApi';

export const EditExpense = ({
  amount,
}: {
  amount: number;
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      sum: String(amount),
      reason: '',
    },
  });

  const setId = useState('')[1];
  const [open, setOpen] = useState(false);

  const onSubmit = async (data: { sum: string }): Promise<void> => {
    try {
      const sum = parseInt(data.sum);
      if (isNaN(sum)) {
        throw new Error("Summa to'g'ri formatda emas.");
      }
      // await updateExpense({ id: editId, amount: sum, reason: id, });
      reset();
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className=' w-full'>
        <div
          className='flex items-center gap-2 p-2 px-4 border-b-2 border-[#1C2C57]'
          onClick={() => setOpen(true)}
        >
          <FaRegEdit size={25} />
          <button className='text-[14px] text-[#1C2C57] font-semibold '>
            Tahrirlash
          </button>
        </div>
      </SheetTrigger>
      <SheetContent
        side='bottom'
        className='bg-[#1C2C57] border-none rounded-t-[20px]'
      >
        <SheetHeader className='border-2 border-[#FFCC15] rounded-[12px] p-[15px]'>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div>
              <label
                htmlFor='sum'
                className='text-start text-[12px] text-[#FFCC15] font-[600] block'
              >
                Summa
              </label>
              <Controller
                name='sum'
                control={control}
                defaultValue=''
                rules={{ required: 'Summa kiriting' }}
                render={({ field }) => (
                  <input
                    {...field}
                    type='text'
                    className={`border outline-none p-1 rounded-[8px] w-full ${
                      errors.sum ? 'border-red-500' : 'border-[#FFCC15]'
                    }
                        }`}
                  />
                )}
              />
              {errors.sum && (
                <p className='text-red-500 text-xs mt-1'>
                  {errors.sum.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor='reason'
                className='text-start text-[12px] text-[#FFCC15] font-[600] block'
              >
                Sababi
              </label>
              <Controller
                name='reason'
                control={control}
                defaultValue=''
                render={({ field }) => (
                  <SelectReasons
                    {...field}
                    setId={setId}
                    title="Sabab qo'shish"
                    className={`w-full border outline-none p-1 rounded-[8px] bg-white ${
                      errors.reason ? 'border-red-500' : 'border-[#FFCC15]'
                    }`}
                  />
                )}
              />
              {errors.reason && (
                <p className='text-red-500 text-xs mt-1'>
                  {errors.reason.message}
                </p>
              )}
            </div>

            <Button
              variant={'greenary'}
              className='text-[16px] text-white font-[600] w-full mt-[10px]'
              type='submit'
              // disabled={isLoading}
            >
              Kiritish
            </Button>
          </form>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export const EditExpenseForPrivate = ({
  amount,
  comment,
}: {
  amount: number;
  comment?: string;
}) => {
  const { data: getUsers, isLoading: getUsersLoading } = useGetUsersQuery([
    'CEO',
    'ADMIN',
    'DRIVER',
    'SUPLIER',
    'DOUGHMAKER',
    'DISPETCHER',
    'CUSTOMER',
  ]);
  // const [updateExpense, { isLoading }] = useUpdateExpenseMutation()
  console.log(comment);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      sum: String(amount),
      reason: comment,
      user: '',
    },
  });

  const [, setId] = useState('');
  const [open, setOpen] = useState(false);

  const onSubmit = async (data: { sum: string }): Promise<void> => {
    try {
      const sum = parseInt(data.sum);
      if (isNaN(sum)) {
        throw new Error("Summa to'g'ri formatda emas.");
      }
      // await updateExpense({ id: editId, amount: sum, comment: comment, });
      reset();
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className='w-full'>
        <div
          className='flex items-center gap-2 p-2 px-4 border-b-2 border-[#1C2C57]'
          onClick={() => setOpen(true)}
        >
          <FaRegEdit size={25} />
          <button className='text-[14px] text-[#1C2C57] font-semibold '>
            Tahrirlash
          </button>
        </div>
      </SheetTrigger>
      <SheetContent
        side='bottom'
        className='bg-[#1C2C57] border-none rounded-t-[20px]'
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <SheetHeader className='border-2 border-[#FFCC15] rounded-[12px] p-[15px]'>
            <div className='flex items-center gap-x-2'>
              <div>
                <label
                  htmlFor='user'
                  className='text-start text-[12px] text-[#FFCC15] font-[600] w-full'
                >
                  Qabul qiluvchi
                </label>
                <Controller
                  name='user'
                  control={control}
                  render={({ field }) => (
                    <SelectUser
                      className='bg-white'
                      userData={getUsers}
                      setId={setId}
                      isLoading={getUsersLoading}
                      title='Xodim tanlash'
                      {...field}
                    />
                  )}
                />
              </div>

              <div>
                <label
                  htmlFor='sum'
                  className='text-[12px] text-[#FFCC15] font-[600] w-full text-start'
                >
                  Summa
                </label>
                <Controller
                  name='sum'
                  control={control}
                  rules={{ required: 'Summa is required' }}
                  render={({ field }) => (
                    <input
                      type='text'
                      className='border border-[#FFCC15] outline-none p-1 rounded-[8px] w-full'
                      {...field}
                    />
                  )}
                />
                {errors.sum && (
                  <p className='text-red-500 text-[12px]'>
                    {errors.sum.message}
                  </p>
                )}
              </div>
            </div>

            <label
              htmlFor='reason'
              className='text-start text-[12px] text-[#FFCC15] font-[600]'
            >
              Sababi
            </label>
            <Controller
              name='reason'
              control={control}
              render={({ field }) => (
                <input
                  type='text'
                  className='border border-[#FFCC15] outline-none p-1 rounded-[8px]'
                  {...field}
                />
              )}
            />
            {errors.reason && (
              <p className='text-red-500 text-[12px]'>
                {errors.reason.message}
              </p>
            )}

            <Button
              variant={'greenary'}
              className='text-[16px] text-white font-[600] ml-auto mt-[10px]'
              type='submit'
              // disabled={isLoading}
            >
              Kiritish
            </Button>
          </SheetHeader>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export const EditReport = ({
  editId,
  amount,
  selectedUser,
  commit,
  expense_type,
  fromUser,
}: {
  editId: string;
  amount: string;
  selectedUser?: string;
  commit?: string;
  expense_type: 'for_work' | 'for_salary';
  fromUser?: string;
}) => {
  const { data: getUsers, isLoading: getUsersLoading } = useGetUsersQuery([
    'CEO',
    'ADMIN',
    'DRIVER',
    'SUPPLIER',
    'DOUGHMAKER',
    'DISPATCHER',
  ]);
  const [editExpense] = useEditExpenseMutation();

  console.log('SelectedUser', !!selectedUser);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      sum: String(amount),
      user: selectedUser || '',
      reason: commit || '',
    },
  });

  const setId = useState('')[1];
  const [open, setOpen] = useState(false);

  const onSubmit = async (data: { sum: string ,user:string,reason:string}): Promise<void> => {
    try {
      const sum = parseInt(data.sum);
      if (isNaN(sum)) {
        throw new Error("Summa to'g'ri formatda emas.");
      }

      console.log({
        id: editId,
        body: {
          expense_type,
          amount: Number(sum)* 1000,
          fromUser: fromUser,
          toUser: selectedUser,
          reason: data.reason,
        },
      });
      const res = await editExpense({
        id: editId,
        body: {
          expense_type,
          amount: Number(sum)* 1000,
          fromUser: fromUser as string,
          toUser: selectedUser,
          reason: data.reason,
        },
      }).unwrap();
      reset();
      console.log(res);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className='w-full text-[#1C2C57]'>
        <div
          className='flex items-center gap-2 p-2 px-4 border-b-2 border-[#1C2C57]'
          onClick={() => setOpen(true)}
        >
          <FaRegEdit size={25} />
          <button className='text-[14px] text-[#1C2C57] font-semibold '>
            Tahrirlash
          </button>
        </div>
      </SheetTrigger>
      <SheetContent
        side='bottom'
        className='bg-[#1C2C57] border-none rounded-t-[20px]'
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <SheetHeader className='border-2 border-[#FFCC15] rounded-[12px] p-[15px]'>
            <label
              htmlFor='sum'
              className='text-start text-[12px] text-[#FFCC15] font-[600]'
            >
              Summa
            </label>
            <Controller
              name='sum'
              control={control}
              rules={{ required: 'Summa is required' }}
              render={({ field }) => (
                <input
                  type='text'
                  id='sum'
                  className='border border-[#FFCC15] outline-none p-1 rounded-[8px] w-full'
                  {...field}
                />
              )}
            />

            {errors.sum && <span>{errors.sum.message}</span>}

            {!!selectedUser && (
              <>
                <label
                  htmlFor=''
                  className='text-start text-[12px] text-[#FFCC15] font-[600]'
                >
                  Olgan xodim
                </label>
                <Controller
                  name='user'
                  control={control}
                  render={({ field }) => (
                    <SelectUser
                      disabled
                      selectedUser={selectedUser}
                      className='bg-white'
                      userData={getUsers}
                      setId={setId}
                      title='Xodim tanlash'
                      isLoading={getUsersLoading}
                      {...field}
                    />
                  )}
                />
                {errors.user && <span>{errors.user.message}</span>}
              </>
            )}
            {!!commit && (
              <>
                <label
                  htmlFor='reason'
                  className='text-start text-[12px] text-[#FFCC15] font-[600]'
                >
                  Sababi
                </label>
                <Controller
                  name='reason'
                  control={control}
                  render={({ field }) => (
                    <input
                      type='text'
                      disabled
                      id='reason'
                      className='outline-none p-1 rounded-[8px]'
                      {...field}
                    />
                  )}
                />
                {errors.reason && <span>{errors.reason.message}</span>}
              </>
            )}

            <Button
              variant={'greenary'}
              className='text-[16px] font-[600] ml-auto mt-[10px] text-white'
              type='submit'
              // disabled={isLoading}
            >
              Yuborish
            </Button>
          </SheetHeader>
        </form>
      </SheetContent>
    </Sheet>
  );
};
