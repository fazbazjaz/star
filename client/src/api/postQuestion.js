const postQuestion = async (question) => {
  const response = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/api/questions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ question }),
    }
  );
  // console.log("postQuestion response", response);
  if (!response.ok) {
    throw new Error(
      `${response.status} ${response.statusText} : postQuestion failed`
    );
  }
  const data = await response.json();
  // console.log("postQuestion data", data);
  return data;
};

export default postQuestion;
