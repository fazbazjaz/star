import { useQuery } from "@tanstack/react-query";
import { Box, Typography } from "@mui/material";
import Loading from "../components/Loading";
import Error from "../components/Loading";
import User from "../components/User";
import getAllUsers from "../api/getAllUsers";
import {
  consistentBorder,
  consistentBorderRadius,
  consistentBgColor,
  consistentBoxShadow,
  consistentBackdropFilter,
} from "../themes/ConsistentStyles";

const UsersPage = () => {
  const {
    isPending,
    isError,
    error,
    data: usersData,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  return (
    <Box>
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
              {Object.keys(usersData[0]).map((columnHeading, index, array) => {
                if (
                  columnHeading === "createdAt" ||
                  columnHeading === "updatedAt"
                ) {
                  return;
                }
                return (
                  <Box key={columnHeading}>
                    <Typography
                      p={1}
                      borderRight={
                        array.length - 3 !== index ? consistentBorder : null
                      }
                      borderBottom={consistentBorder}>
                      {columnHeading}
                    </Typography>
                  </Box>
                );
              })}
              {usersData.map((userData) => (
                <User key={userData.id} userData={userData} />
              ))}
            </Box>
          </Box>
        </>
      )}
      {isPending && <Loading />}
      {isError && <Error message={error.message} />}
    </Box>
  );
};

export default UsersPage;
