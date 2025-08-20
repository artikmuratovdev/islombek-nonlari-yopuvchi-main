import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTrigger,
} from "@/components/ui/sheet";
import { useUpdatePasswordMutation } from "@/integration/api/authApi";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { MdLock } from "react-icons/md";

interface PasswordForm {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}


export const ChangePassword = () => {
    const [updatePassword, { isLoading }] = useUpdatePasswordMutation()
    const { control, handleSubmit, formState: { errors } } = useForm<PasswordForm>({
        defaultValues: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '' 
        }
    });

    const onSubmit: SubmitHandler<PasswordForm> = async (data) => {
        try {
            const response = await updatePassword({ oldPassword: data.oldPassword, newPassword: data.newPassword, confirmPassword: data.confirmPassword })
            console.log(response);

        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <Sheet>
                <SheetTrigger className="w-full">
                    <div className="rounded-[8px] p-[10px] bg-white flex items-center gap-[7px] ">
                        <MdLock size={25} />
                        <p className="text-[14px] font-[900]">Profil parolini o'zgartirish</p>
                    </div>
                </SheetTrigger>
                <SheetContent
                    side="bottom"
                    className="bg-[#1C2C57] border-none rounded-t-[20px]"
                >
                    <SheetHeader className="border-2 border-[#FFCC15] rounded-[12px] p-[15px]">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Controller
                                name="oldPassword"
                                control={control}
                                rules={{ required: "Eski parol kiritish majburiy!" }}
                                render={({ field }) => (
                                    <Input {...field} placeholder="Eski parol" type="password" className="outline-none w-full mt-2" />
                                )}
                            />
                            {errors.oldPassword && <p className="text-red-500 text-sm">{errors.oldPassword.message}</p>}

                            <Controller
                                name="newPassword"
                                control={control}
                                rules={{ required: "Yangi parol kiritish majburiy!" }}
                                render={({ field }) => (
                                    <Input {...field} placeholder="Yangi parol" type="password" className="outline-none w-full mt-2" />
                                )}
                            />
                            {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword.message}</p>}

                            <Controller
                                name="confirmPassword"
                                control={control}
                                rules={{ required: "Parolni tasdiqlash majburiy!" }}
                                render={({ field }) => (
                                    <Input {...field} placeholder="Parolni tasdiqlash" type="password" className="outline-none w-full mt-2" />
                                )}
                            />
                            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}

                            <Button
                                type="submit"
                                variant={"yellow"}
                                className="text-[16px] font-[600] ml-auto mt-[15px] w-full"
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