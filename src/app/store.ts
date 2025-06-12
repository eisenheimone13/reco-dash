import { configureStore } from "@reduxjs/toolkit";
import { getAppsApi } from "../services/get-app.service";

export const store = configureStore({
  reducer: {
    [getAppsApi.reducerPath]: getAppsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(getAppsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
