import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../constants";
import { CookieStorage } from "../../helpers/cookieStorage";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";

const baseQuery = fetchBaseQuery({
  baseUrl: `${API_URL}`,
  prepareHeaders: (headers) => {
    const token = CookieStorage.getItem("idT");
    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set("authorization", token);
    }
    return headers;
  },
});
const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const currentRefreshToken = CookieStorage.getItem("rT");
    // try to get a new token
    const refreshResult = await baseQuery(
      {
        url: "/resendCode",
        method: "post",
        body: { refreshToken: currentRefreshToken },
      },
      api,
      extraOptions
    );
    if (refreshResult.data) {
      // store the new token
      console.log("tokens", refreshResult);
      const idToken = (refreshResult.data as any)?.AuthenticationResult.IdToken;
      if (idToken) {
        CookieStorage.setItem("idT", idToken);
      }
      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      CookieStorage.clear();
    }
  }
  return result;
};

interface role {
  orgId: string;
  orgName: string;
  role: string;
  updatedAt: string;
  createdAt: string;
}

export interface Workspace {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  memberCount: number;
  formCount: number;
  responseCount: number;
  isDefault?: boolean;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  emailVerified: string;
  orgName: string;
  memberCount: number;
  formCount: number;
  responseCount: number;
  roles: role[];
}

const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Workspace"],
  endpoints: (builder) => {
    return {
      signup: builder.mutation({
        query: (body: {
          firstName: string;
          lastName: string;
          email: string;
          password: string;
        }) => ({
          url: "/auth/signup",
          method: "post",
          body,
        }),
      }),
      confirmSignup: builder.mutation({
        query: (body: { email: string; code: string }) => ({
          url: "/auth/confirmSignup",
          method: "post",
          body,
        }),
      }),
      resendCode: builder.mutation({
        query: (body: { email: string }) => ({
          url: "/auth/resendCode",
          method: "post",
          body,
        }),
      }),
      login: builder.mutation({
        query: (body: { email: string; password: string }) => ({
          url: "/auth/authenticate",
          method: "post",
          body,
        }),
      }),
      refreshLogin: builder.mutation({
        query: (body: { refreshToken: string }) => ({
          url: "/auth/authenticate",
          method: "post",
          body,
        }),
      }),
      forgotPassword: builder.mutation({
        query: (body: { email: string }) => ({
          url: "/auth/forgotPassword",
          method: "post",
          body,
        }),
      }),
      confirmForgotPassword: builder.mutation({
        query: (body: { email: string; code: string; password: string }) => ({
          url: "/auth/confirmForgotPassword",
          method: "post",
          body,
        }),
      }),
      logout: builder.mutation({
        query: (params: { token: string; idToken: string }) => ({
          url: "/auth/logout",
          method: "post",
          body: { token: params.token },
          headers: { Authorization: params.idToken },
        }),
      }),
      getUser: builder.query<User, string>({
        query: (userSub) => ({
          url: `/users/${userSub}`,
          method: "get",
        }),
      }),
      getWorkspaces: builder.query<Workspace[], string>({
        query: (userSub) => ({
          url: `/workspaces/${userSub}`,
          method: "get",
        }),
        providesTags: ["Workspace"],
      }),
      createWorkspace: builder.mutation<Workspace, { userSub: string; name: string }>({
        query: (body) => ({
          url: "/workspaces",
          method: "post",
          body,
        }),
        invalidatesTags: (_result, error) => (error ? [] : ["Workspace"]),
      }),
      updateWorkspace: builder.mutation<
        Workspace,
        { userSub: string; workspaceId: string; name: string }
      >({
        query: (body) => ({
          url: "/workspaces",
          method: "put",
          body,
        }),
        invalidatesTags: (_result, error) => (error ? [] : ["Workspace"]),
      }),
      deleteWorkspace: builder.mutation<Workspace, { userSub: string; workspaceId: string }>({
        query: (params) => ({
          url: `/workspaces/${params.userSub}/${params.workspaceId}`,
          method: "delete",
        }),
        invalidatesTags: (_result, error) => (error ? [] : ["Workspace"]),
      }),
    };
  },
});

export const {
  useGetUserQuery,
  useGetWorkspacesQuery,
  useCreateWorkspaceMutation,
  useUpdateWorkspaceMutation,
  useDeleteWorkspaceMutation,
  useSignupMutation,
  useLoginMutation,
  useRefreshLoginMutation,
  useConfirmSignupMutation,
  useResendCodeMutation,
  useForgotPasswordMutation,
  useConfirmForgotPasswordMutation,
  useLogoutMutation,
} = api;
export default api;
