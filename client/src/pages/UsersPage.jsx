import { useQuery } from "@tanstack/react-query";
import { Box, Typography } from "@mui/material";
import Loading from "../components/Loading";
import Error from "../components/Loading";
import User from "../components/User";
import {
  consistentBorder,
  consistentBorderRadius,
  consistentBgColor,
  consistentBoxShadow,
  consistentBackdropFilter,
} from "../themes/ConsistentStyles";

const UsersPage = () => {
  const fetchAllUsers = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/users`,
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
    <Box py={2}>
      {isPending && <Loading />}
      {isError && <Error message={error.message} />}
      {usersData && (
        <>
          <Box>
            <Typography variant={"pagetitle"}>Users Page</Typography>
          </Box>
          <Box
            mt={1}
            p={2}
            border={consistentBorder}
            borderRadius={consistentBorderRadius}
            bgcolor={consistentBgColor}
            boxShadow={consistentBoxShadow}
            sx={{
              backdropFilter: consistentBackdropFilter,
            }}>
            <Typography variant={"tabletitle"} color={"primary"}>
              users Table from the Database
            </Typography>
            <Box
              display={"grid"}
              gridTemplateColumns={
                "repeat(7, minmax(min-content, max-content))"
              }
              mt={1}>
              {Object.values(usersData).map((userData) => {
                return Object.keys(userData).map((key, index, array) => {
                  if (key === "createdAt" || key === "updatedAt") {
                    return;
                  }
                  return (
                    <Box key={key}>
                      <Typography
                        p={1}
                        borderRight={
                          array.length - 3 !== index ? consistentBorder : null
                        }
                        borderBottom={consistentBorder}>
                        {key}
                      </Typography>
                    </Box>
                  );
                });
              })}
              {usersData.map((userData) => (
                <User key={userData.id} userData={userData} />
              ))}
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default UsersPage;
