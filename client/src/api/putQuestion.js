const putQuestion = async (questionId, question) => {
  const response = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/api/questions/${questionId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${localStorage.getItem("customJWT")}`,
      },
      credentials: "include",
      body: JSON.stringify({ question }),
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
