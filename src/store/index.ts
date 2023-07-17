import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./features/formSlice";
import authReducer from "./features/authSlice";
import signalReducer from "./features/signalSlice";
import api from "./features/api";

export const store = configureStore({
  reducer: {
    form: formReducer,
    auth: authReducer,
    signal: signalReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(api.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
