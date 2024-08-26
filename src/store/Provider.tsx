"use client";
import { Provider } from "react-redux";
import { store } from "./index";

const DataProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default DataProvider;
