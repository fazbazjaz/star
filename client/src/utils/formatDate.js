const formatDate = (postgresqlTimestamp) => {
  const now = new Date();
  const date = new Date(postgresqlTimestamp);

  const millisecondsDifference = now - date;

  const daysDifference = Math.floor(
    millisecondsDifference / (24 * 60 * 60 * 1000)
  );

  let partOne;

  if (daysDifference === 0) {
    partOne = "today";
  } else if (daysDifference === 1) {
    partOne = "yesterday";
  } else if (daysDifference < 7) {
    partOne = `${daysDifference} days ago`;
  } else if (daysDifference < 30) {
    const weeks = Math.floor(daysDifference / 7);
    partOne = `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
  } else if (daysDifference < 365) {
    const months = Math.floor(daysDifference / 30);
    partOne = `${months} ${months === 1 ? "month" : "months"} ago`;
  } else {
    const years = Math.floor(daysDifference / 365);
    partOne = `${years} ${years === 1 ? "year" : "years"} ago`;
  }

  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const amOrPm = hours >= 12 ? "pm" : "am";
    const formattedHours = (hours % 12 || 12).toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes}${amOrPm}`;
  };

  const partTwo = formatTime(date);

  return `${partOne}, at ${partTwo}`;
};

export default formatDate;
