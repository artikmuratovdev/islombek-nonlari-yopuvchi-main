import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ReactNode, useState } from 'react';

type Props = {
  children: ReactNode;
  onDelete: () => void;
};

export function Delete_Modal({ children, onDelete }: Props) {
  const [del, setDel] = useState('');
  const [open, setOpen] = useState(false);
  const [validate, setvalidate] = useState(false);
  const makeDel = () => {
    if (del === 'Delete') {
      onDelete();
      setvalidate(false);
      setDel('');
      setOpen(false);
      console.log('OK');
    } else {
      setvalidate(true);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <button className='text-[14px] text-[#C71A1A] font-semibold'>
            {children}
          </button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Haqiqatan o'chirmoqchimisiz?</DialogTitle>
            <DialogDescription
              className={validate ? 'text-red-500 font-bold' : ''}
            >
              Iltimos, tasdiqlash uchun <b>Delete</b> deb yozing
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-3'>
            <Input
              value={del}
              onChange={(e) => setDel(e.target.value)}
              className={
                validate
                  ? 'focus-visible:ring-2 text-red-500 focus-visible:ring-red-500 border-2 border-red-500'
                  : ''
              }
            />
          </div>
          <DialogFooter>
            <Button onClick={makeDel}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
