const putComment = async (questionId, answerId, commentId, comment) => {
  const response = await fetch(
    `${
      import.meta.env.VITE_SERVER_URL
    }/api/questions/${questionId}/answers/${answerId}/comments/${commentId}`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment }),
    }
  );
  // console.log("putComment response:", response);
  if (!response.ok) {
    throw new Error(
      `${response.status} ${response.statusText} : editAnswer failed`
    );
  }
  const data = await response.json();
  // console.log("putComment data:", data);
  return data;
};

export default putComment;
