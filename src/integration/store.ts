import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { baseApi } from "./api";
import expenseSlice from './slice/expenseSlice'
import sotuvSlice from './slice/sotuv.slice'

export const store = configureStore({
  reducer: { [baseApi.reducerPath]: baseApi.reducer ,
    expense: expenseSlice,
    sotuv: sotuvSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

setupListeners(store.dispatch); 

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
