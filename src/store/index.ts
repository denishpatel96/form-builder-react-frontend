import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./features/form/formSlice";

export const store = configureStore({
  reducer: { form: formReducer },
});

// hot reload for development mode
if (process.env.NODE_ENV !== "production" && module.hot) {
  module.hot.accept();
}

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
