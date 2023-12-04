const getQuestionsByPage = async ({ pageParam }) => {
  const limit = 5;
  const response = await fetch(
    `${
      import.meta.env.VITE_SERVER_URL
    }/api/questions/infinite?limit=${limit}&page=${pageParam}`,
    { credentials: "include" }
  );
  if (!response.ok) {
    throw new Error("getQuestionsByPage failed");
  }
  const data = await response.json();
  return data;
};

export default getQuestionsByPage;
