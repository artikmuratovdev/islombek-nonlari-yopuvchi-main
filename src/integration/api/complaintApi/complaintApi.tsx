import {
  ComplaintRequest,
  ComplaintResponse,
  MyComplaintsResponse,
  ReceivedComplaintsResponse,
} from "./types";
import { PATHS } from "./paths";
import { baseApi } from "../baseApi";
import { API_TAGS } from "@/constants";

export const complaintApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMyComplaints: build.query<MyComplaintsResponse[], void>({
      query: () => ({
        url: PATHS.MY_COMPLAINT,
        method: "GET",
      }),
      providesTags: [API_TAGS.COMPLAINTS],
    }),
    getReceivedComplaints: build.query<ReceivedComplaintsResponse[], void>({
      query: () => ({
        url: PATHS.RECEIVED_COMPLAINTS,
        method: "GET",
      }),
      providesTags: [API_TAGS.COMPLAINTS],
    }),
    createComplaint: build.mutation<ComplaintResponse, ComplaintRequest>({
      query: (body) => ({
        url: PATHS.COMPLAINT,
        method: "POST",
        body,
      }),
      invalidatesTags: [API_TAGS.COMPLAINTS],
    }),
  }),
});

export const {
  useGetMyComplaintsQuery,
  useGetReceivedComplaintsQuery,
  useCreateComplaintMutation,
} = complaintApi;
