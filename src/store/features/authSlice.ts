import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  refreshToken: string | null;
  accessToken: string | null;
  idToken: string | null;
}

const initialState: AuthState = {
  refreshToken: null,
  accessToken: null,
  idToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokens: (
      state,
      action: PayloadAction<{ accessToken?: string; refreshToken?: string; idToken?: string }>
    ) => {
      const { accessToken, refreshToken, idToken } = action.payload;
      if (accessToken) state.accessToken = accessToken;
      if (refreshToken) state.refreshToken = refreshToken;
      if (idToken) state.idToken = idToken;
    },
    removeTokens: (state) => {
      state.accessToken = null;
      state.idToken = null;
      state.refreshToken = null;
    },
  },
});

export const { setTokens, removeTokens } = authSlice.actions;
export default authSlice.reducer;
