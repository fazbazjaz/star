const getAllQuestions = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/api/questions`,
    { credentials: "include" }
  );
  // console.log("fetchAllQuestionsData response:", response);
  if (!response.ok) {
    throw new Error("fetchAllQuestions failed");
  }
  const data = await response.json();
  // console.log("fetchAllQuestionsData data:", data);
  return data;
};

export default getAllQuestions;