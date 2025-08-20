import { API_TAGS } from "@/constants/ApiTags";
import { baseApi } from "../baseApi";
import { PATHS } from "./path";
import {
  LoginRequest,
  LoginResponse,
  ProfileResponse,
  UpdatePasswordRequest,
  UpdatePasswordResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
} from "./types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: PATHS.LOGIN,
        method: "POST",
        body,
      }),
    }),
    profile: build.query<ProfileResponse, object>({
      query: () => ({
        url: PATHS.ME,
        method: "GET",
      }),
      providesTags: [API_TAGS.USER],
    }),

    updateProfile: build.mutation<UpdateProfileResponse, UpdateProfileRequest>({
      query: ({ id, body }) => ({
        url: `${PATHS.EDIT}${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [API_TAGS.USER],
    }),
    uploadImage: build.mutation<string, FormData>({
      query: (formData) => ({
        url: PATHS.UPLOAD,
        method: "POST",
        body: formData,
        responseHandler: "text",
      }),
    }),
    updatePassword: build.mutation<
      UpdatePasswordResponse,
      UpdatePasswordRequest
    >({
      query: (body) => ({
        url: "/user/password",
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }),
      invalidatesTags: [API_TAGS.USER],
    }),
    getAllUsers: build.query<
      {
        createdAt: string;
        fullName: string;
        role: string;
        username: string;
        _id: string;
      }[],
      { roles: string[] }
    >({
      query: ({ roles }) => {
        const roleParams = roles
          .map((role) => `roles=${encodeURIComponent(role)}`)
          .join("&");

        return `/auth/get-all-users?${roleParams}`;
      },
      providesTags: [API_TAGS.USER],
    }),
  }),
});

export const {
  useLoginMutation,
  useProfileQuery,
  useUpdateProfileMutation,
  useUploadImageMutation,
  useUpdatePasswordMutation,
  useGetAllUsersQuery,
} = authApi;
