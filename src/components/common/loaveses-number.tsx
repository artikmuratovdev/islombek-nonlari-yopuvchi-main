import React, { useState } from 'react';
import { Title } from './Title';
import { MoneyFormatter } from '@/utils/money-formatter';
import { FaMinus, FaPlus, FaRegEdit } from 'react-icons/fa';

export const LoavesesNumber = ({
  type = 'default',
  breadPrices,
  setBreadPrices,
  total
}: {
  type?: 'default' | 'mini' | 'table';
  breadPrices?: BreadsInfo[];
  setBreadPrices?: React.Dispatch<
    React.SetStateAction<BreadsInfo[]>
  >;
  total?: number;
}) => {
  console.log("breadPrices",breadPrices);
  return (
    <div>
      <div
        className={`${
          type === 'table' &&
          'w-full mt-4 bg-white border border-[#FFCC15] rounded-[8px] flex flex-col px-2'
        }`}
      >
        {breadPrices?.map((item, idx) =>
          type === 'table' ? (
            <div
              key={item._id}
              className='flex items-center justify-between gap-x-2 font-semibold text-[#1C2C57]'
            >
              <span className='font-bold flex-1 text-left'>{item.title}</span>
              <span className='flex-1 text-center text-[18px]'>
                {MoneyFormatter(item.breadPrice)}
              </span>
              <span className='flex-1 text-right text-[18px]'>{item.amount}</span>
            </div>
          ) : (
            <PriceTable
              key={item._id}
              idx={idx}
              item={item}
              breadPrices={breadPrices}
              type={type}
              setBreads={setBreadPrices}
            />
          )
        )}
      </div>
      <Title
        text={`Umumiy summa: ${MoneyFormatter(Number(total))}`}
        className={`text-white mt-2 text-left ${
          type === 'mini' && 'text-[19px]'
        }`}
      />
    </div>
  );
};

type Props = {
  item: BreadsInfo;
  breadPrices?: BreadsInfo[];
  idx: number;
  type?: 'default' | 'mini' | 'table';
  setBreads?: React.Dispatch<
    React.SetStateAction<(BreadsInfo & { amount: number })[]>
  >;
};

export const PriceTable = ({ item, idx, type, setBreads }: Props) => {
  const [priceEditInput, setPriceEditInput] = useState<{
    [key: string]: boolean;
  }>({});

  return (
    <div className='w-full'>
      <div className='flex flex-col gap-y-3 mt-4'>
        <div className='w-full border border-[#FFCC15] font-bold rounded-[8px] p-2 flex items-center justify-between bg-white'>
          <span className='text-[#1C2C57] flex-1 text-left'>{item.title}</span>

          <span className='text-[#1C2C57] font-semibold flex items-center justify-center gap-1 flex-1 text-center'>
            {priceEditInput[idx] ? (
              <input
                type='text'
                autoFocus
                value={item.breadSoldPrice}
                onChange={e =>
                  setBreads?.(prev =>
                    prev.map(bread =>
                      bread._id === item._id
                        ? { ...bread, breadSoldPrice: Number(e.target.value) }
                        : bread
                    )
                  )
                }
                className='outline-none w-1/3 bg-black/10'
              />
            ) : (
              <span>{MoneyFormatter(item.breadPrice)}</span>
            )}
            {type !== 'mini' && (
              <FaRegEdit
                size={20}
                className='cursor-pointer'
                onClick={() =>
                  setPriceEditInput(prev => ({
                    ...prev,
                    [idx]: !prev[idx]
                  }))
                }
              />
            )}
          </span>

          <div className='flex items-center gap-1 justify-between'>
            <button type='button' className='bg-[#1C2C57] p-1 rounded-[8px]'>
              <FaMinus
                size={type === 'mini' ? 16 : 20}
                className='cursor-pointer text-[#FFCC15]'
                onClick={() =>
                  setBreads?.(prev =>
                    prev.map(bread =>
                      bread._id === item._id
                        ? { ...bread, amount: bread.amount > 0 ? bread.amount - 1 : 0 }
                        : bread
                    )
                  )
                }
              />
            </button>

            {/* Editable amount input */}
            <input
              type='number'
              min={0}
              value={item.amount}
              onChange={e => {
                const newAmount = parseInt(e.target.value) || 0;
                setBreads?.(prev =>
                  prev.map(bread =>
                    bread._id === item._id
                      ? { ...bread, amount: newAmount }
                      : bread
                  )
                );
              }}
              className='w-14 text-center border rounded-md border-gray-300 text-[#1C2C57]'
            />

            <button type='button' className='bg-[#1C2C57] p-1 rounded-[8px]'>
              <FaPlus
                size={type === 'mini' ? 16 : 20}
                className='cursor-pointer text-[#FFCC15]'
                onClick={() =>
                  setBreads?.(prev =>
                    prev.map(bread =>
                      bread._id === item._id
                        ? { ...bread, amount: bread.amount + 1 }
                        : bread
                    )
                  )
                }
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
