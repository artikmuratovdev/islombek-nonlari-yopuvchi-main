import { toast } from "react-hot-toast";
import { useErrorMsg } from "../use-error-msg";

export const useHandleError = () => {
  const getErrorMsg = useErrorMsg();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (error: any) => {
    toast.error(
      getErrorMsg(error.data.message) || "Noma'lum xatolik yuz berdi"
    );
  };
};
