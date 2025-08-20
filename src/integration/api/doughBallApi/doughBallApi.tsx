import { API_TAGS } from "@/constants";
import { baseApi } from "../baseApi";
import { DoughBallResponse } from "./types";

export const doughBallApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getDoughs: build.query<DoughBallResponse[], { id: string }>({
      query: ({ id }) => ({
        url: `/dough-ball/all-dough-ball/${id}`,
        method: "GET",
      }),
      providesTags: [API_TAGS.DOUGH_BALL],
    }),
    patchDoughs: build.mutation<DoughBallResponse, { id: string }>({
      query: ({ id }) => ({
        url: `/dough-ball/${id}/put-oven`,
        method: "PATCH",
      }),
      invalidatesTags: [API_TAGS.DOUGH_BALL],
    }),
  }),
});

export const { useGetDoughsQuery, usePatchDoughsMutation } = doughBallApi;
