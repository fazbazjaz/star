const getAllUsers = async () => {
  const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("customJWT")}`,
    },
    // credentials: "include",
  });
  // console.log("fetchAllUsers response:", response);
  if (!response.ok) {
    throw new Error("fetchAllUsers failed");
  }
  const data = await response.json();
  // console.log("fetchAllUsers data:", data);
  return data;
};

export default getAllUsers;
