import { useState, useEffect } from "react";
import {
  Box,
  Table,
  Typography,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const Users = () => {
  // define state to store the Users Data
  const [usersData, setUsersData] = useState(null);

  useEffect(() => {
    // fetch the Users Data from the backend
    const fetchAllUsers = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/users/all`,
          { credentials: "include" } // include HTTP-Only Cookie with customJWT
        );
        // console.log("fetchAllUsers response:", response);

        if (!response.ok) {
          throw response;
        }

        const data = await response.json();
        // console.log("fetchAllUsers data:", data);

        const payload = data.payload;
        // console.log("fetchAllUsers payload:", payload);

        // store the Users Data in state
        setUsersData(payload);
      } catch (error) {
        console.error("fetchAllUsers error:", error);
      }
    };
    fetchAllUsers();
  }, []);

  const usersBackgroundImage = "/images/background-001.jpg";

  return (
    <Box
      minHeight={"50vh"}
      p={3}
      border={1}
      sx={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${usersBackgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
      }}>
      <Box color={"white"}>
        <Typography variant={"h3"}>Users Page</Typography>
        {usersData && (
          <Box>
            <Typography variant={"h6"}>
              users Table from the Database
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    {Object.keys(usersData[0]).map((column) => (
                      <TableCell key={column}>{column}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {usersData.map((user) => (
                    <TableRow key={user.google_id}>
                      {Object.keys(usersData[0]).map((column) => (
                        <TableCell key={column}>{user[column]}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Users;
