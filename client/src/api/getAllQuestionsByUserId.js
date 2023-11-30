const getAllQuestionsByUserId = async (userId) => {
  const response = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/api/questions/user/${userId}`,
    { credentials: "include" }
  );
  // console.log("fetchUserQuestions response:", response);
  if (!response.ok) {
    throw new Error("fetchUserQuestions failed");
  }
  const data = await response.json();
  // console.log("fetchUserQuestions data:", data);
  return data;
};

export default getAllQuestionsByUserId;