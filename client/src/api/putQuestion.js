const putQuestion = async (questionId, editedQuestion) => {
  const response = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/api/questions/${questionId}`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: editedQuestion }),
    }
  );
  // console.log("putQuestion response:", response);
  if (!response.ok) {
    throw new Error(
      `${response.status} ${response.statusText} : editedQuestion failed`
    );
  }
  const data = await response.json();
  // console.log("putQuestion data:", data);
  return data;
};

export default putQuestion;
