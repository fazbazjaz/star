import { useState, useEffect, useContext } from "react";
import {
  useSearchParams,
  Link as RouterLink,
  NavLink,
  useNavigate,
} from "react-router-dom";
import { Box, Typography, Button, Link } from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import RotateRightRoundedIcon from "@mui/icons-material/RotateRightRounded";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { AuthContext } from "../context/AuthContext";
import {
  consistentBorder,
  consistentBorderRadius,
  consistentBgColor,
  consistentBoxShadow,
  consistentBackdropFilter,
} from "../themes/ConsistentStyles";

const VerifyPage = () => {
  console.log("VerifyPage useEffect ran");
  const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);

  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserVerification = async (code) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/github?code=${code}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("customJWT")}`,
          },
          // credentials: "include",
        }
      );
      console.log("fetchUserVerification response", response);

      if (!response.ok) {
        throw new Error("fetchUserVerification response failed");
      }

      const data = await response.json();
      console.log("fetchUserVerification data", data);

      if (!data) {
        throw new Error("fetchUserVerification data : No Data");
      }

      localStorage.setItem("authenticatedUser", JSON.stringify(data));
      setAuthenticatedUser(data);
    } catch (error) {
      console.error("fetchUserVerification error", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
      navigate(".", { replace: true });
    }
  };

  useEffect(() => {
    console.log("VerifyPage useEffect ran");

    const code = searchParams.get("code");
    console.log("VerifyPage useEffect code:", code);

    if (!code) {
      console.log("VerifyPage useEffect IF BLOCK [1]");
      return;
    }

    if (code) {
      console.log("VerifyPage useEffect IF BLOCK [2] code:", code);
      fetchUserVerification(code);
      return;
    }
  }, []);

  return (
    <Box my={2}>
      <Typography variant={"pagetitle"}>Verification Page</Typography>
      <Box
        display={"grid"}
        rowGap={2}
        mt={2}
        p={2}
        border={consistentBorder}
        borderRadius={consistentBorderRadius}
        bgcolor={consistentBgColor}
        boxShadow={consistentBoxShadow}
        sx={{
          backdropFilter: consistentBackdropFilter,
        }}>
        <Typography>
          STAR is only accessible to members of the{" "}
          <Link
            href="https://codeyourfuture.io/"
            target={"_blank"}
            underline={"hover"}>
            CodeYourFuture
          </Link>{" "}
          community.
        </Typography>
        <Typography>
          Once you have logged in with Google, your account will be{" "}
          <Typography component={"span"} fontWeight={600} color={"primary"}>
            Unverified
          </Typography>{" "}
          by default.
        </Typography>
        <Typography>
          For your account to be{" "}
          <Typography component={"span"} fontWeight={600} color={"primary"}>
            Verified
          </Typography>{" "}
          we will make a{" "}
          <Typography component={"span"} fontWeight={600}>
            one time check
          </Typography>{" "}
          to see if you are a part of the{" "}
          <Link
            href={"https://github.com/CodeYourFuture"}
            target={"_blank"}
            underline={"hover"}>
            CodeYourFuture GitHub Organization
          </Link>
        </Typography>
        <Typography>
          If successful you will be granted access to STAR!
        </Typography>
        <Box>
          <Box>
            <Button
              endIcon={
                isLoading ? (
                  <RotateRightRoundedIcon />
                ) : error ? (
                  <WarningRoundedIcon />
                ) : (
                  <SendRoundedIcon />
                )
              }
              disabled={authenticatedUser && authenticatedUser.roleId > 1}
              component={RouterLink}
              to={`https://github.com/login/oauth/authorize?client_id=${
                import.meta.env.VITE_GITHUB_CLIENT_ID
              }&scope=read:user read:org`}
              variant="contained">
              Verify Me
            </Button>
          </Box>
          {error && (
            <Typography mt={1} color={"error"}>
              Error: {error}
            </Typography>
          )}
        </Box>
        {authenticatedUser && (
          <>
            <Box>
              <Typography>Name: {authenticatedUser.firstName}</Typography>
              <Typography>
                Verification Status:{" "}
                <Typography
                  component={"span"}
                  fontWeight={600}
                  color={"primary"}>
                  {authenticatedUser.roleId === 1 ? "Unverified" : "Verified"}
                </Typography>
              </Typography>
            </Box>
            {authenticatedUser.roleId > 1 && (
              <Box>
                <Button
                  component={NavLink}
                  to={"/profile"}
                  variant={"contained"}>
                  Verified! Continue...
                </Button>
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default VerifyPage;
