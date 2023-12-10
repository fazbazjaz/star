const getQuestionsByPage = async ({ pageParam, queryKey }) => {
  const limit = 5;
  const sort = queryKey[1];

  const response = await fetch(
    `${
      import.meta.env.VITE_SERVER_URL
    }/api/questions/?limit=${limit}&page=${pageParam}&sort=${sort}`,
    {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${localStorage.getItem("customJWT")}`,
      },
      credentials: "include",
    }
  );
  // console.log("getQuestionsByPage response:", response);

  if (!response.ok) {
    throw new Error("getQuestionsByPage failed");
  }

  const data = await response.json();
  // console.log("getQuestionsByPage data:", data);

  return data;
};

export default getQuestionsByPage;
