import { API_TAGS } from "@/constants/ApiTags";
import { baseApi } from "../baseApi";
import { PATHS } from "./paths";

export const ComplaintApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createComplaint: build.mutation<CreateComplaintResponse, CreateComplaintRequest>({
            query: ({to, content}) => ({
                url: PATHS.COMPLAINT,
                method: "POST",
                body: {to, content},
            }),
            invalidatesTags: [API_TAGS.COMPLAINT, API_TAGS.USER]
        }),
        getAllComplaints: build.query<GetComplaintsResponse[], GetComplaintsRequest>({
            query: () => ({
                url: PATHS.COMPLAINT,
                method: "GET",
            }),
            providesTags: [API_TAGS.COMPLAINT]
        })
    }),
})

export const { useCreateComplaintMutation, useGetAllComplaintsQuery } = ComplaintApi;