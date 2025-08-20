import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { FC , forwardRef} from "react"
import { Loader } from "./loader"

interface SelectProps {
    userData: GetAllUsersResponse[] | undefined
    className?: string
    title?: string
    setId: (id: string) => void,
    isLoading?: boolean
    disabled?: boolean
    selectedUser?: string
}

export const SelectUser = forwardRef<HTMLButtonElement, SelectProps>(
  (
    { userData, className, setId, title = "Chat qo'shish", isLoading, disabled, selectedUser },
    ref
  ) => {
    console.log("Default selected user", selectedUser);

    return (
      <Select
        aria-label="Select User"
        disabled={disabled}
        onValueChange={(value) => {
          setId(value);
        }}
        defaultValue={selectedUser}
      >
        <SelectTrigger
          ref={ref}
          aria-haspopup="listbox"
          aria-expanded="false"
          aria-labelledby="select-label"
          className={cn("w-full", className)}
        >
          <SelectValue id="select-label" placeholder={title} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup role="group">
            {isLoading && <Loader className="mx-auto size-[50px]" />}
            {userData?.map((item) => (
              <SelectItem
                key={item._id}
                value={item._id}
                onClick={() => setId(item?._id)}
                className="text-[#1C2C57] text-[16px] font-semibold"
                role="option"
              >
                {item?.fullName}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }
);

SelectUser.displayName = "SelectUser";



export const SelectReason: FC<SelectProps> = ({ userData, className, setId, title="Chat qo'shish", isLoading }) => {

    return (
        <Select aria-label="Select User"
            onValueChange={(value) => {
                setId(value);
            }}
        >
            <SelectTrigger aria-haspopup="listbox" aria-expanded="false" aria-labelledby="select-label" className={cn("w-full", className)}>
                <SelectValue id="select-label" placeholder={title} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup role="group">
                    {isLoading && <Loader className="mx-auto size-[50px]"/>}
                    {userData?.map((item) => (
                        <SelectItem
                            key={item._id}
                            value={item._id}
                            onClick={() => setId(item?._id)}
                            className="text-[#1C2C57] text-[16px] font-semibold"
                            role="option"
                        >
                            {item?.fullName}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>

    )
}