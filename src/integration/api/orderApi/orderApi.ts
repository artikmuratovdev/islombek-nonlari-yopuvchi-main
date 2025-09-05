import { API_TAGS } from '@/constants';
import { baseApi } from '../baseApi';
import { PATHS } from './path';

export const OrderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPreOrders : build.query<GetOrdersResponse[], void>({
      query: () => ({
        url: PATHS.GET_PRE_ORDERS,
        method: 'GET',
      }),
      providesTags: [API_TAGS.ORDER],
    }),
    getBreadPrice : build.query<BreadsInfo[], void>({
      query: () => ({
        url: PATHS.BREAD_PRICE,
        method: 'GET',
      }),
      providesTags: [API_TAGS.ORDER],
    }),
    createOrder : build.mutation<CreateOrdersResponse, CreateOrdersRequest>({
      query: (body) => ({
        url: PATHS.CREATE_ORDER,
        method: 'POST',
        body
      }),
      invalidatesTags: [API_TAGS.ORDER],
    }),
    getOrder : build.query<GetOrdersResponse, string>({
      query: (id) => ({
        url: PATHS.GET_PRE_ORDER+id,
        method: 'GET',
      }),
      providesTags: [API_TAGS.ORDER],
    }),
    editOrder : build.mutation<CreateOrdersResponse, EditOrderRequest>({
      query: ({id, bakerRoomId , body}) => ({
        url: PATHS.BASE_ORDER + bakerRoomId + PATHS.EDIT_ORDER+id,
        method: 'PATCH',
        body
      }),
      invalidatesTags: [API_TAGS.ORDER],
    }),
    submitOrder : build.mutation<CreateOrdersResponse, [string,string]>({
      query: ([id,bakerRoom]) => ({
        url: PATHS.BASE_ORDER + bakerRoom + '/' + PATHS.SUBMIT_ORDER+id,
        method: 'POST',
      }),
      invalidatesTags: [API_TAGS.ORDER],
    })
  }),
});

export const {
  useGetPreOrdersQuery,
  useGetBreadPriceQuery,
  useCreateOrderMutation,
  useGetOrderQuery,
  useEditOrderMutation,
  useSubmitOrderMutation
} = OrderApi;
