const getAllQuestionsByUserId = async (userId, sort) => {
  const response = await fetch(
    `${
      import.meta.env.VITE_SERVER_URL
    }/api/questions/user/${userId}?sort=${sort}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("customJWT")}`,
      },
      // { credentials: "include" }
    }
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
