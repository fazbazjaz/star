const deleteAnswer = async (questionId, answerId) => {
  const response = await fetch(
    `${
      import.meta.env.VITE_SERVER_URL
    }/api/questions/${questionId}/answers/${answerId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );
  // console.log("deleteAnswer response", response);
  if (!response.ok) {
    throw new Error(
      `${response.status} ${response.statusText} : deleteAnswer failed`
    );
  }
  const data = await response.json();
  // console.log("deleteAnswer data", data);
  return data;
};

export default deleteAnswer;
