import { useContext, useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { AuthContext } from "../context/AuthContext";

const AuthPage = () => {
  const { login, statusLogs, setStatusLogs, authenticatedUser } =
    useContext(AuthContext);

  const [cookieStatus, setCookieStatus] = useState(document.cookie);

  const clearCookies = () => {
    const cookies = document.cookie.split(";");
    cookies.forEach((cookie) => {
      const equals = cookie.indexOf("=");
      const name = equals > -1 ? cookie.substring(0, equals) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    });
    setCookieStatus(document.cookie);
  };

  useEffect(() => {
    setCookieStatus(document.cookie);
  }, [login]);

  return (
    <Box display={"grid"} gap={2}>
      <Typography variant={"pagetitle"}>Auth Page</Typography>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}>
        <Box>
          <Typography fontWeight={600}>Cookies:</Typography>
          <Box>
            <Typography component={"span"} fontSize={{ xs: 10, sm: 12 }}>
              document.cookie :
            </Typography>
            <Typography
              component={"span"}
              color={"primary"}
              fontSize={{ xs: 12, sm: 14 }}>
              {cookieStatus}
            </Typography>
          </Box>
        </Box>
        <Button variant={"contained"} onClick={clearCookies}>
          Clear Cookies
        </Button>
      </Box>
      <Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}>
          <Typography fontWeight={600}>
            AuthProvider State &quot;status&quot; logs:
          </Typography>
          <Button variant={"contained"} onClick={() => setStatusLogs([])}>
            Clear Logs
          </Button>
        </Box>
        <Box mt={2}>
          {statusLogs &&
            statusLogs.map((log, index) => (
              <Box key={index}>
                <Typography component={"span"} fontSize={{ xs: 10, sm: 12 }}>
                  {log.split("|")[0]}
                </Typography>
                <Typography
                  component={"span"}
                  color={"primary"}
                  fontSize={{ xs: 12, sm: 14 }}>
                  {log.split("|")[1]}
                </Typography>
              </Box>
            ))}
        </Box>
      </Box>
      <Box>
        <Typography fontWeight={600}>
          AuthProvider State &quot;authenticatedUser&quot;
        </Typography>
        <Box>
          {!authenticatedUser && (
            <Typography fontSize={{ xs: 10, sm: 12 }}>null</Typography>
          )}
          {authenticatedUser && (
            <>
              {Object.entries(authenticatedUser).map((entry, index) => (
                <Box key={index}>
                  <Typography component={"span"} fontSize={{ xs: 10, sm: 12 }}>
                    {entry[0]} :
                  </Typography>
                  <Typography
                    component={"span"}
                    color={"primary"}
                    fontSize={{ xs: 12, sm: 14 }}>
                    {entry[1] ? entry[1] : ""}
                  </Typography>
                </Box>
              ))}
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AuthPage;
