import { createContext, useMemo, useState } from "react";

export const SortContext = createContext();

export const SortProvider = ({ children }) => {
  const [sortQuestions, setSortQuestions] = useState("popular");
  const [sortAnswers, setSortAnswers] = useState("popular");

  const contextValue = useMemo(
    () => ({ sortQuestions, setSortQuestions, sortAnswers, setSortAnswers }),
    [sortQuestions, setSortQuestions, sortAnswers, setSortAnswers]
  );

  return (
    <SortContext.Provider value={contextValue}>{children}</SortContext.Provider>
  );
};
