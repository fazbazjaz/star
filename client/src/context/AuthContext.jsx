import { createContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  const [status, setStatus] = useState(null);
  const [statusLogs, setStatusLogs] = useState([]);

  const setStatusAndLog = (newStatus) => {
    const now = new Date();
    const timestamp = now.toLocaleString();
    setStatus(newStatus);
    setStatusLogs((prevStatusLogs) => [
      ...prevStatusLogs,
      `${timestamp} | ${newStatus}`,
    ]);
  };

  const [error, setError] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  // ----------------------------------------------------------------

  // From "index.html" <script src="https://accounts.google.com/gsi/client" async defer></script>
  // Declare the Global Google Object
  /* global google */

  // ----------------------------------------------------------------

  const getAuthenticatedUser = async () => {
    setStatusAndLog("3️⃣ GET /api/auth/user");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/user`,
        { credentials: "include" }
      );
      // console.log("getAuthenticatedUser response:", response);

      if (!response.ok) {
        throw new Error(
          `3️⃣ GET /api/auth/user Failed ${response.status} ${response.statusText}`
        );
      }

      setStatusAndLog(
        `3️⃣ GET /api/auth/user Response ${response.status} ${response.statusText} ✅`
      );

      const data = await response.json();
      // console.log("getAuthenticatedUser data:", data);
      setStatusAndLog(`3️⃣ GET /api/auth/user Data ✅`);

      return data;
    } catch (error) {
      // console.error("getAuthenticatedUser error:", error);
      setStatusAndLog(`3️⃣ GET /api/auth/user Error ${error}`);
      return error;
    }
  };

  // ----------------------------------------------------------------

  const googleAccountsOAuth2InitCodeClientPopupFlow = async () => {
    // AUTHORIZATION CODE FLOW EXAMPLE:
    // Google Identity Services POPUP UX
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
            // console.log(
            //   "googleAccountsOAuth2InitCodeClientPopupFlow googleAuthorizationCode:",
            //   googleAuthorizationCode
            // );

            // Send the "Authorization Code" to the backend in the Request Header
            // Receive back a JSON Body with CustomJWT
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

            // console.log(
            //   "googleAccountsOAuth2InitCodeClientPopupFlow response:",
            //   response
            // );

            if (!response.ok) {
              throw new Error(
                `googleAccountsOAuth2InitCodeClientPopupFlow response failed ${response.status} ${response.statusText}`
              );
            }

            // const customJWT = await response.json();
            // console.log(
            //   "googleAccountsOAuth2InitCodeClientPopupFlow customJWT:",
            //   customJWT
            // );

            // set the "customJWT" into Local Storage
            // localStorage.setItem("customJWT", customJWT);

            // Send a GET Request to /api/auth/user with our CustomJWT
            // Receive back a JSON Body with User Information
            const user = await getAuthenticatedUser(); // removed argument customJWT
            // console.log(
            //   "googleAccountsOAuth2InitCodeClientPopupFlow user",
            //   user
            // );

            if (!user) {
              throw new Error(
                "googleAccountsOAuth2InitCodeClientPopupFlow no user"
              );
            }

            // Set "authenticatedUser" into Local Storage
            localStorage.setItem("authenticatedUser", JSON.stringify(user));

            // Set the user React State
            setAuthenticatedUser(user);

            // Navigate to the Profile Page
            navigate("/profile");
          } catch (error) {
            console.error(
              "googleAccountsOAuth2InitCodeClientPopupFlow callback error",
              error
            );
            setError(error);
          }
        },
      });

    googleAccountsOAuth2InitCodeClientPopupClient.requestCode();
  };

  // ----------------------------------------------------------------

  const googleAccountsIdInitializeFlow = async () => {
    try {
      setStatusAndLog("1️⃣ google accounts id initialize");

      // This method initializes the Google Sign-In client instance.
      // This instance is responsible for managing the sign-in process
      // and providing callbacks for when the user signs in or signs out.
      // The initialize method takes an object as an argument, which is used to configure the client.
      await google.accounts.id.initialize({
        client_id: `${import.meta.env.VITE_GOOGLE_CLIENT_ID}`,
        // itp_support: itpSupportBoolean(),
        callback: async (googleIdTokenResponse) => {
          setStatusAndLog("1️⃣ getting idToken from Google...");

          // Receive the Google ID Token from Google
          const googleIdToken = googleIdTokenResponse.credential;

          setStatusAndLog(
            `1️⃣ received idToken 🎫 from Google: ~${googleIdToken.slice(-6)} ✅`
          );

          // Send the "Google ID Token" to the backend in the Request Header
          // Receive back an HTTP-Only Cookie with CustomJWT

          setStatusAndLog("2️⃣ POST /api/auth/google/idtoken");

          let response;
          try {
            response = await fetch(
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
            // console.log("googleAccountsIdInitializeFlow response:", response);
          } catch (error) {
            setStatusAndLog(
              `2️⃣ ❌ POST /api/auth/google/idtoken Failed ${error}`
            );
            throw new Error(error);
          }

          setStatusAndLog(
            `2️⃣ POST /api/auth/google/idtoken Response ${response.status} ${response.statusText} ✅`
          );
          setStatusAndLog(
            "2️⃣ POST /api/auth/google/idtoken Received customJWT 🍪 ✅"
          );

          let user;
          try {
            user = await getAuthenticatedUser();
            // console.log("googleAccountsIdInitializeFlow user", user);
          } catch (error) {
            setStatusAndLog(`3️⃣ ❌ getAuthenticatedUser Failed ${error}`);
            throw new Error(error);
          }

          setStatusAndLog(`3️⃣ authenticatedUser 👤 ${user.firstName} ✅`);

          // Set "authenticatedUser" into LocalStorage
          localStorage.setItem("authenticatedUser", JSON.stringify(user));

          // Set the user React State
          setAuthenticatedUser(user);

          setStatusAndLog("↩️ login complete!");

          // Navigate to the Profile Page
          // navigate("/profile");
        },
      });

      // This method triggers the Google Sign-In prompt.
      // This prompt will display a modal window that allows the user to sign in to their Google account.
      // Once the user has signed in, the callback function specified in the initialize method will be called.
      // The callback function will be passed an object containing information about the signed-in user.
      await google.accounts.id.prompt((notification) => {
        // console.log("googleAccountsIdPrompt notification:", notification);
        setStatusAndLog(
          `1️⃣ google.accounts.id.prompt notification : ${JSON.stringify(
            notification
          )}`
        );

        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // console.log(
          //   "googleAccountsIdPrompt notification.getNotDisplayedReason():",
          //   notification.getNotDisplayedReason()
          // );

          setStatusAndLog(
            `1️⃣ google accounts id prompt notification ${notification.getNotDisplayedReason()}`
          );

          // Remove the "g_state" Cookie that Google Sign In creates
          document.cookie =
            "g_state=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

          const notDisplayedReason = notification.getNotDisplayedReason();
          // browser_not_supported;
          // invalid_client;
          // missing_client_id;
          // opt_out_or_no_session * secure_http_required;
          // suppressed_by_user;
          // unregistered_origin;
          // unknown_reason;
          if (notDisplayedReason === "opt_out_or_no_session") {
            // If we reach here we cannot login with One Tap...
            // So we have to use another flow...

            setStatusAndLog(
              "1️⃣ google accounts id prompt failed... using oauth2popup"
            );

            googleAccountsOAuth2InitCodeClientPopupFlow();
          }
        }
      });
    } catch (error) {
      setStatusAndLog(`❌ Outer Catch Error ${error}`);
    }
  };

  // ----------------------------------------------------------------

  // eslint-disable-next-line
  const googleAccountsOAuth2InitCodeClientRedirectFlow = () => {
    // AUTHORIZATION CODE FLOW EXAMPLE:
    // Google Identity Services REDIRECT UX
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
  };

  // ----------------------------------------------------------------

  const login = async () => {
    if (location !== "/auth") {
      navigate("/auth");
    }
    setStatusAndLog("↪️ logging in...");
    googleAccountsIdInitializeFlow();
  };

  // ----------------------------------------------------------------

  const logout = () => {
    // Remove the "g_state" Cookie that Google Sign In creates
    document.cookie =
      "g_state=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Clear the "customJWT" from Local Storage
    // localStorage.removeItem("customJWT");

    // Clear the "authenticatedUser" from Local Storage
    localStorage.removeItem("authenticatedUser");

    // Clear the authenticatedUser React State
    setAuthenticatedUser(null);

    setStatus(null);
    setStatusLogs([]);

    // Navigate to the Home Page
    // navigate("/");
  };

  // ----------------------------------------------------------------

  const contextValue = {
    login,
    logout,
    authenticatedUser,
    status,
    statusLogs,
    setStatusLogs,
    error,
  };

  // ----------------------------------------------------------------

  useEffect(() => {
    // Get "authenticatedUser" from LocalStorage
    const authenticatedUserLocalStorage = JSON.parse(
      localStorage.getItem("authenticatedUser")
    );

    // If there is no "authenticatedUser"
    if (!authenticatedUserLocalStorage) {
      // Remove the "customJWT" from Local Storage
      // localStorage.removeItem("customJWT");
      return;
    }

    const now = Date.now();
    const customJWTExpirationTime =
      authenticatedUserLocalStorage.expirationTime * 1000;
    const isCustomJWTExpired = customJWTExpirationTime <= now;

    // If there is an "authenticatedUser" but the CustomJWT has expired
    if (authenticatedUserLocalStorage && isCustomJWTExpired) {
      // Remove the "customJWT" from Local Storage
      // localStorage.removeItem("customJWT");
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

  // ----------------------------------------------------------------

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
