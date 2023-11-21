// -------------------------------------------
// github.com/bazmurphy : This is a living document of my Research into modern Google Auth
// -------------------------------------------

import { getCookieValue } from "../utils/getCookieValue";

const useGoogleAuth = ({ setUserCookie, navigate }) => {
  // setToken, setUser

  // -------------------------------------------

  // Declare the global google object
  // which is loaded by the <head> <script> in "index.html"
  // <script src="https://accounts.google.com/gsi/client" async defer></script>
  // for use inside this Context

  /* global google */

  // -------------------------------------------

  const googleIdTokenClientCallback = async (googleIdTokenClientResponse) => {
    const googleIdToken = googleIdTokenClientResponse.credential;
    // console.log("googleIdToken:", googleIdToken);

    // send the "ID Token" to the backend in the Request Header
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/auth/google/idtoken`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${googleIdToken}`,
        },
        credentials: "include", // include HTTP-Only Cookie with customJWT
      }
    );
    // console.log("googleIdTokenClientCallback response:", response);

    // handle fetch error here
    if (!response.ok) {
      console.error(response);
      return;
    }

    // --------------------------------------------------------------

    // customJWT in Response Body Version

    // const data = await response.json();
    // console.log("googleIdTokenClientCallback data:", data);

    // const customJWT = data.customJWT;
    // // console.log("customJWT:", customJWT);

    // // set the token in Local Storage
    // localStorage.setItem("token", customJWT);

    // // get the payload from the token
    // const customJWTPayload = customJWT.split(".")[1];
    // // console.log("payload:", payload);

    // // decode the token payload
    // const customJWTDecodedPayload = JSON.parse(atob(customJWTPayload));
    // // console.log("decodedPayload", decodedPayload);

    // // set the token React State
    // setToken(customJWT);

    // // set the user React State
    // setUser(customJWTDecodedPayload);

    // --------------------------------------------------------------

    // customJWT in HTTP-Only Cookie Version

    // Retrieve the user Cookie
    const userCookieFromBrowser = getCookieValue("user");
    // console.log("userCookieFromBrowser:", userCookieFromBrowser);

    // Parse the Cookie into a JavaScript Object
    const userDataFromUserCookie = JSON.parse(userCookieFromBrowser);
    // console.log("userDataFromUserCookie:", userDataFromUserCookie);

    // set the userCookie React State
    setUserCookie(userDataFromUserCookie);

    // --------------------------------------------------------------

    // redirect to the Profile Page
    navigate("/profile");
  };

  // -------------------------------------------

  const loginGoogleIdToken = async () => {
    // Google Sign-In JavaScript API
    // https://developers.google.com/identity/gsi/web/reference/js-reference

    // google.accounts.id.initialize()
    // This method initializes the Google Sign-In client instance.
    // This instance is responsible for managing the sign-in process
    // and providing callbacks for when the user signs in or signs out.
    // The initialize method takes an object as an argument, which is used to configure the client.

    google.accounts.id.initialize({
      client_id: `${import.meta.env.VITE_GOOGLE_CLIENT_ID}`,
      callback: googleIdTokenClientCallback,
    });

    // google.accounts.id.prompt()

    // This method triggers the Google Sign-In prompt.
    // This prompt will display a modal window that allows the user to sign in to their Google account.
    // Once the user has signed in, the callback function specified in the initialize method will be called.
    // The callback function will be passed an object containing information about the signed-in user.

    google.accounts.id.prompt();

    // google.accounts.id.revoke()
    // This method revokes the OAuth grant used to share the ID token for the specified user.

    // google.accounts.id.revoke(user.google_id, (done) => {
    //   console.log(done);
    // });

    // render a Google Sign In Button
    // google.accounts.id.renderButton(
    //   document.getElementById("button-container"),
    //   {
    //     client_id: "YOUR_GOOGLE_CLIENT_ID",
    //     callback: someCallBackFunction,
    //   }
    // );

    // use a Custom Button
    // google.accounts.id.attachButton(document.getElementById("my-button"));
  };

  // -------------------------------------------

  const googleAuthorizationCodePopupClientCallback = async (
    googleAuthorizationCodeResponse
  ) => {
    const googleAuthorizationCode = googleAuthorizationCodeResponse.code;
    // console.log("googleAuthorizationCode:", googleAuthorizationCode);

    // send the "Authorization Code" to the backend in the Request Header
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/auth/google/authorizationcode`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${googleAuthorizationCode}`,
        },
      }
    );
    // console.log("response:", response);

    // handle fetch error here
    if (!response.ok) {
      console.error(response);
      return;
    }

    // --------------------------------------------------------------

    // customJWT in Response Body Version

    // Receive the customJWT (in HTTP-Only Cookie or) in the Response Body
    // const data = await response.json();
    // console.log("data:", data);

    // const customJWT = data.customJWT;
    // console.log("customJWT:", customJWT);

    // set the token in Local Storage
    // localStorage.setItem("token", customJWT);

    // get the payload from the token
    // const customJWTPayload = customJWT.split(".")[1];
    // console.log("payload:", payload);

    // decode the token payload
    // const customJWTDecodedPayload = JSON.parse(atob(customJWTPayload));
    // console.log("decodedPayload", decodedPayload);

    // set the token React State
    // setToken(customJWT);

    // set the user React State
    // setUser(customJWTDecodedPayload);

    // set the userCookie React State
    // setUserCookie(customJWTDecodedPayload);

    // --------------------------------------------------------------

    // customJWT in HTTP-Only Cookie Version

    // Retrieve the user Cookie
    const userCookieFromBrowser = getCookieValue("user");
    // console.log("userCookieFromBrowser:", userCookieFromBrowser);

    // Parse the Cookie into a JavaScript Object
    const userDataFromUserCookie = JSON.parse(userCookieFromBrowser);
    // console.log("userDataFromUserCookie:", userDataFromUserCookie);

    // set the userCookie React State
    setUserCookie(userDataFromUserCookie);

    // --------------------------------------------------------------

    navigate("/profile");
  };

  // -------------------------------------------

  const loginGoogleAuthorizationCodePopup = async () => {
    // AUTHORIZATION CODE FLOW EXAMPLE:

    // GIS POPUP UX

    // This example shows only the Google Identity Service JavaScript library using
    // the AUTHORIZATION CODE model a POPUP dialog for user consent and callback handler
    // to receive the authorization code from Google.
    // It is provided to illustrate the minimal number of steps required to
    // configure a client, obtain consent and send an authorization code to your backend platform.

    // initialise googleAuthorizationCodePopupClient
    const googleAuthorizationCodePopupClient =
      google.accounts.oauth2.initCodeClient({
        client_id: `${import.meta.env.VITE_GOOGLE_CLIENT_ID}`,
        scope: "profile email openid",
        ux_mode: "popup",
        callback: googleAuthorizationCodePopupClientCallback,
      });

    // get AuthorizationCode1
    googleAuthorizationCodePopupClient.requestCode();
  };

  // -------------------------------------------

  const loginGoogleAuthorizationCodeRedirect = async () => {
    // AUTHORIZATION CODE FLOW EXAMPLE:

    // GIS REDIRECT UX

    // Authorization code model supports the popup and redirect UX modes
    // to send a per user authorization code to the endpoint hosted by your platform.
    // The redirect UX mode is shown here:

    // initialise googleAuthorizationCodeRedirectClient
    const googleAuthorizationCodeRedirectClient =
      google.accounts.oauth2.initCodeClient({
        client_id: `${import.meta.env.VITE_GOOGLE_CLIENT_ID}`,
        scope: "profile email openid",
        ux_mode: "redirect",
        redirect_uri: `${
          import.meta.env.VITE_SERVER_URL
        }/api/auth/google/authorizationcode`,
      });

    // Request an access token
    googleAuthorizationCodeRedirectClient.requestCode();
  };

  // -------------------------------------------

  const googleAccessTokenClientCallback = async (googleAccessTokenResponse) => {
    const googleAccessToken = googleAccessTokenResponse.access_token;
    // console.log("googleAccessToken:", googleAccessToken);

    // send the "Access Token" to the backend in the Request Header
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/auth/google/accesstoken`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${googleAccessToken}`,
        },
      }
    );
    // console.log("response:", response);

    const data = await response.json();
    // console.log("data:", data);

    const accessTokenData = data.accessTokenData;
    console.log("accessTokenData:", accessTokenData);
  };

  // -------------------------------------------

  const loginGoogleAccessToken = async () => {
    // IMPLICIT FLOW EXAMPLE: (USING TOKEN MODEL)
    // https://developers.google.com/identity/oauth2/web/guides/use-token-model

    // GIS ONLY

    // This example shows only the Google Identity Service JavaScript library
    // using the TOKEN MODEL and POPUP dialog for user consent.
    // It is provided to illustrate the minimal number of steps required
    // to configure a client, request and obtain an ACCESS TOKEN

    // initialise AccessTokenClient
    const accessTokenClient = google.accounts.oauth2.initTokenClient({
      client_id: `${import.meta.env.VITE_GOOGLE_CLIENT_ID}`,
      scope: "profile email openid",
      callback: googleAccessTokenClientCallback,
    });

    // get AccessToken
    accessTokenClient.requestAccessToken();
  };

  // -------------------------------------------

  return {
    loginGoogleIdToken,
    loginGoogleAuthorizationCodePopup,
    loginGoogleAuthorizationCodeRedirect,
    loginGoogleAccessToken,
  };
};

