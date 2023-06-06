import { configureStore, Store } from "@reduxjs/toolkit";
import formReducer from "./features/formSlice";
import signalReducer from "./features/signalSlice";
import authApi from "./features/authApi";
import authSlice from "./features/authSlice";

export const store = configureStore({
  reducer: {
    form: formReducer,
    signal: signalReducer,
    auth: authSlice,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(authApi.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
