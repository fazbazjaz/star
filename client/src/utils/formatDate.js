const formatDate = (date) => {
  date = new Date(date);
  const now = new Date();
  const difference = now - date;
  const daysAgo = Math.floor(difference / (1000 * 60 * 60 * 24));
  let years = 0;
  let months = 0;
  if (daysAgo > 365) {
    years = Math.floor(daysAgo / 365);
  }
  const left = daysAgo - years * 365;
  if (left > 30) {
    months = Math.floor(left / 30);
  }
  const days = left - months * 30;
  const hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  const ampm = hours >= 12 ? "pm" : "am";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const yearsPart = years ? `${years} years ago, ` : ``;
  const monthsPart = months ? `${months} months ago, ` : ``;
  let daysPart = days ? `${days} days ago, ` : `today, `;
  const nowTime = new Date().getHours();
  if (nowTime < 12 && ampm === "pm") {
    daysPart = `yesterday, `;
  }
  const timePart = `at ${formattedHours}.${minutes} ${ampm}`;
  return yearsPart + monthsPart + daysPart + timePart;
};

export default formatDate;
