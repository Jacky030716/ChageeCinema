export const formatTime = (time) => {
    const hours = time.substring(0, 2)
    const min = time.substring(2, 4)

    if(hours > 12) {
      return `${hours - 12}:${min} PM`
    } else {
      return `${hours}:${min} AM`
    }
  }

export const getExactDay = (d) => {
  const [year, month, day] = d.split('/');
  const date = new Date(Date.UTC(year, month - 1, day));

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const dayIndex = new Date(date.toLocaleString("en-US", { timeZone: "Asia/Kuala_Lumpur" })).getDay();

  return daysOfWeek[dayIndex];
}

export const getDay = (d) => {
  const [year, month, day] = d.split('/');
  const date = new Date(Date.UTC(year, month - 1, day));
  const dayInMalaysia = new Date(date.toLocaleString("en-US", { timeZone: "Asia/Kuala_Lumpur" })).getDate();

  return dayInMalaysia < 10 ? `0${dayInMalaysia}` : `${dayInMalaysia}`;
}

export const getMonth = (d) => {
  const [year, month, day] = d.split('/');
  const date = new Date(Date.UTC(year, month - 1, day));
  const monthInMalaysia = new Date(date.toLocaleString("en-US", { timeZone: "Asia/Kuala_Lumpur" })).getMonth();

  const monthsOfYear = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  return monthsOfYear[monthInMalaysia];
}

// Format the date into MON dd MMM
export const getFullShowTime = (d) => {
  return `${getExactDay(d)} ${getDay(d)} ${getMonth(d)}`
}