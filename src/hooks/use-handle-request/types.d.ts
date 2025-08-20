/* eslint-disable @typescript-eslint/no-explicit-any */
export type Params = {
  request: () => Promise<any>;
  onSuccess?: (data: any) => void | Promise<void>;
  onError?: (err: any) => void;
};
