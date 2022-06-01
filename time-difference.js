function myFunction(firstDate, secondDate) {
  const timeDiff = Math.abs(firstDate - secondDate);

  const oneSec = 1000;
  const oneMin = oneSec * 60;
  const oneHour = oneMin * 60;

  const remHours = Math.floor(timeDiff / oneHour);
  const remMins = Math.floor((timeDiff % oneHour) / oneMin);
  const remSecs = Math.floor((timeDiff % oneMin) / oneSec);

  const myObject = { hrs: remHours, min: remMins, sec: remSecs };
  return myObject;
}

console.log(
  myFunction(
    new Date(2022, 05, 29, 12, 50, 00),
    new Date(2022, 05, 29, 12, 45, 00)
  )
);
console.log(
  myFunction(
    new Date(2022, 05, 29, 10, 50, 00),
    new Date(2022, 05, 29, 12, 45, 00)
  )
);
console.log(
  myFunction(
    new Date(2022, 05, 29, 10, 50, 00),
    new Date(2022, 05, 29, 06, 00, 00)
  )
);