export default useGoogleAuth;

// -------------------------------------------

// NOTES :

// https://developers.google.com/identity/gsi/web/guides/overview

// Google Identity Services credential

// Important:
// This format applies only to the IMPLICIT FLOW and the Identity Services JavaScript library.
// Credentials obtained by the AUTHORIZATION CODE flow
// through direct calls to Google OAuth 2.0 endpoints from your backend platform
// return ACCESS TOKEN and ID TOKEN together in a single response.

// The Google Identity Services library returns:

// either an ACCESS TOKEN when used for Authorization:

// {
//   "access_token": "ya29.A0ARrdaM_LWSO-uckLj7IJVNSfnUityT0Xj-UCCrGxFQdxmLiWuAosnAKMVQ2Z0LLqeZdeJii3TgULp6hR_PJxnInBOl8UoUwWoqsrGQ7-swxgy97E8_hnzfhrOWyQBmH6zs0_sUCzwzhEr_FAVqf92sZZHphr0g",
//   "token_type": "Bearer",
//   "expires_in": 3599,
//   "scope": "https://www.googleapis.com/auth/calendar.readonly"
// }

// or, an ID TOKEN when used for Authentication:

// {
//   "clientId": "538344653255-758c5h5isc45vgk27d8h8deabovpg6to.apps.googleusercontent.com",
//   "credential": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImMxODkyZWI0OWQ3ZWY5YWRmOGIyZTE0YzA1Y2EwZDAzMjcxNGEyMzciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2MzkxNTcyNjQsImF1ZCI6IjUzODM0NDY1MzI1NS03NThjNWg1aXNjNDV2Z2syN2Q4aDhkZWFib3ZwZzZ0by5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjExNzcyNjQzMTY1MTk0MzY5ODYwMCIsIm5vbmNlIjoiZm9vYmFyIiwiaGQiOiJnb29nbGUuY29tIiwiZW1haWwiOiJkYWJyaWFuQGdvb2dsZS5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXpwIjoiNTM4MzQ0NjUzMjU1LTc1OGM1aDVpc2M0NXZnazI3ZDhoOGRlYWJvdnBnNnRvLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwibmFtZSI6IkJyaWFuIERhdWdoZXJ0eSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQU9oMTRHZ3pwMk1zRkRmb21XTF91Q3pkWFFjc3lTN2RrcUxOcm5PdEtEM1VzUT1zOTYtYyIsImdpdmVuX25hbWUiOiJCcmlhbiIsImZhbWlseV9uYW1lIjoiRGF1Z2hlcnR5IiwiaWF0IjoxNjM5MTU3NTY0LCJleHAiOjE2MzkxNjExNjQsImp0aSI6IjRiOTVkYjAyZjU4NDczMmUxZGJkOTY2NWJiMWYzY2VhYzgyMmI0NjUifQ.Cr-AgMsLFeLurnqyGpw0hSomjOCU4S3cU669Hyi4VsbqnAV11zc_z73o6ahe9Nqc26kPVCNRGSqYrDZPfRyTnV6g1PIgc4Zvl-JBuy6O9HhClAK1HhMwh1FpgeYwXqrng1tifmuotuLQnZAiQJM73Gl-J_6s86Buo_1AIx5YAKCucYDUYYdXBIHLxrbALsA5W6pZCqqkMbqpTWteix-G5Q5T8LNsfqIu_uMBUGceqZWFJALhS9ieaDqoxhIqpx_89QAr1YlGu_UO6R6FYl0wDT-nzjyeF5tonSs3FHN0iNIiR3AMOHZu7KUwZaUdHg4eYkU-sQ01QNY_11keHROCRQ",
//   "select_by": "user"
// };

// -------------------------------------------
