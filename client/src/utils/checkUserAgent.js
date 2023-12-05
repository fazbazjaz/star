const checkUserAgent = () => {
  const userAgent = navigator.userAgent;
  console.log("checkUserAgent userAgent:", userAgent);

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
  console.log("checkUserAgent operatingSystem:", operatingSystem);

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
  console.log("checkUserAgent browser:", browser);

  return { operatingSystem, browser };
};

export default checkUserAgent;
