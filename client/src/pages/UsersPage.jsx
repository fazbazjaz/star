import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import User from "../components/User";
import { consistentPageBackgroundImage } from "../themes/ConsistentStyles";

const UsersPage = () => {
  // define state to store the Users Data
  const [usersData, setUsersData] = useState(null);

  useEffect(() => {
    // fetch the Users Data from the backend
    const fetchAllUsers = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/users`,
          { credentials: "include" } // include HTTP-Only Cookie with customJWT
        );
        // console.log("fetchAllUsers response:", response);
        if (!response.ok) {
          throw response;
        }
        const data = await response.json();
        // console.log("fetchAllUsers data:", data);
        // store the Users Data in state
        setUsersData(data);
      } catch (error) {
        console.error("fetchAllUsers error:", error);
      }
    };
    fetchAllUsers();
  }, []);

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
      <Box>
        <Box>
          <Typography variant={"pagetitle"}>Users Page</Typography>
        </Box>
        {usersData && (
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
        )}
      </Box>
    </Box>
  );
};

export default UsersPage;
