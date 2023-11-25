import { Outlet } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import AuthProvider from "../context/AuthContext";
import AuthState from "../components/AuthState";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Box } from "@mui/material";

const RootLayout = () => {
  return (
    <>
      <AuthProvider>
        <CssBaseline />
        <Box
          minHeight={"100vh"}
          display={"grid"}
          gridTemplateRows={"auto auto auto 1fr auto"}
          border={4}>
          <AuthState />
          <Header />
          <Navigation />
          <Outlet />
          <Footer />
        </Box>
      </AuthProvider>
    </>
  );
};

export default RootLayout;
