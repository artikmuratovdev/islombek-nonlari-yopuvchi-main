/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import toast from "react-hot-toast";

interface UseHandleRequestOptions<T = any> {
  request: () => Promise<T>;
  successMessage?: string;
  errorMessage?: string;
  onSuccess?: (data: T) => void;
  onError?: (error: any) => void;
}

export const useHandleRequest = () => {
  const [loading, setLoading] = useState(false);

  const handleRequest = async <T>({
    request,
    successMessage = "Muvaffaqiyatli bajarildi!",
    errorMessage = "Xatolik yuz berdi!",
    onSuccess,
    onError,
  }: UseHandleRequestOptions<T>) => {
    let toastId: string | undefined;

    try {
      setLoading(true);
      toastId = toast.loading("Yuklanmoqda...");

      const data = await request();

      toast.success(successMessage, { id: toastId });
      onSuccess?.(data);

      return data;
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || errorMessage, { id: toastId });
      onError?.(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleRequest,
  };
};
