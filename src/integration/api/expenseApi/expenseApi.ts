import { API_TAGS } from '@/constants/ApiTags';
import { baseApi } from '../baseApi';
import { PATHS } from './paths';
import {
  CloseCash,
  CloseCashRes,
  CreateExpenseRequest,
  CreateExpenseResponse,
  EditExpensesRequest,
  GetExpensesResponse,
} from './types';

export const ExpenseApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllExpense: build.query<GetExpensesResponse[], string>({
      query: (bakerRoomId) => ({
        url: PATHS.ALL_EXPENSES + bakerRoomId,
        method: 'GET',
      }),
      providesTags: [API_TAGS.EXPENSE],
    }),
    createExpenses: build.mutation<CreateExpenseResponse,CreateExpenseRequest>({
      query: (body) => ({
        url: PATHS.CREATE_EXPENSE,
        method: 'POST',
        body
      }),
      invalidatesTags: [API_TAGS.EXPENSE],
    }),
    deleteExpense: build.mutation<CreateExpenseResponse, string>({
      query: (id) => ({
        url: PATHS.EXPENSES + id,
        method: 'DELETE',
      }),
      invalidatesTags: [API_TAGS.EXPENSE],
    }),
    editExpense : build.mutation<CreateExpenseResponse, EditExpensesRequest>({
      query: ({id, body}) => ({
        url: PATHS.EXPENSES + id,
        method: 'PATCH',
        body
      }),
      invalidatesTags: [API_TAGS.EXPENSE],
    }),
    closeCash : build.mutation<CloseCashRes,CloseCash>({
      query: (body) => ({
        url: PATHS.CLOSE_EXPENSE,
        method: 'POST',
        body
      }),
      invalidatesTags: [API_TAGS.EXPENSE],
    })
  }),
});

export const { useGetAllExpenseQuery , useCreateExpensesMutation, useDeleteExpenseMutation, useEditExpenseMutation, useCloseCashMutation} = ExpenseApi;
