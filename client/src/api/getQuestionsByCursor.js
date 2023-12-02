const getQuestionsByCursor = async (cursor) => {
  const response = await fetch(
    `${
      import.meta.env.VITE_SERVER_URL
    }/api/questions/infinite?cursor=${cursor}`,
    { credentials: "include" }
  );
  console.log("getQuestionsByCursor response:", response);
  if (!response.ok) {
    throw new Error("getQuestionsByCursor failed");
  }
  const data = await response.json();
  console.log("getQuestionsByCursor data:", data);
  return data;
};

export default getQuestionsByCursor;
