import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // From "index.html" <script src="https://accounts.google.com/gsi/client" async defer></script>
  // Declare the Global Google Object
  /* global google */

  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  const navigate = useNavigate();

  const fetchCustomJWTCookie = useCallback(async (googleIdToken) => {
    try {
      // Send the Google ID Token to the backend in the Request Header
      // and Receive back an HTTP-Only Cookie with a CustomJWT inside
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
      // console.log("fetchCustomJWTCookie response:", response);
      if (!response.ok) {
        throw new Error(
          `Error: ${response.status} ${response.statusText} : fetchCustomJWTCookie failed`
        );
      }
    } catch (error) {
      console.error("AuthProvider fetchCookieWithCustomJWT error:", error);
    }
  }, []);

  const fetchUser = useCallback(async () => {
    try {
      // Send a Request to the backend with the HTTP-Only Cookie (and CustomJWT inside) automatically included
      // Receive back the User's Information
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/user`,
        {
          credentials: "include",
        }
      );
      // console.log("fetchUser response:", response);
      if (!response.ok) {
        throw new Error(
          `Error: ${response.status} ${response.statusText} : fetchUser failed`
        );
      }
      const data = await response.json();
      // console.log("fetchUser data:", data);
      return data;
    } catch (error) {
      console.error("AuthProvider fetchUser error:", error);
    }
  }, []);

  const initializeGoogleSignIn = useCallback(async () => {
    google.accounts.id.initialize({
      client_id: `${import.meta.env.VITE_GOOGLE_CLIENT_ID}`,
      callback: async (googleIdTokenResponse) => {
        try {
          // Receive the Google ID Token from Google
          const googleIdToken = googleIdTokenResponse.credential;

          // Send the Google ID Token to the backend in the Request Header
          // Receive back an HTTP-Only Cookie with a CustomJWT inside
          await fetchCustomJWTCookie(googleIdToken);

          // Send a GET Request to /api/auth/user including our CustomJWT
          // Receive back a JSON body of User Information
          const user = await fetchUser();

          if (!user) {
            throw new Error("initializeGoogleSignIn callback error - No User");
          }

          // Set "authenticatedUser" into LocalStorage
          localStorage.setItem("authenticatedUser", JSON.stringify(user));

          // Set the authenticatedUser React State
          setAuthenticatedUser(user);

          // Navigate to the Profile Page
          navigate("/profile");
        } catch (error) {
          console.error(
            "AuthProvider initializeGoogleSignIn callback error",
            error
          );
        }
      },
    });
  }, [fetchCustomJWTCookie, fetchUser, navigate]);

  const promptGoogleSignIn = useCallback(async () => {
    google.accounts.id.prompt((notification) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        // Remove the "g_state" Cookie that Google Sign In creates
        document.cookie =
          "g_state=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      }
    });
  }, []);

  // const login = useCallback(async () => {
  //   // Initialize the Google Sign In Client
  //   initializeGoogleSignIn();
  //   // Display the Google Sign In Prompt
  //   promptGoogleSignIn();
  // }, [initializeGoogleSignIn, promptGoogleSignIn]);

  const logout = useCallback(() => {
    // Remove the "g_state" Cookie that Google Sign In creates
    document.cookie =
      "g_state=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Clear the "authenticatedUser" from Local Storage
    localStorage.removeItem("authenticatedUser");

    // Clear the authenticatedUser React State
    setAuthenticatedUser(null);

    // Navigate to the Home Page
    navigate("/");
  }, [navigate]);

  const contextValue = useMemo(
    () => ({
      // initializeGoogleSignIn,
      promptGoogleSignIn,
      logout,
      authenticatedUser,
    }),
    [promptGoogleSignIn, logout, authenticatedUser]
  );

  useEffect(() => {
    // Get "authenticatedUser" from LocalStorage
    const authenticatedUserLocalStorage = JSON.parse(
      localStorage.getItem("authenticatedUser")
    );
    // console.log(authenticatedUserLocalStorage);

    // If there is no "authenticatedUser"
    if (!authenticatedUserLocalStorage) {
      // console.log("trigger second initial GSI");
      // Initialize the Google Sign In Client
      // initializeGoogleSignIn();
      // Call the Login function
      initializeGoogleSignIn();
      return;
    }

    const now = Date.now();
    const customJWTExpirationTime =
      authenticatedUserLocalStorage.expirationTime * 1000;
    const isCustomJWTExpired = customJWTExpirationTime <= now;

    // If there is an "authenticatedUser" but the CustomJWT has expired
    if (authenticatedUserLocalStorage && isCustomJWTExpired) {
      // Remove the "authenticatedUser" from Local Storage
      localStorage.removeItem("authenticatedUser");

      // Initialize the Google Sign In Client
      // initializeGoogleSignIn();
      return;
    }

    // there is an "authenticatedUser" and the CustomJWT is still valid
    if (authenticatedUserLocalStorage && !isCustomJWTExpired) {
      // If there is an "authenticatedUser"
      // Update the authenticatedUser React State with that user
      setAuthenticatedUser(authenticatedUserLocalStorage);
      return;
    }
  }, [initializeGoogleSignIn, promptGoogleSignIn]); // initializeGoogleSignIn

  useEffect(() => {
    // console.log("trigger first initial GSI");
    initializeGoogleSignIn();
  }, [initializeGoogleSignIn]);
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
