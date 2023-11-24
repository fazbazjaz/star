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
  // From "index.html" <script src="https://accounts.google.com/gsi/client" async defer></script>
  // Declare the Global Google Object
  /* global google */

  // Store the "user" Cookie in React State
  const [userCookie, setUserCookie] = useState(null);

  const navigate = useNavigate();

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

  const fetchCookies = useCallback(async (googleIdToken) => {
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
      console.error("AuthContext fetchCookies error:", error);
    }
  }, []);

  const initializeGoogleSignIn = useCallback(async () => {
    google.accounts.id.initialize({
      client_id: `${import.meta.env.VITE_GOOGLE_CLIENT_ID}`,
      callback: async (googleIdTokenResponse) => {
        try {
          const googleIdToken = googleIdTokenResponse.credential;

          // Send the Goole ID Token to our API, then receive back:
          // [1] an HTTP Only Cookie "customJWT"
          // [2] a Cookie "user"
          await fetchCookies(googleIdToken);

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
  }, [fetchCookies, getUserCookieFromBrowser, navigate]);

  const promptGoogleSignIn = useCallback(async () => {
    google.accounts.id.prompt();
  }, []);

  const login = useCallback(async () => {
    // Display the Google Sign In Prompt
    promptGoogleSignIn();
  }, [promptGoogleSignIn]);

  const logout = useCallback(() => {
    // Remove the "user" Cookie from the Browser
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Remove the "g_state" Cookie Google Sign In Creates
    document.cookie =
      "g_state=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Clear the userCookie React State
    setUserCookie(null);

    // Navigate to the Home Page
    navigate("/");
  }, [navigate]);

  const contextValue = useMemo(
    () => ({
      login,
      logout,
      userCookie,
    }),
    [login, logout, userCookie]
  );

  useEffect(() => {
    // On Page Load

    // Try to retrieve the "user" Cookie from the Browser
    const existingUserCookie = getUserCookieFromBrowser();
    // console.log("useEffect existingUserCookie:", existingUserCookie);

    // If the "user" Cookie exists
    if (existingUserCookie) {
      // set the "user" Cookie into React State
      setUserCookie(existingUserCookie);

      // Navigate to the Profile Page
      navigate("/profile");
    }

    // If there is no "user" Cookie
    if (!existingUserCookie) {
      // Initialize the Google Sign In Client
      initializeGoogleSignIn();
    }
  }, [getUserCookieFromBrowser, initializeGoogleSignIn, navigate]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
