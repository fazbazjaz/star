import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import { getCookieValue } from "../utils/getCookieValue";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // Declare the Global Google Object
  // from "index.html" <script src="https://accounts.google.com/gsi/client" async defer></script>
  /* global google */

  // Store the "user" Cookie in State
  const [userCookie, setUserCookie] = useState(null);

  const navigate = useNavigate();

  const login = useCallback(async () => {
    // Display the Google Sign In Prompt
    google.accounts.id.prompt();
  }, []);

  const logout = useCallback(() => {
    // Remove the "user" Cookie from the Browser
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Clear the userCookie React State
    setUserCookie(null);

    // Navigate to the Home Page
    navigate("/");
  }, [navigate]);

  const getUserCookieFromBrowser = useCallback(() => {
    // Try to retrieve the "user" Cookie from the Browser
    const userCookieFromBrowser = getCookieValue("user");

    // If there is no "user" Cookie return null
    if (
      !userCookieFromBrowser ||
      typeof userCookieFromBrowser === "undefined"
    ) {
      return null;
    }

    // Parse the Cookie into a JavaScript Object
    const userDataFromUserCookie = JSON.parse(userCookieFromBrowser);

    return userDataFromUserCookie;
  }, []);

  const fetchCustomJWTCookie = useCallback(async (googleIdToken) => {
    try {
      // Send the Google ID Token to the backend in the Request Header
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/google/idtoken`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${googleIdToken}`,
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw response;
      }
    } catch (error) {
      console.error("AuthContext fetchCustomJWTCookie error:", error);
    }
  }, []);

  const initializeGoogleSignIn = useCallback(async () => {
    console.log("initializeGoogleSignIn STARTED");
    google.accounts.id.initialize({
      client_id: `${import.meta.env.VITE_GOOGLE_CLIENT_ID}`,
      callback: async (googleIdTokenResponse) => {
        try {
          const googleIdToken = googleIdTokenResponse.credential;

          // Send the Goole ID Token to the backend, then receive:
          // [1] an HTTP Only Cookie "customJWT"
          // [2] a Cookie "user"
          await fetchCustomJWTCookie(googleIdToken);

          // Get the "user" Cookie from the Browser
          const userCookie = getUserCookieFromBrowser();

          if (!userCookie) {
            throw "No user Cookie found in the Browser";
          }

          // Set the "user" Cookie into React State
          setUserCookie(userCookie);

          // Navigate to the Profile Page
          navigate("/profile");
        } catch (error) {
          console.error(
            "AuthContext initializeGoogleSignIn callback error",
            error
          );
        }
      },
    });
  }, [fetchCustomJWTCookie, getUserCookieFromBrowser, navigate]);

  useEffect(() => {
    // On Page Load

    // Try to retrieve the "user" Cookie from the Browser
    const existingUserCookie = getUserCookieFromBrowser();
    console.log("useEffect existingUserCookie:", existingUserCookie);

    // if the "user" Cookie exists
    if (existingUserCookie) {
      // set the "user" Cookie into React State
      setUserCookie(existingUserCookie);

      // navigate to the Profile Page
      navigate("/profile");
    }

    // if there is no "user" Cookie
    if (!existingUserCookie) {
      // Initialize the Google Sign In Client
      initializeGoogleSignIn();
    }
  }, [getUserCookieFromBrowser, initializeGoogleSignIn, navigate]);

  const contextValue = useMemo(
    () => ({
      login,
      logout,
      userCookie,
    }),
    [login, logout, userCookie]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
