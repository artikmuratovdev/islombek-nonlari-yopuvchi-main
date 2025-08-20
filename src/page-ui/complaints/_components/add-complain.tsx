
import { SelectUser } from "@/components"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useCreateComplaintMutation, useGetUsersQuery } from "@/integration/api"
import { Plus } from "lucide-react"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"


type ComplaintFormData = {
    content: string;
};

export const AddComplain = () => {
    const { data: getUsers, isLoading: gteUsersLoading } = useGetUsersQuery(["CEO", "ADMIN", "DRIVER", "SUPLIER", "DOUGHMAKER", "DISPETCHER", "CUSTOMER"])
    const [createComplaint] = useCreateComplaintMutation()
    const [id, setId] = useState("")
    const [open, setOpen] = useState(false)

    const { register, handleSubmit, formState: { errors }, reset } = useForm<ComplaintFormData>();

    const onSubmit: SubmitHandler<ComplaintFormData> = async (data) => {
        try {
            await createComplaint({ to: id, content: data.content }).unwrap();
            reset({ content: "" });
            setOpen(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger>
                    <div className="bg-[#FFCC15] rounded-full p-[12px] fixed bottom-[20px] right-[20px] cursor-pointer"onClick={() => setOpen(true)}>
                        <Plus size={25} />
                    </div>
                </SheetTrigger>
                <SheetContent side='bottom' className="bg-[#1C2C57] border-none rounded-t-[20px]">
                    <SheetHeader className="border-2 border-[#FFCC15] rounded-[12px] p-[15px]">
                        <SelectUser
                            title="Shikoyat qo'shish"
                            className="#1C2C57 text-[16px] font-[600] bg-white border border-[#FFCC15]"
                            userData={getUsers}
                            isLoading={gteUsersLoading}
                            setId={setId}
                        />
                        <textarea
                            {...register("content", { required: true })}
                            placeholder="Shikoyat yozing..."
                            className="border-none mt-[15px] p-2 outline-none rounded-[8px]"
                        ></textarea>
                        {errors.content && (
                            <p className="text-red-500 text-sm">Shikoyat yozish shart!</p>
                        )}
                        <Button
                            variant={"yellow"}
                            className="text-[16px] font-[600] ml-auto mt-[7px]"
                            onClick={handleSubmit(onSubmit)}
                        >
                            Yuborish
                        </Button>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    )
}
