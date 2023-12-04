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
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  const navigate = useNavigate();

  // ----------------------------------------------------------------

  // From "index.html" <script src="https://accounts.google.com/gsi/client" async defer></script>
  // Declare the Global Google Object
  /* global google */

  // ----------------------------------------------------------------

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
      console.log("fetchUser response:", JSON.stringify(response));
      if (!response.ok) {
        throw new Error(
          `Error: ${response.status} ${response.statusText} : fetchUser failed`
        );
      }
      const data = await response.json();
      console.log("fetchUser data:", JSON.stringify(data));
      return data;
    } catch (error) {
      console.error("AuthProvider fetchUser error:", error);
    }
  }, []);

  // ----------------------------------------------------------------

  const itpSupportBoolean = () => {
    const userAgent = navigator.userAgent;
    console.log("itpSupportBoolean userAgent:", userAgent);

    // get the User's Operating System
    let operatingSystem;

    if (userAgent.includes("Win")) {
      operatingSystem = "Windows";
    } else if (userAgent.includes("Mac OS")) {
      operatingSystem = "Mac OS";
    } else if (userAgent.includes("iOS")) {
      operatingSystem = "iOS";
    } else if (userAgent.includes("Linux")) {
      operatingSystem = "Linux";
    } else if (userAgent.includes("Android")) {
      operatingSystem = "Android";
    } else {
      operatingSystem = "Unknown";
    }
    console.log("itpSupportBoolean operatingSystem:", operatingSystem);

    // get the User's Browser
    let browser;

    if (userAgent.includes("Chrome")) {
      browser = "Chrome";
    } else if (userAgent.includes("Firefox")) {
      browser = "Firefox";
    } else if (userAgent.includes("Safari")) {
      browser = "Safari";
    } else if (userAgent.includes("Edge")) {
      browser = "Edge";
    } else {
      browser = "Unknown";
    }
    console.log("itpSupportBoolean browser:", browser);

    // get the User's phone (if any)
    let phone;

    if (userAgent.includes("iPhone")) {
      phone = "iPhone";
    } else {
      phone = "Unknown";
    }
    console.log("itpSupportBoolean phone:", phone);

    // if the User is on IOS or has an iPhone then return true
    if (operatingSystem === "iOS" || phone === "iPhone") {
      console.log("itpSupportBoolean Return True");
      return true;
    } else {
      console.log("itpSupportBoolean Return False");
      return false;
    }
  };

  // ----------------------------------------------------------------

  // eslint-disable-next-line
  const googleAccountsIdInitializeFlow = useCallback(async () => {
    google.accounts.id.initialize({
      client_id: `${import.meta.env.VITE_GOOGLE_CLIENT_ID}`,
      // itp_support: itpSupportBoolean(),
      callback: async (googleIdTokenResponse) => {
        try {
          console.log(
            "googleAccountsIdInitializeFlow googleIdTokenResponse:",
            JSON.stringify(googleIdTokenResponse)
          );

          // Receive the Google ID Token from Google
          const googleIdToken = googleIdTokenResponse.credential;
          console.log(
            "googleAccountsIdInitializeFlow googleIdToken:",
            JSON.stringify(googleIdTokenResponse.credential)
          );

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
          console.log(
            "googleAccountsIdInitializeFlow response:",
            JSON.stringify(response)
          );

          console.log(
            "googleAccountsIdInitializeFlow response.status",
            response.status
          );

          console.log(
            "googleAccountsIdInitializeFlow response.statusText",
            response.statusText
          );

          if (!response.ok) {
            throw new Error(
              `Error: ${response.status} ${response.statusText} : googleAccountsIdInitializeFlow response failed`
            );
          }

          // Send a GET Request to /api/auth/user including our CustomJWT
          // Receive back a JSON body of User Information
          const user = await fetchUser();
          console.log(
            "googleAccountsIdInitializeFlow user",
            JSON.stringify(user)
          );

          if (!user) {
            throw new Error("googleAccountsIdInitializeFlow no user");
          }

          // Set "authenticatedUser" into LocalStorage
          localStorage.setItem("authenticatedUser", JSON.stringify(user));

          // Set the authenticatedUser React State
          setAuthenticatedUser(user);

          // Navigate to the Profile Page
          navigate("/profile");
        } catch (error) {
          console.error("googleAccountsIdInitializeFlow callback error", error);
        }
      },
    });

    google.accounts.id.prompt((notification) => {
      console.log(
        "googleAccountsIdPrompt notification:",
        JSON.stringify(notification)
      );
      console.log(
        "googleAccountsIdPrompt notification.getNotDisplayedReason():",
        JSON.stringify(notification.getNotDisplayedReason())
      );
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        console.log(
          "googleAccountsIdPrompt notification.getNotDisplayedReason():",
          JSON.stringify(notification.getNotDisplayedReason())
        );
        // Remove the "g_state" Cookie that Google Sign In creates
        document.cookie =
          "g_state=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      }
    });
  }, [fetchUser, navigate]);

  // ----------------------------------------------------------------

  // eslint-disable-next-line
  const googleAccountsOAuth2InitCodeClientPopupFlow = useCallback(async () => {
    // AUTHORIZATION CODE FLOW EXAMPLE:

    // GIS POPUP UX

    // This example shows only the Google Identity Service JavaScript library using
    // the AUTHORIZATION CODE model a POPUP dialog for user consent and callback handler
    // to receive the authorization code from Google.
    // It is provided to illustrate the minimal number of steps required to
    // configure a client, obtain consent and send an authorization code to your backend platform.

    const googleAccountsOAuth2InitCodeClientPopupClient =
      google.accounts.oauth2.initCodeClient({
        client_id: `${import.meta.env.VITE_GOOGLE_CLIENT_ID}`,
        scope: "profile email openid",
        ux_mode: "popup",
        callback: async (googleAuthorizationCodeResponse) => {
          try {
            const googleAuthorizationCode =
              googleAuthorizationCodeResponse.code;
            console.log(
              "googleAccountsOAuth2InitCodeClientPopupFlow googleAuthorizationCode:",
              googleAuthorizationCode
            );

            // send the "Authorization Code" to the backend in the Request Header
            // and Receive back an HTTP-Only Cookie with a CustomJWT inside
            const response = await fetch(
              `${
                import.meta.env.VITE_SERVER_URL
              }/api/auth/google/authorizationcode`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${googleAuthorizationCode}`,
                },
                credentials: "include",
              }
            );
            console.log(
              "googleAccountsOAuth2InitCodeClientPopupFlow response:",
              response
            );

            if (!response.ok) {
              throw new Error(
                `Error: ${response.status} ${response.statusText} : googleAccountsOAuth2InitCodeClientPopupFlow response failed`
              );
            }

            // Send a GET Request to /api/auth/user including our CustomJWT
            // Receive back a JSON body of User Information
            const user = await fetchUser();

            if (!user) {
              throw new Error(
                "googleAccountsOAuth2InitCodeClientPopupFlow no user"
              );
            }

            // Set "authenticatedUser" into LocalStorage
            localStorage.setItem("authenticatedUser", JSON.stringify(user));

            // Set the authenticatedUser React State
            setAuthenticatedUser(user);

            // Navigate to the Profile Page
            navigate("/profile");
          } catch (error) {
            console.error(
              "googleAccountsOAuth2InitCodeClientPopupFlow callback error",
              error
            );
          }
        },
      });

    googleAccountsOAuth2InitCodeClientPopupClient.requestCode();
  }, [fetchUser, navigate]);

  // ----------------------------------------------------------------

  // eslint-disable-next-line
  const googleAccountsOAuth2InitCodeClientRedirectFlow =
    useCallback(async () => {
      // AUTHORIZATION CODE FLOW EXAMPLE:

      // GIS REDIRECT UX

      // Authorization Code model supports the "popup" and "redirect" UX modes
      // to send a per user authorization code to the endpoint hosted by your platform.
      // The redirect UX mode is shown here:

      const googleAccountsOAuth2InitCodeClientRedirect =
        google.accounts.oauth2.initCodeClient({
          client_id: `${import.meta.env.VITE_GOOGLE_CLIENT_ID}`,
          scope: "profile email openid",
          ux_mode: "redirect",
          redirect_uri: `${
            import.meta.env.VITE_SERVER_URL
          }/api/auth/google/authorizationcode`,
        });

      googleAccountsOAuth2InitCodeClientRedirect.requestCode();

      // After this we are redirected back to the Client Homepage...
      // Need to then handle making a fetchUser() request to get the User information...
      // (?) Or change the specific authController Handler to redirect to the other route /api/auth/user and then finally redirect back to the client...(?)
    }, []);

  const login = useCallback(async () => {
    // const needsItp = itpSupportBoolean();
    // if (!needsItp) {
    //   console.log("------ USING MODE [1]");
    //   googleAccountsIdInitializeFlow();
    // } else {
    //   console.log("------ USING MODE [3]");
    //   // googleAccountsOAuth2InitCodeClientPopupFlow();
    //   googleAccountsOAuth2InitCodeClientRedirectFlow();
    // }
    googleAccountsIdInitializeFlow();
    // googleAccountsOAuth2InitCodeClientPopupFlow();
  }, [
    googleAccountsIdInitializeFlow,
    // googleAccountsOAuth2InitCodeClientPopupFlow,
    // googleAccountsOAuth2InitCodeClientRedirectFlow,
  ]);

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
      login,
      logout,
      authenticatedUser,
    }),
    [login, logout, authenticatedUser]
  );

  useEffect(() => {
    // Get "authenticatedUser" from LocalStorage
    const authenticatedUserLocalStorage = JSON.parse(
      localStorage.getItem("authenticatedUser")
    );

    // If there is no "authenticatedUser"
    if (!authenticatedUserLocalStorage) {
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
      return;
    }

    // there is an "authenticatedUser" and the CustomJWT is still valid
    if (authenticatedUserLocalStorage && !isCustomJWTExpired) {
      // If there is an "authenticatedUser"
      // Update the authenticatedUser React State with that user
      setAuthenticatedUser(authenticatedUserLocalStorage);
      return;
    }
  }, []);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
