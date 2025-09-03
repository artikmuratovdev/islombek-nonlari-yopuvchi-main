import { socket } from "@/utils";
import { baseApi } from "../baseApi";
import { PATHS } from "./path";
import { GetNotification, NotificationPushRequest } from "./types";
import { API_TAGS } from "@/constants";

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createNotification: build.mutation<GetNotification, Notification>({
      query: (data) => ({
        url: PATHS.NOTIFICATIONS,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [API_TAGS.NOTIFICATION],
    }),
    getNotifications: build.query<GetNotification[], string>({
      query: (userId) => ({
        url: PATHS.INFO_NOTIFICATION + userId + PATHS.GET_INFO_NOTIFICATION,
        method: "GET",
      }),
      async onCacheEntryAdded(
        _,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          await cacheDataLoaded;
          socket.on("notification", (newNotification) => {
            updateCachedData((draft) => {
              if (Array.isArray(draft)) {
                draft.unshift(newNotification);
              }
            });
          });
        } catch (error) {
          console.error("Socket error:", error);
        }
        await cacheEntryRemoved;
        socket.off("notification");
      },
      providesTags: [API_TAGS.NOTIFICATION],
    }),
    updateNotification: build.mutation<void, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `${PATHS.NOTIFICATIONS}/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: [API_TAGS.NOTIFICATION],
    }),
    notificationSubscribe: build.mutation<object, object>({
      query: (data) => ({
        url: PATHS.NOTIFICATION_SUBSCRIBE,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [API_TAGS.NOTIFICATION],
    }),
    notificationPush: build.mutation<Notification, NotificationPushRequest>({
      query: ({ id, body }) => ({
        url: `${PATHS.NOTIFICATION_PUSH}/${id}`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: [API_TAGS.NOTIFICATION],
    }),
  }),
});

export const {
  useCreateNotificationMutation,
  useGetNotificationsQuery,
  useNotificationSubscribeMutation,
  useNotificationPushMutation,
  useUpdateNotificationMutation,
} = notificationApi;
