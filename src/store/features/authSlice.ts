import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

interface AuthState {
  accessToken: string;
  idToken: string;
  refreshToken: string;
  userId: string;
}

const initialState: AuthState = {
  accessToken: "",
  idToken: "",
  refreshToken: "",
  userId: "",
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
      if (idToken || accessToken) {
        const token = (idToken || accessToken) as string;
        const decodedJWT: { sub: string } = jwt_decode(token);
        state.userId = decodedJWT.sub;
      }
    },
    resetAuthState: () => initialState,
  },
});

export const { setTokens, resetAuthState } = authSlice.actions;
export default authSlice.reducer;
