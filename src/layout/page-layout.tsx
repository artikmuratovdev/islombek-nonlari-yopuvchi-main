import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu } from './menu';
import { useGetBakerRoomQuery, useProfileQuery } from '@/integration';
import { Loader } from '@/components';
import { FaBell } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { setBakerRoom } from '@/integration/slice/expenseSlice';

const PendingApprovalScreen = () => (
  <div className='h-screen flex flex-col items-center justify-center text-center px-4'>
    <h1 className='text-2xl font-semibold mb-4 text-orange-600'>
      Hisobingiz tasdiqlanmagan
    </h1>
    <p className='text-gray-600'>
      Iltimos, administrator tomonidan tasdiqlanishini kuting.
    </p>
  </div>
);

export const PageLayout = () => {
  const location = useLocation();
  const { data: profile , isLoading } = useProfileQuery({});
  const id = profile?.bakerRoom as string;

  const { data: room } = useGetBakerRoomQuery({ id }, { skip: !id });

  const dispatch = useDispatch();

  if (profile) {
    dispatch(
      setBakerRoom([profile.bakerRoom as string, room?.bakerRoom.balance as number])
    );
  }

  if (isLoading) {
    return (
      <div className='h-screen flex items-center justify-center'>
        <Loader />
      </div>
    );
  }

  if (profile?.message === 'Tasdiqlashni kuting') {
    return <PendingApprovalScreen />;
  }

  return (
    <div>
      {location.pathname === '/' && (
        <header className='border-b-2 border-[#FFCC15] bg-[#1C2C57] p-[12px] fixed top-0 w-full z-10 flex items-center justify-between rounded-b-[30px] px-4 py-2 text-white font-semibold text-[20px] '>
          <div />
          <h1 className='text-center justify-center text-white text-2xl font-semibold'>
            {room?.bakerRoom?.title}
          </h1>
          <Link to='/notification'>
            <FaBell size={25} className='text-[#FFCC15] cursor-pointer' />
          </Link>
        </header>
      )}
      <div
        className={`px-[20px] ${
          location.pathname === '/' ? 'py-[80px]' : 'py-[20px]'
        }`}
      >
        <Outlet />
      </div>
      {(location.pathname === '/' ||
        location.pathname === '/xarajatlar' ||
        location.pathname === '/kassa-hisoboti' ||
        location.pathname === '/zakazlar') && <Menu />}
    </div>
  );
};
