import React from "react";
import ExpenseContext from "./ExpenseContext";

const AppContext = ({ children }: { children: JSX.Element }) => {
  return <ExpenseContext>{children}</ExpenseContext>;
};

export default AppContext;
