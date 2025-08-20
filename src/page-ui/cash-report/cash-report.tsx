import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

import { MoneyFormatter } from "@/utils/money-formatter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ForWork, Salary } from "./_components";
import { CloseCheckout } from "./_components/close-checkout";
import { Title } from "@/components";
import { AddReport } from "./_components/add-report";
import { RootState } from "@/integration";
import { useGetAllExpenseQuery } from "@/integration/api/expenseApi";
import { GetExpensesResponse } from "@/integration/api/expenseApi/types";
import { useSelector } from "react-redux";

export const CashReport = () => {
  const {bakerRoomId,balance} = useSelector((state: RootState) => state.expense)
  const {data:expenses} = useGetAllExpenseQuery(bakerRoomId as string)

  const for_work = expenses?.filter(expense => (expense.expense_type === 'for_work' && expense))
  const for_salary = expenses?.filter(expense => (expense.expense_type === 'for_salary' && expense))
  
  console.log(expenses);

  return (
    <div>
      <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[12px] pt-[20px] -ml-[20px] fixed top-0 w-full">
        <div className="flex justify-between items-center">
          <Link to={"/"}>
            <IoArrowBack
              size={25}
              className="bg-[#FFCC15] text-[#1C2C57] rounded-full p-1 shrink-0 cursor-pointer"
            />
          </Link>
          <Title text={"Kassa hisoboti"} className="text-white mx-auto" />
        </div>
      </div>

      <div className="mt-[70px]">
        <div className="rounded-[8px] bg-white p-3 px-5 border-[1px] border-[#FFCC15] flex items-center justify-between text-[16px] text-[#1C2C57] font-[600]">
          <p>Balance</p>
          <p>{MoneyFormatter(String(balance as number))}</p>
        </div>
      </div>

      <Tabs defaultValue="for-work" className="w-full mt-8">
        <TabsList className="grid grid-cols-2 bg-white text-[15px] font-[700] text-[#1C2C57] mb-11">
          <TabsTrigger value="for-work" className="py-[7px]">
            Ish uchun
          </TabsTrigger>
          <TabsTrigger value="salary" className="py-[7px]">
            Ish haqi
          </TabsTrigger>
        </TabsList>
        <TabsContent value="for-work">
          <ForWork items={for_work as GetExpensesResponse[]} />
        </TabsContent>
        <TabsContent value="salary">
          <Salary items={for_salary as GetExpensesResponse[]} />
        </TabsContent>
      </Tabs>

      <AddReport />
      <CloseCheckout />
    </div>
  );
};
