import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../constants";
import { CookieStorage } from "../../helpers/cookieStorage";

export interface User {
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  emailVerified: string;
  orgName: string;
  orgId: string;
  memberCount: number;
  formCount: number;
  workspaceCount: number;
  responseCount: number;
}

export interface Workspace {
  id: string;
  name: string;
  updatedAt: string;
  createdAt: string;
  formCount: number;
  memberCount: number;
  responsesCount: number;
}

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/user`,
    prepareHeaders: (headers) => {
      const token = CookieStorage.getItem("idT");
      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("authorization", token);
      }
      return headers;
    },
  }),
  endpoints: (builder) => {
    return {
      getUser: builder.query<{ user: User; workspaces: Workspace[] }, string>({
        query: (userId) => ({
          url: `/${userId}`,
          method: "get",
        }),
      }),
    };
  },
});

export const { useGetUserQuery } = userApi;
export default userApi;
