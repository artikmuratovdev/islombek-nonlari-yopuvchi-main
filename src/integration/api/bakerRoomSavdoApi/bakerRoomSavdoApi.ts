import { API_TAGS } from "@/constants";
import { baseApi } from "../baseApi";
import {
  addBakerRoomBreadSaleRequest,
  BakerRoomBreadSaleResponse,
  breadInfo,
} from "./types";

export const bakerRoomSavdoApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getBakerRoomBreadSales: build.query<
      BakerRoomBreadSaleResponse[],
      { id: string; startDate: string; endDate: string }
    >({
      query: (params) => ({
        url: `/baker-room-bread-sale/${params.id}/get-all-sale`,
        method: "GET",
        params:{
          startDate: params.startDate,
          endDate: params.endDate
        },
      }),
      providesTags: [API_TAGS.BAKER_ROOM_BREAD_SALES],
    }),
    getBakerRoomBreadSale: build.query<
      BakerRoomBreadSaleResponse,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/baker-room-bread-sale/get-sale/${id}`,
        method: "GET",
      }),
      providesTags: [API_TAGS.BAKER_ROOM_BREAD_SALES],
    }),
    getBakerRoomBreadSaleBreadPrices: build.query<
      breadInfo[],
      void
    >({
      query: () => ({
        url: "/baker-room-bread-sale/bread-prices",
        method: "GET",
      }),
      providesTags: [API_TAGS.BAKER_ROOM_BREAD_SALES],
    }),
    addBakerRoomBreadSale: build.mutation<
    {message:string,sale:BakerRoomBreadSaleResponse},
       addBakerRoomBreadSaleRequest
    >({
      query: ({ id, body }) => ({
        url: `/baker-room-bread-sale/${id}/create-sale`,
        method: "POST",
        body,
      }),
      invalidatesTags: [API_TAGS.BAKER_ROOM_BREAD_SALES],
    }),
    editaddBakerRoomBreadSale: build.mutation<
      BakerRoomBreadSaleResponse,
      {
        id: string;
        bakerRoomId: string;
        body: {
          breadsInfo: {
            _id: string;
            title: string;
            breadPrice: number;
            breadSoldPrice: number;
            amount: number;
          }[];
        };
      }
    >({
      query: ({ id, bakerRoomId, body }) => ({
        url: `/baker-room-bread-sale/${bakerRoomId}/sale/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [API_TAGS.BAKER_ROOM_BREAD_SALES],
    }),
    deleteBakerRoomBreadSales: build.mutation<
      BakerRoomBreadSaleResponse,
      string
    >({
      query: (id) => ({
        url: `/baker-room-bread-sale/sale/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [API_TAGS.BAKER_ROOM_BREAD_SALES],
    }),
  }),
});

export const {
  useGetBakerRoomBreadSalesQuery,
  useLazyGetBakerRoomBreadSalesQuery,
  useGetBakerRoomBreadSaleQuery,
  useGetBakerRoomBreadSaleBreadPricesQuery,
  useAddBakerRoomBreadSaleMutation,
  useEditaddBakerRoomBreadSaleMutation,
  useDeleteBakerRoomBreadSalesMutation,
} = bakerRoomSavdoApi;