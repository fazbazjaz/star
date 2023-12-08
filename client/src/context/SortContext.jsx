import { createContext, useMemo, useState } from "react";

export const SortContext = createContext();

export const SortProvider = ({ children }) => {
  console.log("🔃 SortProvider RENDERED (and so all of <Outlet /> )");

  const [sortQuestions, setSortQuestions] = useState("popular");
  const [sortAnswers, setSortAnswers] = useState("popular");
  const [sortProfileQuestions, setSortProfileQuestions] = useState("popular");

  const contextValue = useMemo(
    () => ({
      sortQuestions,
      setSortQuestions,
      sortAnswers,
      setSortAnswers,
      sortProfileQuestions,
      setSortProfileQuestions,
    }),
    [
      sortQuestions,
      setSortQuestions,
      sortAnswers,
      setSortAnswers,
      sortProfileQuestions,
      setSortProfileQuestions,
    ]
  );

  return (
    <SortContext.Provider value={contextValue}>{children}</SortContext.Provider>
  );
};
