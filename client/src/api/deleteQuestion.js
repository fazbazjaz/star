const deleteQuestion = async (questionId) => {
  const response = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/api/questions/${questionId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );
  // console.log("deleteQuestion response", response);
  if (!response.ok) {
    throw new Error(
      `${response.status} ${response.statusText} : deleteQuestion failed`
    );
  }
  const data = await response.json();
  // console.log("deleteQuestion data", data);
  return data;
};

export default deleteQuestion;
