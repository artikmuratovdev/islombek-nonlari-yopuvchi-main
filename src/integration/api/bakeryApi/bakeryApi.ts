import { API_TAGS } from '@/constants/ApiTags';
import { baseApi } from '../baseApi';
import { PATHS } from './paths';
import {
  BakerRoomIdInOvenBreadsResponse,
  BakerRoomIdQolganBreadsResponse,
  BakerRoomIdTayyorBreadsResponse,
  BakeryBakeRequest,
  BakeryBakeResponse,
  BakeryBreadsRequest,
  BakeryBreadsResponse,
  BakeryDivideRequest,
  BakeryDivideResponse,
  BakeryDoughResponse,
  BakeryDoughsRequest,
  BakeryRedirectRequest,
  BakeryRedirectResponse,
  BakeryResponse,
} from './types';

export const BakeryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    bakery: build.query<BakeryResponse[], object>({
      query: () => ({
        url: PATHS.BAKERY,
        method: 'GET',
      }),
      providesTags: [API_TAGS.BAKERY],
    }),
    singleBakery: build.query<BakeryResponse, { id: string }>({
      query: ({ id }) => ({
        url: `${PATHS.BAKERY}/${id}`,
        method: 'GET',
      }),
      providesTags: [API_TAGS.BAKERY],
    }),
    bakeryDoughs: build.query<BakeryDoughResponse[], BakeryDoughsRequest>({
      query: ({ bakeryId, status }) => ({
        url: PATHS.BAKERY_DOUGHES,
        params: { bakery: bakeryId, status },
        method: 'GET',
      }),
      providesTags: [API_TAGS.BAKERY],
    }),
    bakeryBreads: build.query<BakeryBreadsResponse, BakeryBreadsRequest>({
      query: ({ bakeryId, breadStatus, doughStatus }) => ({
        url: PATHS.BAKERY_BREADS,
        params: { bakery: bakeryId, breadStatus, doughStatus },
        method: 'GET',
      }),
      providesTags: [API_TAGS.BAKERY],
    }),
    bakeryDivide: build.mutation<BakeryDivideResponse[], BakeryDivideRequest>({
      query: (data) => ({
        url: PATHS.BAKERY_DIVIDE,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [API_TAGS.BAKERY],
    }),
    bakeryBake: build.mutation<BakeryBakeResponse[], BakeryBakeRequest>({
      query: ({ dough, baked, baker }) => ({
        url: PATHS.BAKERY_BAKE,
        method: 'POST',
        body: { dough, baked, baker },
      }),
      invalidatesTags: [API_TAGS.BAKERY],
    }),
    bakeryRedirect: build.mutation<
      BakeryRedirectResponse[],
      BakeryRedirectRequest
    >({
      query: ({ dough, driver }) => ({
        url: PATHS.BAKERY_REDIRECT,
        method: 'POST',
        body: { dough, driver },
      }),
      invalidatesTags: [API_TAGS.BAKERY],
    }),
    getBakerRoom: build.query<BakeryResponse, { id: string }>({
      query: ({ id }) => ({
        url: PATHS.BAKERY_ID + `${id}`,
        method: 'GET',
      }),
      providesTags: [API_TAGS.BAKERY],
    }),
    getBakerRoomIdInOvenBreads: build.query<
      BakerRoomIdInOvenBreadsResponse,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/baker-room/${id}/in-oven-breads`,
        method: 'GET',
      }),
      providesTags: [API_TAGS.BAKERY],
    }),
    patchBakerRoomIdInOvenBreads: build.mutation<
      BakeryResponse,
      { id: string; body: { count: number } }
    >({
      query: ({ id, body }) => ({
        url: `/baker-room/${id}/in-oven-breads`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [API_TAGS.BAKERY],
    }),
    getBakerRoomIdTayyorBreadsTimes: build.query<
      {
        count: number;
        createdAt: string;
        doughType: { _id: string; title: string };
        updatedAt: string;
        _id: string;
      }[],
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/baker-room/${id}/tayyor-nonlar-vaqtlari`,
        method: 'GET',
      }),
      providesTags: [API_TAGS.BAKERY],
    }),
    getBakerRoomIdTayyorBreads: build.query<
      BakerRoomIdTayyorBreadsResponse,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/baker-room/${id}/tayyor-nonlar`,
        method: 'GET',
      }),
      providesTags: [API_TAGS.BAKERY],
    }),
    getBakerRoomIdQolganBreads: build.query<
      BakerRoomIdQolganBreadsResponse,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/baker-room/${id}/qolgan-nonlar`,
        method: 'GET',
      }),
      providesTags: [API_TAGS.BAKERY],
    }),
    getBakerRoomIdKelganBreads: build.query<
      {
        breadCount: number;
        driver: { _id: string; fullName: string };
        breadInfo: { _id: string; title: string };
        _id: string;
        createdAt: string;
        updatedAt: string;
      }[],
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/baker-room/${id}/keltirilgan-nonlar`,
        method: 'GET',
      }),
      providesTags: [API_TAGS.BAKERY],
    }),
  }),
});

export const {
  useBakeryQuery,
  useSingleBakeryQuery,
  useLazyBakeryDoughsQuery,
  useLazyBakeryBreadsQuery,
  useBakeryDoughsQuery,
  useBakeryBreadsQuery,
  useBakeryDivideMutation,
  useBakeryBakeMutation,
  useBakeryRedirectMutation,
  //   --------------------
  useGetBakerRoomQuery,
  useGetBakerRoomIdInOvenBreadsQuery,
  usePatchBakerRoomIdInOvenBreadsMutation,
  useGetBakerRoomIdTayyorBreadsTimesQuery,
  useGetBakerRoomIdTayyorBreadsQuery,
  useGetBakerRoomIdQolganBreadsQuery,
  useGetBakerRoomIdKelganBreadsQuery,
} = BakeryApi;
