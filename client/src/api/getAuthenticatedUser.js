const getAuthenticatedUser = async (customJWT) => {
  try {
    console.log("getAuthenticatedUser customJWT", customJWT);

    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/auth/user`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${customJWT}`,
        },
        // credentials: "include",
      }
    );
    console.log("getAuthenticatedUser response:", response);

    if (!response.ok) {
      throw new Error(
        `getAuthenticatedUser failed ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log("getAuthenticatedUser data:", data);

    return data;
  } catch (error) {
    console.error("getAuthenticatedUser error:", error);
  }
};

export default getAuthenticatedUser;
