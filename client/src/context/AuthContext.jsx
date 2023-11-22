import {
  createContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import useGoogleAuth from "../hooks/useGoogleAuth";
import { getCookieValue } from "../utils/getCookieValue";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // store the userCookie in state
  const [userCookie, setUserCookie] = useState(null);

  // Necessary for redirecting after logout
  const navigate = useNavigate();

  // get the Google Auth Methods
  const {
    loginGoogleIdToken,
    // loginGoogleAuthorizationCodePopup,
    // loginGoogleAuthorizationCodeRedirect,
    // loginGoogleAccessToken,
  } = useGoogleAuth({ setUserCookie, navigate }); // setToken, setUser,

  useEffect(() => {
    // Try to retrieve the "user" Cookie if it exists
    const userCookieFromBrowser = getCookieValue("user");
    // console.log("userCookieFromBrowser:", userCookieFromBrowser);

    // Parse the Cookie into a JavaScript Object
    const userDataFromUserCookie = JSON.parse(userCookieFromBrowser);
    // console.log("userDataFromUserCookie:", userDataFromUserCookie);

    if (userDataFromUserCookie) {
      setUserCookie(userDataFromUserCookie);
    }
  }, []);

  const login = useCallback(async () => {
    // choose one of the Google Auth Methods to use
    await loginGoogleIdToken();
    // await loginGoogleAuthorizationCodePopup();
    // await loginGoogleAuthorizationCodeRedirect();
    // await loginGoogleAccessToken();
  }, []);

  const logout = useCallback(() => {
    // Remove the "user" Cookie from the Browser
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // clear the userCookie React state
    setUserCookie(null);
    // Redirect to the Home Page
    navigate("/");
  }, []);

  const contextValue = useMemo(
    () => ({
      userCookie,
      login,
      logout,
    }),
    [userCookie]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
