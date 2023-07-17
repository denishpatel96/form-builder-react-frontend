import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Toast {
  id: number;
  message: string;
  severity: "success" | "info" | "warning" | "error";
}

interface SignalState {
  toasts: Toast[];
}

const initialState: SignalState = {
  toasts: [],
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
    resetSignalState: () => initialState,
  },
});

export const { showToast, hideToast, resetSignalState } = signalSlice.actions;
export default signalSlice.reducer;
