import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import useSystemTheme from "../../hooks/useSystemTheme";

interface Toast {
  id: number;
  message: string;
  severity: "success" | "info" | "warning" | "error";
}

interface SignalState {
  toasts: Toast[];
  themeMode: "dark" | "light";
}

const initialState: SignalState = {
  toasts: [],
  themeMode:
    localStorage.getItem("mode") !== null
      ? (localStorage.getItem("mode") as "dark" | "light")
      : useSystemTheme()
      ? "dark"
      : "light",
};

const signalSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (
      state,
      action: PayloadAction<{
        id?: number;
        message: string;
        severity?: "success" | "info" | "warning" | "error";
      }>
    ) => {
      let toast: Toast = {
        id: new Date().valueOf(),
        severity: "success",
        ...action.payload,
      };
      state.toasts.push(toast);
    },
    hideToast: (state, action: PayloadAction<number>) => {
      const toastId = action.payload;
      state.toasts = state.toasts.filter((t) => t.id !== toastId);
    },
    setThemeMode: (state, action: PayloadAction<"dark" | "light">) => {
      localStorage.setItem("mode", action.payload);
      state.themeMode = action.payload;
    },
    resetSignalState: () => initialState,
  },
});

export const { showToast, hideToast, resetSignalState, setThemeMode } = signalSlice.actions;
export default signalSlice.reducer;
