const getQuestionsByPage = async ({ pageParam }) => {
  const limit = 5;
  const response = await fetch(
    `${
      import.meta.env.VITE_SERVER_URL
    }/api/questions/?limit=${limit}&page=${pageParam}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("customJWT")}`,
      },
      // { credentials: "include" }
    }
  );
  if (!response.ok) {
    throw new Error("getQuestionsByPage failed");
  }
  const data = await response.json();
  return data;
};

export default getQuestionsByPage;