import { API_TAGS } from "@/constants";
import { baseApi } from "../baseApi";
import { PATHS } from "./paths";

export const UserApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<GetAllUsersResponse[], string[]>({
      query: (roles) => {
        const roleParams = roles
          ? roles?.map((role: string) => `roles=${role}`).join("&")
          : "";
        return {
          url: `${PATHS.GET_ALL_USERS}?${roleParams}`,
          method: "GET",
        };
      },
      providesTags: [API_TAGS.USER],
    }),
    getUser: build.query<GetAllUsersResponse, GetUserRequest>({
      query: ({ id }) => ({
        url: `${PATHS.GET_USER}${id}`,
        method: "GET",
      }),
      providesTags: [API_TAGS.USER],
    }),
  }),
});

export const { useGetUsersQuery, useGetUserQuery } = UserApi;
