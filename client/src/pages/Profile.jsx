import { useContext } from "react";
import { Box, CardMedia, Typography } from "@mui/material";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  // get the userCookie from AuthContext
  const { userCookie } = useContext(AuthContext);

  const profileBackgroundImage = "/images/background-001.jpg";

  return (
    <Box
      sx={{
        color: "white",
        minHeight: "70vh",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${profileBackgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
      }}
      p={3}>
      <Typography variant="h3">Profile Page</Typography>
      {userCookie && (
        <>
          <CardMedia
            component="img"
            image={userCookie.picture}
            sx={{ height: 64, width: 64 }}
          />
          <Box mt={1}>
            <Typography fontWeight={"bold"}>Name:</Typography>
            <Typography>
              {userCookie.firstname} {userCookie.lastname}
            </Typography>
          </Box>
          <Box mt={1}>
            <Typography fontWeight={"bold"}>Email:</Typography>
            <Typography>{userCookie.email}</Typography>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Profile;
