import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetReasonsQuery } from '@/integration/api/reasonApi';
import { cn } from '@/lib/utils';
import { FC } from 'react';

interface SelectProps {
  className?: string;
  title?: string;
  setId: (id: string) => void;
  disabled?: boolean;
}

export const SelectReasons: FC<SelectProps> = ({
  className,
  setId,
  title,
  disabled = false,
}) => {
  const { data: getReasons } = useGetReasonsQuery({});

  return (
    <Select
      aria-label='Select User'
      onValueChange={(value) => {
        if (!disabled) setId(value);
      }}
      disabled={disabled}
    >
      <SelectTrigger
        aria-haspopup='listbox'
        aria-expanded='false'
        aria-labelledby='select-label'
        className={cn('w-full', className)}
        disabled={disabled}
      >
        <SelectValue id='select-label' placeholder={title} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup role='group'>
          {getReasons?.map((item) => (
            <SelectItem
              key={item._id}
              value={item._id}
              onClick={() => !disabled && setId(item?._id)}
              className='text-[#1C2C57] text-[16px] font-semibold line-clamp-1'
              role='option'
            >
              {item?.content}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
