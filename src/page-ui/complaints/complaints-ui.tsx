import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { AddComplain } from "./_components"
import { Link } from "react-router-dom"
import { IoArrowBack } from "react-icons/io5"
import { Loader, Title } from "@/components"
import { useGetAllComplaintsQuery, useProfileQuery } from "@/integration/api"

export const ComplaintsUI = () => {
    const { data: getAllComplaints, isLoading } = useGetAllComplaintsQuery({})
    const { data: profile } = useProfileQuery({})

    return (
        <div>
            <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[12px] pt-[20px] -ml-[20px] fixed top-0 w-full">
                <div className="flex justify-between items-center">
                    <Link to={'/'}>
                        <IoArrowBack
                            size={25}
                            className="bg-[#FFCC15] text-[#1C2C57] rounded-full p-1 shrink-0 cursor-pointer"
                        />
                    </Link>
                    <Title text={"Shikoyatlar"} className="text-white mx-auto" />
                </div>
            </div>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger className="text-[24px] font-[600] text-white">Kelib tushgan shikoyatlar</AccordionTrigger>
                    <AccordionContent className="h-[400px] overflow-y-auto">
                        <div className="space-y-3">
                            {isLoading && <Loader className="mx-auto size-[50px]" />}
                            {getAllComplaints?.filter((item) => item?.to?._id === profile?._id).length === 0 && <div className="text-center text-white text-[16px] py-[20px] font-semibold">Kelib tushgan shikoyatlar yo'q</div>}
                            {getAllComplaints?.map(({ from, to, content }, i) => {
                                if (to?._id == profile?._id) {
                                    return (
                                        <div key={i} className="border-[1px] rounded-[8px] bg-white border-[#FFCC15] p-[10px] text-[#1C2C57]">
                                            <p className="text-[16px] font-[800]">{from?.fullName}</p>
                                            <p className="text-[14px] font-[700] py-[10px] break-words">{content}</p>
                                            <p className="text-[16px] font-[800] text-[#C71A1A] w-full text-end">{to?.fullName}</p>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <Accordion type="single" collapsible >
                <AccordionItem value="item-1">
                    <AccordionTrigger className="text-[24px] font-[600] text-white">Yuborilganlar</AccordionTrigger>
                    <AccordionContent className="">
                        <div className="space-y-3 h-[400px] overflow-y-auto">
                            {isLoading && <Loader className="mx-auto size-[50px]" />}
                            {getAllComplaints?.filter((item) => item?.from?._id === profile?._id).length === 0 && <div className="text-center text-white text-[16px] py-[20px] font-semibold">Yuborilgan shikoyatlar yo'q</div>}
                            {getAllComplaints?.map(({ from, to, content }, i) => {
                                if (from?._id == profile?._id) {
                                    return (
                                        <div key={i} className="border-[1px] rounded-[8px] bg-white border-[#FFCC15] p-[10px] text-[#1C2C57]">
                                            <p className="text-[16px] font-[800]">{to?.fullName}</p>
                                            <p className="text-[14px] font-[700] py-[10px] break-words">{content}</p>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <AddComplain />
        </div>
    )
}