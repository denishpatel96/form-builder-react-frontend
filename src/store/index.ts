import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./features/formSlice";
import signalReducer from "./features/signalSlice";
import authApi from "./features/authApi";
import userApi from "./features/userApi";

export const store = configureStore({
  reducer: {
    form: formReducer,
    signal: signalReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(authApi.middleware).concat(userApi.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
