import { baseApi } from '../baseApi';
import { PATHS } from './path';

export const OrderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPreOrders : build.query<GetOrdersResponse[], void>({
      query: () => ({
        url: PATHS.GET_PRE_ORDERS,
        method: 'GET',
      })
    }),
    getBreadPrice : build.query<BreadsInfo[], void>({
      query: () => ({
        url: PATHS.BREAD_PRICE,
        method: 'GET',
      })
    }),
    createOrder : build.mutation<CreateOrdersResponse, CreateOrdersRequest>({
      query: (body) => ({
        url: PATHS.CREATE_ORDER,
        method: 'POST',
        body
      })
    }),
    getOrder : build.query<GetOrdersResponse, string>({
      query: (id) => ({
        url: PATHS.GET_PRE_ORDER+id,
        method: 'GET',
      })
    }),
    editOrder : build.mutation<CreateOrdersResponse, EditOrderRequest>({
      query: ({id, body}) => ({
        url: PATHS.EDIT_ORDER+id,
        method: 'PATCH',
        body
      })
    }),
    submitOrder : build.mutation<CreateOrdersResponse, [string,string]>({
      query: ([id,bakerRoom]) => ({
        url: PATHS.BASE_ORDER + bakerRoom + '/' + PATHS.SUBMIT_ORDER+id,
        method: 'POST',
      })
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
