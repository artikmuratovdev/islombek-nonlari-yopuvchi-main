import { useHandleError } from "../use-handle-error";
import { Params } from "./types";

export const useHandleRequest = () => {
  const handleError = useHandleError();

  return async ({ request, onSuccess, onError }: Params) => {
    try {
      const result = await request();

      // faqat error obyektini aniq olish
      const errors =
        result?.error?.data?.errors ??
        result?.error?.data ??
        result?.error?.msg ??
        result?.error ??
        result?.errors?.data?.errors ??
        result?.errors?.data ??
        result?.errors ??
        result?.message ??
        null;

      if (errors) {
        if (typeof onError === "function") {
          onError(errors);
        } else {
          handleError(errors);
        }
        return; // error bo‘lsa success ishlamasin
      }

      if (typeof onSuccess === "function") {
        await onSuccess(result);
      }
    } catch (ex) {
      handleError(ex);
    }
  };
};
