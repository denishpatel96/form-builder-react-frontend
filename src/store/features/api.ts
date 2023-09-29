import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../constants";
import { CookieStorage } from "../../helpers/cookieStorage";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { resetAuthState, setTokens } from "./authSlice";

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
      const idToken = (refreshResult.data as any)?.AuthenticationResult.IdToken;
      const accessToken = (refreshResult.data as any)?.AuthenticationResult.AccessToken;

      CookieStorage.setItem("idT", idToken);
      CookieStorage.setItem("aT", accessToken);
      api.dispatch(setTokens({ accessToken, idToken }));
      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      CookieStorage.clear();
      api.dispatch(resetAuthState());
    }
  }
  return result;
};

export interface Workspace {
  orgId: string;
  workspaceId: string;
  name: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  memberCount: number;
  formCount: number;
  responseCount: number;
  bookmarked: boolean;
}

export interface OrgMember {
  userId: string;
  orgId: string;
  orgName: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface OrgMemberInvite {
  inviter: {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    orgName: string;
    role?: string;
  };
  orgId: string;
  email: string;
  role: string;
  createdAt: string;
}

export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  orgName: string;
  memberCount: number;
  formCount: number;
  responseCount: number;
}

const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Workspace", "User", "UserOrgs", "OrgInvitation", "OrgMember"],
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
        query: (body: { username: string; code: string }) => ({
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
      changePassword: builder.mutation({
        query: (body: {
          accessToken: string;
          previousPassword: string;
          proposedPassword: string;
        }) => ({
          url: "/auth/changePassword",
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
        query: (params: { token: string }) => ({
          url: "/auth/logout",
          method: "post",
          body: { token: params.token },
        }),
      }),
      updateCognitoUserEmail: builder.mutation({
        query: (params: { password: string; email: string }) => ({
          url: "/auth/updateUserAttributes",
          method: "post",
          body: {
            password: params.password,
            attributes: [
              {
                name: "email",
                value: params.email,
              },
            ],
          },
        }),
      }),
      verifyCognitoUserEmail: builder.mutation({
        query: (params: { accessToken: string; code: string }) => ({
          url: "/auth/verifyUserAttribute",
          method: "post",
          body: {
            accessToken: params.accessToken,
            attributeName: "email",
            code: params.code,
          },
        }),
      }),
      updateCognitoUserName: builder.mutation({
        query: (params: { accessToken: string; firstName: string; lastName: string }) => ({
          url: "/auth/updateUserAttributes",
          method: "post",
          body: {
            accessToken: params.accessToken,
            attributes: [
              {
                name: "given_name",
                value: params.firstName,
              },
              {
                name: "family_name",
                value: params.lastName,
              },
            ],
          },
        }),
      }),
      getOrgsByUser: builder.query<OrgMember[], string>({
        query: (username) => ({
          url: `/users/orgs/${username}`,
          method: "get",
        }),
        providesTags: ["UserOrgs"],
      }),
      getUser: builder.query<User, string>({
        query: (username) => ({
          url: `/users/${username}`,
          method: "get",
        }),
        providesTags: ["User"],
      }),
      updateUser: builder.mutation<
        User,
        {
          username: string;
          firstName?: string;
          lastName?: string;
          email?: string;
          orgName?: string; // orgName
        }
      >({
        query: (body) => ({
          url: `/users`,
          method: "put",
          body,
        }),
        invalidatesTags: (_result, error) => (error ? [] : ["User"]),
      }),
      getWorkspaces: builder.query<Workspace[], string>({
        query: (orgId) => ({
          url: `/workspaces/${orgId}`,
          method: "get",
        }),
        providesTags: ["Workspace"],
      }),
      createWorkspace: builder.mutation<Workspace, { orgId: string; workspaceName: string }>({
        query: (body) => ({
          url: "/workspaces",
          method: "post",
          body,
        }),
        invalidatesTags: (_result, error) => (error ? [] : ["Workspace"]),
      }),
      updateWorkspace: builder.mutation<
        Workspace,
        {
          orgId: string;
          workspaceId: string;
          name?: string;
          bookmarked?: boolean;
        }
      >({
        query: (body) => ({
          url: "/workspaces",
          method: "put",
          body,
        }),
        invalidatesTags: (_result, error) => (error ? [] : ["Workspace"]),
      }),
      deleteWorkspace: builder.mutation<Workspace, { orgId: string; workspaceId: string }>({
        query: (params) => ({
          url: `/workspaces/${params.orgId}/${params.workspaceId}`,
          method: "delete",
        }),
        invalidatesTags: (_result, error) => (error ? [] : ["Workspace"]),
      }),
      createOrgMemberInvitation: builder.mutation<
        Workspace,
        { orgId: string; email: string; role: string }
      >({
        query: (body) => ({
          url: "/memberInvitations",
          method: "post",
          body,
        }),
        invalidatesTags: (_result, error) => (error ? [] : ["OrgInvitation"]),
      }),
      getOrgMemberInvitations: builder.query<OrgMemberInvite[], { orgId?: string; email?: string }>(
        {
          query: (params) => ({
            url: `/memberInvitations?${
              params.orgId ? `orgId=${params.orgId}` : params.email ? `email=${params.email}` : ""
            }`,
            method: "get",
          }),
          providesTags: ["OrgInvitation"],
        }
      ),
      respondToOrgMemberInvitation: builder.mutation<
        Workspace,
        { orgId: string; accepted: boolean }
      >({
        query: (body) => ({
          url: "/memberInvitations/respond",
          method: "post",
          body,
        }),
        invalidatesTags: (_result, error) => (error ? [] : ["OrgInvitation"]),
      }),
      deleteOrgMemberInvitation: builder.mutation<
        OrgMemberInvite,
        { orgId: string; email: string }
      >({
        query: (params) => ({
          url: `/memberInvitations/${params.orgId}/${params.email}`,
          method: "delete",
        }),
        invalidatesTags: (_result, error) => (error ? [] : ["OrgInvitation"]),
      }),
      getOrgMembers: builder.query<OrgMember[], string>({
        query: (orgId) => ({
          url: `/members/${orgId}`,
          method: "get",
        }),
        providesTags: ["OrgMember"],
      }),
      deleteOrgMember: builder.mutation<OrgMember, { orgId: string; userId: string }>({
        query: (params) => ({
          url: `/members/${params.orgId}/${params.userId}`,
          method: "delete",
        }),
        invalidatesTags: (_result, error) => (error ? [] : ["OrgMember"]),
      }),
      updateOrgMember: builder.mutation<
        OrgMember,
        {
          orgId: string;
          userId: string;
          role: string;
        }
      >({
        query: (body) => ({
          url: "/members",
          method: "put",
          body,
        }),
        invalidatesTags: (_result, error) => (error ? [] : ["OrgMember"]),
      }),
    };
  },
});

export const {
  useGetUserQuery,
  useGetOrgsByUserQuery,
  useUpdateUserMutation,
  useGetWorkspacesQuery,
  useCreateWorkspaceMutation,
  useUpdateWorkspaceMutation,
  useDeleteWorkspaceMutation,
  useSignupMutation,
  useLoginMutation,
  useRefreshLoginMutation,
  useConfirmSignupMutation,
  useResendCodeMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useConfirmForgotPasswordMutation,
  useLogoutMutation,
  useUpdateCognitoUserEmailMutation,
  useVerifyCognitoUserEmailMutation,
  useUpdateCognitoUserNameMutation,
  useGetOrgMembersQuery,
  useDeleteOrgMemberMutation,
  useUpdateOrgMemberMutation,
  useGetOrgMemberInvitationsQuery,
  useRespondToOrgMemberInvitationMutation,
  useDeleteOrgMemberInvitationMutation,
  useCreateOrgMemberInvitationMutation,
} = api;
export default api;
