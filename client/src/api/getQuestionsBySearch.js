const getQuestionsBySearch = async ({ pageParam, queryKey }) => {
  const sort = queryKey[1];
  const searchTerm = queryKey[2];
  const limit = 5;

  const response = await fetch(
    `${
      import.meta.env.VITE_SERVER_URL
    }/api/questions/search?page=${pageParam}&limit=${limit}&term=${searchTerm}&sort=${sort}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("customJWT")}`,
      },
      // { credentials: "include" }
    }
  );
  // console.log("getQuestionBySearch response:", response);
  if (!response.ok) {
    throw new Error("getQuestionBySearch failed");
  }
  const data = await response.json();
  // console.log("getQuestionBySearch data:", data);
  return data;
};

export default getQuestionsBySearch;
