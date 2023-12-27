import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../constants";
import { CookieStorage } from "../../helpers/cookieStorage";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { resetAuthState, setTokens } from "./authSlice";
import { IFieldProps } from "../../components/FormBuilder/Types";
import { deselectFields, selectFields } from "./formSlice";
import { sortArray } from "../../helpers/functions";

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

export interface Form {
  orgId: string;
  workspaceId: string;
  formId: string;
  name: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  responseCount: number;
}

export interface FormSchema {
  workspaceId: string;
  formId: string;
  order: string[];
  fields: IFieldProps[];
  lastFieldId: number;
  selected: string[];
}

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

const transformResponse = (response: { content?: any; message: string }) => response.content;

const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => {
    return {
      //----------------- AUTH ---------------------------------------------

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
        transformResponse,
      }),
      confirmSignup: builder.mutation({
        query: (body: { username: string; code: string }) => ({
          url: "/auth/confirmSignup",
          method: "post",
          body,
        }),
        transformResponse,
      }),
      resendCode: builder.mutation({
        query: (body: { email: string }) => ({
          url: "/auth/resendCode",
          method: "post",
          body,
        }),
        transformResponse,
      }),
      login: builder.mutation({
        query: (body: { email: string; password: string }) => ({
          url: "/auth/authenticate",
          method: "post",
          body,
        }),
        transformResponse,
      }),
      refreshLogin: builder.mutation({
        query: (body: { refreshToken: string }) => ({
          url: "/auth/authenticate",
          method: "post",
          body,
        }),
        transformResponse,
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
        transformResponse,
      }),
      forgotPassword: builder.mutation({
        query: (body: { email: string }) => ({
          url: "/auth/forgotPassword",
          method: "post",
          body,
        }),
        transformResponse,
      }),
      confirmForgotPassword: builder.mutation({
        query: (body: { email: string; code: string; password: string }) => ({
          url: "/auth/confirmForgotPassword",
          method: "post",
          body,
        }),
        transformResponse,
      }),
      logout: builder.mutation({
        query: (params: { token: string }) => ({
          url: "/auth/logout",
          method: "post",
          body: { token: params.token },
        }),
        transformResponse,
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
        transformResponse,
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
        transformResponse,
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
        transformResponse,
      }),

      //----------------- USER ---------------------------------------------

      getOrgsByUser: builder.query<OrgMember[], string>({
        query: (username) => ({
          url: `/users/orgs/${username}`,
          method: "get",
        }),
        transformResponse,
      }),
      getUser: builder.query<User, string>({
        query: (username) => ({
          url: `/users/${username}`,
          method: "get",
        }),
        transformResponse,
      }),
      updateUser: builder.mutation<
        void,
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
        transformResponse,
        async onQueryStarted({ username, ...patch }, { dispatch, queryFulfilled }) {
          try {
            await queryFulfilled;
            dispatch(
              api.util.updateQueryData("getUser", username, (draft) => {
                Object.assign(draft, patch);
              })
            );
          } catch {}
        },
      }),

      //----------------- WORKSPACE ---------------------------------------------

      getWorkspaces: builder.query<Workspace[], string>({
        query: (orgId) => ({
          url: `/workspaces/${orgId}`,
          method: "get",
        }),
        transformResponse,
      }),
      createWorkspace: builder.mutation<Workspace, { orgId: string; workspaceName: string }>({
        query: (body) => ({
          url: "/workspaces",
          method: "post",
          body,
        }),
        transformResponse,
        async onQueryStarted({ orgId }, { dispatch, queryFulfilled }) {
          try {
            const { data: createdWorkspace } = await queryFulfilled;
            dispatch(
              api.util.updateQueryData("getWorkspaces", orgId, (draftedWorkspaces) => {
                draftedWorkspaces.push(createdWorkspace);
                return draftedWorkspaces;
              })
            );
          } catch {}
        },
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
        transformResponse,
        async onQueryStarted({ orgId, workspaceId, ...patch }, { dispatch, queryFulfilled }) {
          try {
            await queryFulfilled;
            dispatch(
              api.util.updateQueryData("getWorkspaces", orgId, (draftedWorkspaces) => {
                return draftedWorkspaces.map((w) =>
                  w.workspaceId === workspaceId ? Object.assign(w, patch) : w
                );
              })
            );
          } catch {}
        },
      }),
      deleteWorkspace: builder.mutation<void, { orgId: string; workspaceId: string }>({
        query: (params) => ({
          url: `/workspaces/${params.orgId}/${params.workspaceId}`,
          method: "delete",
        }),
        transformResponse,
        async onQueryStarted({ orgId, workspaceId }, { dispatch, queryFulfilled }) {
          try {
            await queryFulfilled;
            dispatch(
              api.util.updateQueryData("getWorkspaces", orgId, (draftedWorkspaces) => {
                return draftedWorkspaces.filter((w) => w.workspaceId !== workspaceId);
              })
            );
          } catch {}
        },
      }),

      //----------------- ORG MEMBER INVITATION ---------------------------------------------

      createOrgMemberInvitation: builder.mutation<
        OrgMemberInvite,
        { orgId: string; email: string; role: string }
      >({
        query: (body) => ({
          url: "/memberInvitations",
          method: "post",
          body,
        }),
        transformResponse,
        async onQueryStarted({ orgId }, { dispatch, queryFulfilled }) {
          try {
            const { data: createdInvitation } = await queryFulfilled;
            dispatch(
              api.util.updateQueryData(
                "getOrgMemberInvitations",
                { orgId },
                (draftedInvitations) => {
                  draftedInvitations.push(createdInvitation);
                  return draftedInvitations;
                }
              )
            );
          } catch {}
        },
      }),
      getOrgMemberInvitations: builder.query<OrgMemberInvite[], { orgId?: string; email?: string }>(
        {
          query: (params) => ({
            url: `/memberInvitations?${
              params.orgId ? `orgId=${params.orgId}` : params.email ? `email=${params.email}` : ""
            }`,
            method: "get",
          }),
          transformResponse,
        }
      ),
      respondToOrgMemberInvitation: builder.mutation<
        OrgMemberInvite,
        { orgId: string; email: string; accepted: boolean }
      >({
        query: (body) => ({
          url: "/memberInvitations/respond",
          method: "post",
          body,
        }),
        transformResponse,
        async onQueryStarted({ orgId, email, ...patch }, { dispatch, queryFulfilled }) {
          try {
            await queryFulfilled;
            dispatch(
              api.util.updateQueryData(
                "getOrgMemberInvitations",
                { orgId },
                (draftedInvitations) => {
                  return draftedInvitations.map((i) =>
                    i.email === email ? Object.assign(i, patch) : i
                  );
                }
              )
            );
          } catch {}
        },
      }),
      deleteOrgMemberInvitation: builder.mutation<
        OrgMemberInvite,
        { orgId: string; email: string }
      >({
        query: (params) => ({
          url: `/memberInvitations/${params.orgId}/${params.email}`,
          method: "delete",
        }),
        transformResponse,
        async onQueryStarted({ orgId, email }, { dispatch, queryFulfilled }) {
          try {
            await queryFulfilled;
            dispatch(
              api.util.updateQueryData(
                "getOrgMemberInvitations",
                { orgId },
                (draftedInvitations) => {
                  return draftedInvitations.filter((i) => i.email !== email);
                }
              )
            );
          } catch {}
        },
      }),

      //----------------- ORG MEMBER ---------------------------------------------------------

      getOrgMembers: builder.query<OrgMember[], string>({
        query: (orgId) => ({
          url: `/members/${orgId}`,
          method: "get",
        }),
        transformResponse,
      }),
      deleteOrgMember: builder.mutation<OrgMember, { orgId: string; userId: string }>({
        query: (params) => ({
          url: `/members/${params.orgId}/${params.userId}`,
          method: "delete",
        }),
        transformResponse,
        async onQueryStarted({ orgId, userId }, { dispatch, queryFulfilled }) {
          try {
            await queryFulfilled;
            dispatch(
              api.util.updateQueryData("getOrgMembers", orgId, (draftedMembers) => {
                return draftedMembers.filter((m) => m.userId !== userId);
              })
            );
          } catch {}
        },
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
        transformResponse,
        async onQueryStarted({ orgId, userId, ...patch }, { dispatch, queryFulfilled }) {
          try {
            await queryFulfilled;
            dispatch(
              api.util.updateQueryData("getOrgMembers", orgId, (draftedMembers) => {
                return draftedMembers.map((m) =>
                  m.userId === userId ? Object.assign(m, patch) : m
                );
              })
            );
          } catch {}
        },
      }),

      //----------------- FORM ---------------------------------------------

      createForm: builder.mutation<Form, { orgId: string; workspaceId: string; formName: string }>({
        query: (body) => ({
          url: "/forms",
          method: "post",
          body,
        }),
        transformResponse,
        async onQueryStarted({ orgId, workspaceId }, { dispatch, queryFulfilled }) {
          try {
            const { data: createdForm } = await queryFulfilled;
            dispatch(
              api.util.updateQueryData(
                "getFormsByWorkspace",
                { orgId, workspaceId },
                (draftedForms) => {
                  draftedForms.push(createdForm);
                  return draftedForms;
                }
              )
            );
          } catch {}
        },
      }),
      deleteForm: builder.mutation<Form, { orgId: string; workspaceId: string; formId: string }>({
        query: (params) => ({
          url: `/forms/${params.orgId}/${params.workspaceId}/${params.formId}`,
          method: "delete",
        }),
        transformResponse,
        async onQueryStarted({ orgId, workspaceId, formId }, { dispatch, queryFulfilled }) {
          try {
            await queryFulfilled;
            dispatch(
              api.util.updateQueryData(
                "getFormsByWorkspace",
                { orgId, workspaceId },
                (draftedForms) => {
                  return draftedForms.filter((f) => f.formId !== formId);
                }
              )
            );
          } catch {}
        },
      }),
      getFormsByWorkspace: builder.query<Form[], { orgId: string; workspaceId: string }>({
        query: (params) => ({
          url: `/forms/${params.orgId}/${params.workspaceId}`,
          method: "get",
        }),
        transformResponse,
      }),
      updateForm: builder.mutation<
        Form,
        {
          orgId: string;
          workspaceId: string;
          formId: string;
          name?: string;
        }
      >({
        query: (body) => ({
          url: "/forms",
          method: "put",
          body,
        }),
        transformResponse,
        async onQueryStarted(
          { orgId, workspaceId, formId, ...patch },
          { dispatch, queryFulfilled }
        ) {
          try {
            await queryFulfilled;
            dispatch(
              api.util.updateQueryData(
                "getFormsByWorkspace",
                { orgId, workspaceId },
                (draftedForms) => {
                  return draftedForms.map((f) =>
                    f.formId === formId ? Object.assign(f, patch) : f
                  );
                }
              )
            );
          } catch {}
        },
      }),
      getFormSchema: builder.query<
        FormSchema,
        { orgId: string; workspaceId: string; formId: string }
      >({
        query: (params) => ({
          url: `/formSchemas/${params.orgId}/${params.workspaceId}/${params.formId}`,
          method: "get",
        }),
        transformResponse: (response: { content?: any; message: string }) => {
          const data = response.content;
          data.selected = [];
          return data;
        },
      }),
      updateFormSchema: builder.mutation<
        void,
        {
          orgId: string;
          workspaceId: string;
          formId: string;
          action: "ADD_FIELDS" | "DELETE_FIELDS" | "MOVE_FIELDS" | "UPDATE_FIELDS";
          order?: string[];
          fields?: IFieldProps[];
          lastFieldId?: number;
          fieldIds?: string[];
        }
      >({
        query: (body) => ({ url: "/formSchemas", method: "put", body }),
        transformResponse,
        async onQueryStarted(
          { orgId, workspaceId, formId, fields, lastFieldId, order, action, fieldIds },
          { dispatch, queryFulfilled }
        ) {
          const patchResult = dispatch(
            api.util.updateQueryData(
              "getFormSchema",
              { orgId, workspaceId, formId },
              (draftedFormSchema) => {
                switch (action) {
                  case "ADD_FIELDS":
                    if (fields && order && lastFieldId) {
                      draftedFormSchema.fields = sortArray(
                        [...draftedFormSchema.fields, ...fields],
                        order
                      );
                      draftedFormSchema.lastFieldId = lastFieldId;
                    }
                    break;
                  case "DELETE_FIELDS":
                    if (fieldIds && order) {
                      draftedFormSchema.fields = draftedFormSchema.fields.filter(
                        (f) => !fieldIds.includes(f.id)
                      );
                    }
                    break;
                  case "MOVE_FIELDS":
                    if (order) {
                      draftedFormSchema.fields = sortArray(draftedFormSchema.fields, order);
                    }
                    break;
                  case "UPDATE_FIELDS":
                    if (fields) {
                      fields.forEach((field) => {
                        const index = draftedFormSchema.fields.findIndex((f) => f.id === field.id);
                        if (index !== -1) {
                          draftedFormSchema.fields[index] = field;
                        }
                      });
                    }
                    break;
                }
                return draftedFormSchema;
              }
            )
          );
          if (action === "ADD_FIELDS" && fields) dispatch(selectFields(fields.map((f) => f.id)));
          else if (action === "DELETE_FIELDS") dispatch(deselectFields());
          try {
            await queryFulfilled;
          } catch {
            patchResult.undo();
            /**
             * Alternatively, on failure you can invalidate the corresponding cache tags
             * to trigger a re-fetch:
             * dispatch(api.util.invalidateTags(['Post']))
             */
          }
        },
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
  useGetFormsByWorkspaceQuery,
  useCreateFormMutation,
  useDeleteFormMutation,
  useUpdateFormMutation,
  useGetFormSchemaQuery,
  useUpdateFormSchemaMutation,
} = api;
export default api;
