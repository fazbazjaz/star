const putAnswer = async (questionId, answerId, answer) => {
  const response = await fetch(
    `${
      import.meta.env.VITE_SERVER_URL
    }/api/questions/${questionId}/answers/${answerId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${localStorage.getItem("customJWT")}`,
      },
      credentials: "include",
      body: JSON.stringify(answer),
    }
  );
  // console.log("putAnswer response:", response);
  if (!response.ok) {
    throw new Error(
      `${response.status} ${response.statusText} : editedQuestion failed`
    );
  }
  const data = await response.json();
  // console.log("putAnswer data:", data);
  return data;
};

export default putAnswer;
