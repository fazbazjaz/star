const getCookieValue = (cookieName) => {
  const cookieString = document.cookie;
  // console.log("cookieString:", cookieString);

  const cookies = cookieString.split(";");
  // console.log("cookies:", cookies);

  const foundCookie = cookies.find((cookie) =>
    cookie.trim().startsWith(`${cookieName}=`)
  );
  // console.log("foundCookie:", foundCookie);

  // If a matching cookie is found, extract and return its value
  if (foundCookie) {
    const [name, encodedValue] = foundCookie
      .trim()
      .split("=")
      .map((part) => part.trim());
    // console.log(`name:${name} encodedValue:${encodedValue}`);

    if (name === cookieName) {
      try {
        // Decode the URL-encoded value
        // And remove the leading "j:"
        const decodedValue = decodeURIComponent(encodedValue).replace(
          /^j:/,
          ""
        );
        // console.log("decodedValue:", decodedValue);
        return decodedValue;
      } catch (error) {
        console.error("Error decoding cookie value:", error);
        return null;
      }
    }
  }

  return null;
};

export default getCookieValue;
