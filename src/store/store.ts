import { configureStore, combineReducers } from "@reduxjs/toolkit";
import usersReducer from "./usersReducer";

const rootReducer = combineReducers({ usersReducer });

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
