const times = document.querySelectorAll(".time");
const countDownDate = new Date(2022, 11, 12, 10, 30, 00); // Here 11 denote 'December' because day and month start from zero.

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const eventDay = countDownDate.getDay();
const eventDate = countDownDate.getDate();
const eventMonth = countDownDate.getMonth();
const eventYear = countDownDate.getFullYear();
let eventHours = countDownDate.getHours();
let eventMins = countDownDate.getMinutes();

//Convert event text clock format 24 Hours into 12 Hours format
eventHours = eventHours > 12 ? eventHours - 12 : eventHours;
let ampm = eventHours >= 12 ? "pm" : "am";

//When event Hours and Mins is less than 10 then add 0
eventHours = eventHours < 10 ? "0" + eventHours : eventHours;
eventMins = eventMins < 10 ? "0" + eventMins : eventMins;

//Event text
const eventText = (document.getElementById(
  "eventText"
).innerHTML = `Giveaway Ends On ${days[eventDay]}, ${eventDate} ${months[eventMonth]} ${eventYear} ${eventHours}:${eventMins} ${ampm}`);

const numFormat = function (num) {
  return num < 10 ? `0${num}` : num;
};

function getCountDown() {
  const eventTime = countDownDate.getTime();
  const currentTime = new Date().getTime();
  let timeDiff = eventTime - currentTime;

  const oneSec = 1000;
  const oneMin = oneSec * 60;
  const oneHour = oneMin * 60;
  const oneDay = oneHour * 24;

  let remDays = Math.floor(timeDiff / oneDay);
  let remHours = Math.floor((timeDiff % oneDay) / oneHour);
  let remMins = Math.floor((timeDiff % oneHour) / oneMin);
  let remSecs = Math.floor((timeDiff % oneMin) / oneSec);

  const timeValues = [remDays, remHours, remMins, remSecs];

  times.forEach(function (counterBox, index) {
    counterBox.textContent = numFormat(timeValues[index]);
  });

  stopInterval(remHours, remMins, remSecs);
}

let limitInterval = setInterval(getCountDown, 1000);

function stopInterval(remHours, remMins, remSecs) {
  if (remHours <= 0 && remMins <= 0 && remSecs <= 0) {
    clearInterval(limitInterval);
  }
}
