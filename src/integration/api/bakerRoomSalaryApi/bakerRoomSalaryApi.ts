/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_TAGS } from "@/constants";
import { baseApi } from "../baseApi";
import { BakerRoomSalaryResponse } from "./types";

export const bakerRoomSalaryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getBakerRoomSalary: build.query<BakerRoomSalaryResponse, { id: string }>({
      query: ({ id }) => {
        return {
          url: `/baker-room-salary/${id}`,
          method: "GET",
        };
      },
      providesTags: [API_TAGS.BAKER_ROOM_SALARY],
    }),
    addBakerRoomSalaryDailyWorker: build.mutation<
      any,
      { id: string; body: { user: string } }
    >({
      query: ({ id, body }) => {
        return {
          url: `/baker-room-salary/daily-worker-salary-baker-room/${id}/add-baker`,
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: [API_TAGS.BAKER_ROOM_SALARY],
    }),
    SalaryBakerRoomSalaryDailyWorker: build.mutation<
      any,
      { id: string; body: { user: string; salary: number } }
    >({
      query: ({ id, body }) => {
        return {
          url: `/baker-room-salary/daily-worker-salary-baker-room/${id}/add-baker-salary`,
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: [API_TAGS.BAKER_ROOM_SALARY],
    }),
  }),
});

export const {
  useGetBakerRoomSalaryQuery,
  useAddBakerRoomSalaryDailyWorkerMutation,
  useSalaryBakerRoomSalaryDailyWorkerMutation,
} = bakerRoomSalaryApi;
