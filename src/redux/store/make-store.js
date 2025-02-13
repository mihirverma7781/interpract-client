import { configureStore } from "@reduxjs/toolkit";
import reduxLogger from "redux-logger";
import userReducer from "../features/user/user-slice";
import interviewReducer from "../features/interview/interview-slice";

export function makeStore() {
  return configureStore({
    reducer: {
      user: userReducer,
      interview: interviewReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(reduxLogger),
    devTools: process.env.NODE_ENV !== "production",
  });
}

export const store = makeStore();
