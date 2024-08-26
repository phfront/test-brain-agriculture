import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import ruralProducerSlice from "./slices/ruralProducerSlice";

const rootReducer = combineReducers({
  ruralProducer: ruralProducerSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  // middleware(getDefaultMiddleware) {
  //   // prettier-ignore
  //   return getDefaultMiddleware({
  //     serializableCheck: false
  //   }).concat([thunk]);
  // },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
