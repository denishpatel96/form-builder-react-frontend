import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAccessTokenPayload, getIdTokenPayload } from "../../helpers/jwtHandler";

interface AuthState {
  accessToken: string;
  idToken: string;
  refreshToken: string;
  username: string;
}

const initialState: AuthState = {
  accessToken: "",
  idToken: "",
  refreshToken: "",
  username: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokens: (
      state,
      action: PayloadAction<{ accessToken?: string; idToken?: string; refreshToken?: string }>
    ) => {
      const { accessToken, idToken, refreshToken } = action.payload;
      if (accessToken) state.accessToken = accessToken;
      if (refreshToken) state.refreshToken = refreshToken;
      if (idToken) state.idToken = idToken;
      if (idToken) {
        state.username = getIdTokenPayload(idToken)["cognito:username"];
      } else if (accessToken) {
        state.username = getAccessTokenPayload(accessToken).username;
      }
    },
    resetAuthState: () => initialState,
  },
});

export const { setTokens, resetAuthState } = authSlice.actions;
export default authSlice.reducer;
