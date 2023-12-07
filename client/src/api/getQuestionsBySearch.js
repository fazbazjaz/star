const getQuestionsBySearch = async (searchTerm, sort) => {
  const response = await fetch(
    `${
      import.meta.env.VITE_SERVER_URL
    }/api/questions/search?term=${searchTerm}&sort=${sort}`,
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
