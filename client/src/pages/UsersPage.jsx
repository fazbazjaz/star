import { useQuery } from "@tanstack/react-query";
import { Box, Typography } from "@mui/material";
import Loading from "../components/Loading";
import Error from "../components/Loading";
import User from "../components/User";
import { consistentPageBackgroundImage } from "../themes/ConsistentStyles";

const UsersPage = () => {
  const fetchAllUsers = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/users/all`,
      { credentials: "include" }
    );
    // console.log("fetchAllUsers response:", response);
    if (!response.ok) {
      throw new Error("fetchAllUsers failed");
    }
    const data = await response.json();
    // console.log("fetchAllUsers data:", data);
    return data;
  };

  const {
    isPending,
    isError,
    error,
    data: usersData,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchAllUsers,
  });

  return (
    <Box
      p={3}
      color={"white"}
      sx={{
        backgroundImage: consistentPageBackgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
      }}>
      {isPending && <Loading />}
      {isError && <Error message={error.message} />}
      {usersData && (
        <>
          <Box>
            <Typography variant={"pagetitle"}>Users Page</Typography>
          </Box>
          <Box mt={1}>
            <Box>
              <Typography variant={"body"}>
                users Table from the Database
              </Typography>
            </Box>
            <Box display={"grid"} rowGap={1} mt={1}>
              {usersData &&
                usersData.length > 0 &&
                usersData.map((userData) => {
                  return <User key={userData.id} userData={userData} />;
                })}
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default UsersPage;
