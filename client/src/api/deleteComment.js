const deleteComment = async (questionId, answerId, commentId) => {
  const response = await fetch(
    `${
      import.meta.env.VITE_SERVER_URL
    }/api/questions/${questionId}/answers/${answerId}/comments/${commentId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${localStorage.getItem("customJWT")}`,
      },
      credentials: "include",
    }
  );
  // console.log("deleteComment response", response);
  if (!response.ok) {
    throw new Error(
      `${response.status} ${response.statusText} : deleteComment failed`
    );
  }
  const data = await response.json();
  // console.log("deleteComment data", data);
  return data;
};

export default deleteComment;
