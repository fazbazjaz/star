import { AuthProvider } from "../context/AuthContext";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../themes/Theme";
import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/material";
import Header from "../components/Header";
// import AuthState from "../components/AuthState";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import { consistentPageBackgroundImage } from "../themes/ConsistentStyles";
import { SortProvider } from "../context/SortContext";

const RootLayout = () => {
  return (
    <>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box
            minHeight={"100vh"}
            display={"grid"}
            gridTemplateRows={"auto 1fr auto"}>
            <Header />
            {/* <AuthState /> */}
            <Box
              px={2}
              sx={{
                backgroundImage: consistentPageBackgroundImage,
                backgroundSize: "cover",
                backgroundPositionX: "center",
                backgroundAttachment: "fixed",
                backgroundRepeat: "no-repeat",
              }}>
              <Box maxWidth={1200} mx={"auto"}>
                <SortProvider>
                  <Outlet />
                </SortProvider>
              </Box>
            </Box>
            <Footer />
          </Box>
        </ThemeProvider>
      </AuthProvider>
    </>
  );
};

export default RootLayout;
