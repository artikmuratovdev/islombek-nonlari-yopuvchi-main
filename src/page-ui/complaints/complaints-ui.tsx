import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Arrived, Sent, SentMessage } from "./components";
import { BottomSheet } from "@/components/common/bottom-sheet";
import { ArrowLeft, PlusIcon } from "lucide-react";
import { BiNotification } from "react-icons/bi";
export const ComplaintsUI = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <section className="h-screen bg-blue-950 flex flex-col">
      <header className="py-3 border-b border-yellow-400 rounded-b-4xl flex justify-between items-center px-4">
        <button
          className="bg-yellow-400 rounded-full p-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="text-black w-3 h-3" />
        </button>
        <div className="flex flex-col items-center">
          <h4 className="text-center justify-center text-white text-2xl font-semibold">
            Shikoyatlar
          </h4>
        </div>
        <button onClick={() => navigate("/notifications")}>
          <BiNotification className="text-yellow-400" />
        </button>
      </header>

      <main className="flex-1 overflow-y-auto px-5 mt-5 pb-28 hide-scrollbar">
        <Arrived />
        <Sent />
      </main>

      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-[44px] right-5 h-10 p-3 bg-[#ffcb15] rounded-[20px] justify-center items-center gap-1 inline-flex text-[#1C2C57] hover:bg-[#ffcb15]"
      >
        <PlusIcon />
      </button>

      <BottomSheet
        children={<SentMessage setOpen={setOpen} />}
        open={open}
        setOpen={setOpen}
      />
    </section>
  );
};
