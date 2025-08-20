import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTrigger,
} from "@/components/ui/sheet";
import { useUpdateProfileMutation } from "@/integration/api/authApi";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FaRegEdit } from "react-icons/fa";
import { FormData } from "../types";


export const EditUserName = ({ userID }: { userID: string | undefined }) => {
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            fullName: '',
        }
    });
    const [updateProfile, { isLoading, }] = useUpdateProfileMutation();

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        try {
            await updateProfile({ id: userID as string, body: { fullName: data.fullName } }).unwrap();
        } catch (err) {
            console.error("Xatolik yuz berdi", err);
        }
    };
    return (
        <div>
            <Sheet>
                <SheetTrigger className="w-full">
                    <div className="rounded-[8px] p-[10px] bg-white flex items-center gap-[7px] ">
                        <FaRegEdit size={25} />
                        <p className="text-[14px] font-[900]">Usernameni o'zgartirish</p>
                    </div>
                </SheetTrigger>
                <SheetContent
                    side="bottom"
                    className="bg-[#1C2C57] border-none rounded-t-[20px]"
                >
                    <SheetHeader className="border-2 border-[#FFCC15] rounded-[12px] p-[15px]">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Controller
                                name="fullName"
                                control={control}
                                rules={{ required: "Ism kiritish majburiy!" }}
                                render={({ field }) => (
                                    <Input {...field} placeholder="Usernameni o'zgartirish" type="text" className="outline-none w-full" />
                                )}
                            />
                            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
                            <Button
                                type="submit"
                                variant="yellow"
                                className="text-[16px] font-[600] w-full mt-[15px]"
                                disabled={isLoading}
                            >
                                {isLoading ? "Saqlanmoqda..." : "Saqlash"}
                            </Button>
                        </form>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    )
}