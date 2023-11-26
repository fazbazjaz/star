export const formatDate = (date) => {
  date = new Date(date);
  const now = new Date();
  const difference = now - date;

  const daysAgo = Math.floor(difference / (1000 * 60 * 60 * 24));

  if (daysAgo === 0) {
    // Today
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    return `today, at ${formattedHours}.${
      minutes < 10 ? "0" : ""
    }${minutes}${ampm}`;
  } else if (daysAgo === 1) {
    // Yesterday
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    return `yesterday, at ${formattedHours}.${
      minutes < 10 ? "0" : ""
    }${minutes}${ampm}`;
  } else {
    // 2+ Days Ago
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

    return `${daysAgo} days ago, at ${formattedHours}.${
      minutes < 10 ? "0" : ""
    }${minutes}${ampm}`;
  }
};
