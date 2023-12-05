const postComment = async (questionId, answerId, comment) => {
  const response = await fetch(
    `${
      import.meta.env.VITE_SERVER_URL
    }/api/questions/${questionId}/answers/${answerId}/comments`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${localStorage.getItem("customJWT")}`,
      },
      credentials: "include",
      body: JSON.stringify({ comment }),
    }
  );
  // console.log("postComment response", response);
  if (!response.ok) {
    throw new Error(
      `${response.status} ${response.statusText} : postComment failed`
    );
  }
  const data = await response.json();
  // console.log("postComment data", data);
  return data;
};

export default postComment;
