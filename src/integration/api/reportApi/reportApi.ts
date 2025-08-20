import { API_TAGS } from "@/constants/ApiTags";
import { baseApi } from "../baseApi";
import { PATHS } from "./paths";
import { CreateReportRequest, CreateReportResponse, GetReportResponse } from "./types";

export const ReportApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getReport: build.query<GetReportResponse[], object>({
            query: () => ({
                url: PATHS.REPORT,
                method: "GET",
            }),
            providesTags: [API_TAGS.REPORT]
        }),
        createReport: build.mutation<CreateReportResponse, CreateReportRequest>({
            query: ({ expected, actual, comment, receiver }) => ({
                url: PATHS.REPORT,
                method: "POST",
                body: { expected, actual, comment, receiver },
            }),
            invalidatesTags: [API_TAGS.REPORT]
        }),
        updateReport: build.mutation<GetReportResponse, { id: string, body: CreateReportRequest }>({
            query: ({ id, body }) => ({
                url: `${PATHS.REPORT}/${id}`,
                method: "PATCH",
                body
            }),
            invalidatesTags: [API_TAGS.REPORT]
        }),
        deleteReport: build.mutation<CreateReportResponse, string>({
            query: (id) => ({
                url: `${PATHS.REPORT}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [API_TAGS.REPORT]
        })
    })
})

export const { useGetReportQuery, useCreateReportMutation, useUpdateReportMutation, useDeleteReportMutation } = ReportApi