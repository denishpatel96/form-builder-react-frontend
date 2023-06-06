import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../constants";

type UserData = {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
};

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/user`,
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  endpoints: (builder) => {
    return {
      signup: builder.mutation<
        { success: boolean; data: UserData },
        {
          firstName: string;
          lastName: string;
          email: string;
          password: string;
        }
      >({
        query: (body) => ({
          url: "/signup",
          method: "post",
          body,
        }),
      }),
      confirmSignup: builder.mutation<
        { success: boolean },
        {
          email: string;
          code: string;
        }
      >({
        query: (body) => ({
          url: "/confirmSignup",
          method: "post",
          body,
        }),
      }),
      resendCode: builder.mutation<{ success: boolean }, { email: string }>({
        query: (body) => ({
          url: "/resendCode",
          method: "post",
          body,
        }),
      }),
      login: builder.mutation({
        query: (body: { email: string; password: string }) => ({
          url: "/authenticate",
          method: "post",
          body,
        }),
      }),
      refreshLogin: builder.mutation({
        query: (body: { refreshToken: string }) => ({
          url: "/authenticate",
          method: "post",
          body,
        }),
      }),
      forgotPassword: builder.mutation({
        query: (body: { email: string }) => ({
          url: "/forgotPassword",
          method: "post",
          body,
        }),
      }),
      confirmForgotPassword: builder.mutation({
        query: (body: { email: string; code: string; password: string }) => ({
          url: "/confirmForgotPassword",
          method: "post",
          body,
        }),
      }),
      logout: builder.mutation({
        query: (params: { token: string; idToken: string }) => ({
          url: "/logout",
          method: "post",
          body: { token: params.token },
          headers: { Authorization: params.idToken },
        }),
      }),
    };
  },
});

export const {
  useSignupMutation,
  useLoginMutation,
  useRefreshLoginMutation,
  useConfirmSignupMutation,
  useResendCodeMutation,
  useForgotPasswordMutation,
  useConfirmForgotPasswordMutation,
  useLogoutMutation,
} = authApi;
export default authApi;
