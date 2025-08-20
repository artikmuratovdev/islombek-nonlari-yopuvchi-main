import { API_TAGS } from "@/constants/ApiTags";
import { baseApi } from "../baseApi";
import { PATHS } from "./path";

export const MessageApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        sendMessage: build.mutation<SendMessageResponse, SendMessageRequest>({
            query: (body) => ({
                url: PATHS.MESSAGE,
                method: "POST",
                body,
            }),
            invalidatesTags: [API_TAGS.MESSAGE]
        }),
        getMessages: build.query<GetMessagesResponse[], object>({
            query: () => ({
                url: PATHS.MESSAGE,
                method: "GET",
            }),
            providesTags: [API_TAGS.MESSAGE]
        }),
        getMessage: build.query<GetMessageResponse[], { id: string }>({
            query: ({ id }) => ({
                url: `${PATHS.MESSAGE}/${id}`,
                method: "GET",
            }),
            providesTags: [API_TAGS.MESSAGE]
        })
    }),
});

export const { useSendMessageMutation, useGetMessagesQuery, useGetMessageQuery } = MessageApi;