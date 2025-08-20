/* eslint-disable @typescript-eslint/no-explicit-any */
export const useErrorMsg = () => {
  return (error: any) =>
    typeof error === "string"
      ? error
      : typeof error === "object"
      ? error?.msg ||
        error?.msg ||
        error?.error?.msg ||
        error?.error?.msg ||
        error?.data?.error?.msg ||
        "errors.unknown"
      : "errors.unknown";
};
