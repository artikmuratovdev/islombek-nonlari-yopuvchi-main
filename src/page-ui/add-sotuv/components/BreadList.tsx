import { useState } from 'react';
import BreadPrices from './BreadPrices';
import { breadInfo } from '@/integration/api/bakerRoomSavdoApi/types';
import { useDispatch, useSelector } from 'react-redux';
import { setTotalAmount } from '@/integration/slice/sotuv.slice';
import { RootState } from '@/integration';

type BreadListProps = {
  breadPrices: breadInfo[];
  setBreads: React.Dispatch<React.SetStateAction<breadInfo[]>>;
};

const BreadList = ({ breadPrices, setBreads }: BreadListProps) => {
  const [totals, setTotals] = useState<Record<string, number>>({});
  const dispatch = useDispatch();
  const {totalAmount} = useSelector((state: RootState) => state.sotuv)

  const handleTotalChange = (id: string, value: number) => {
    setTotals((prev) => ({...prev,[id]: Number(value) || 0,}));
  };

  const grandTotal = Object.values(totals).reduce(
    (acc, val) => acc + (Number(val) || 0),
    0
  );
  dispatch(setTotalAmount(grandTotal))

  return (
    <div>
      <div className='mt-5 flex flex-col gap-y-2'>
        {breadPrices.map((bread) => (
          <BreadPrices
            key={bread._id}
            bread={bread}
            onChange={handleTotalChange}
            setBreads={setBreads}
          />
        ))}
      </div>

      <div className='mt-4 text-white text-2xl font-semibold'>
        Umumiy summa: {totalAmount.toLocaleString('uz-UZ')}
      </div>
    </div>
  );
};

export default BreadList;