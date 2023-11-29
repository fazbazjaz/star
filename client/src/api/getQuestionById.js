const getQuestionById = async (questionId) => {
  const response = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/api/questions/${questionId}`,
    { credentials: "include" }
  );
  // console.log("fetchQuestionData response:", response);
  if (!response.ok) {
    throw new Error("fetchQuestion failed");
  }
  const data = await response.json();
  // console.log("fetchQuestionData data:", data);
  return data;
};

export default getQuestionById;
