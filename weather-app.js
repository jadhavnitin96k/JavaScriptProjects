const myApi = {
  myApiKey: "17e0480b73715a6e67aca8f10a7907d9",
  myApiURL: "https://api.openweathermap.org/data/2.5/onecall?",
};
let latitude;
let longitude;
let units = "metric";
let symbols = "&#8451";
let windSpeedUnit = "m/s";

const weatherIcon = document.getElementById("weatherIcon");
const generalDetails = document.getElementById("generalDetails");
const humidityAndOther = document.getElementById("humidityAndOther");
const weatherDetails = document.getElementById("weatherSituation");
const sunriseSunset = document.querySelectorAll("div > span");
const showTemp = document.querySelectorAll("td");
const dates = document.getElementById("dates");

navigator.geolocation.getCurrentPosition(showPosition, showError);
function showPosition(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  getDetails();
}
function showError(err) {
  alert("Location not found" + err);
  return;
}
let i = 0; //This variable use to change 8-day data(0 to 7)

//Change data celsius to fahrenheit
showTemp.forEach(function (e) {
  e.addEventListener("click", function () {
    if (units === "metric") {
      units = "imperial";
      symbols = "&#8457";
      windSpeedUnit = "mph";
    } else {
      units = "metric";
      symbols = "&#8451";
      windSpeedUnit = "m/s";
    }
    getDetails();
  });
});

function getDetails() {
  fetch(
    `${myApi.myApiURL}lat=${latitude}&lon=${longitude}&appid=${myApi.myApiKey}&units=${units}`
  )
    .then(function (apiData) {
      return apiData.json();
    })
    .then(function (apiData) {
      chooseOneDate(apiData);
    })
    .catch(function (e) {
      alert(e);
    });
}

//Show 8-days row
function chooseOneDate(apiData) {
  for (let index = 0; index < apiData?.daily.length; index++) {
    const date = document.createElement("li");

    date.innerText = new Date(
      apiData.daily[index].dt * 1000
    ).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "2-digit",
    });

    dates.appendChild(date);
    if (index === 0) {
      date.classList.add("actives");
    }
    changeDate(date, index, apiData);
  }
  storeApiData(apiData, i);
}

function changeDate(date, index, apiData) {
  date.addEventListener("click", function () {
    i = index;
    storeApiData(apiData, i);
  });

  const activeDate = document.querySelectorAll("li");
  activeDate.forEach(function (e) {
    e.addEventListener("click", function () {
      activeDate.forEach(function (allElement) {
        allElement.classList.remove("actives");
        e.classList.add("actives");
      });
    });
  });
}

function storeApiData(apiData, i) {
  const storeData = {
    dew_point: apiData.daily[i]?.dew_point,
    humidity: apiData.daily[i]?.humidity ?? "NA",
    clouds: apiData.daily[i]?.clouds ?? "NA",
    sunrise: apiData.daily[i]?.sunrise,
    sunset: apiData.daily[i]?.sunset,
    uvi: apiData.daily[i]?.uvi ?? "NA",
    pressure: apiData.daily[i]?.pressure ?? "NA",
    wind_speed: apiData.daily[i]?.wind_speed ?? "NA",
    descriptionTitle: apiData.daily[i].weather?.[0]?.main ?? "NA",
    description: apiData.daily[i].weather?.[0]?.description ?? "NA",
    icon: apiData.daily[i].weather?.[0]?.icon,
    afternoonTemp: apiData.daily[i].temp?.day,
    eveTemp: apiData.daily[i].temp?.eve,
    maxTemp: apiData.daily[i].temp?.max,
    minTemp: apiData.daily[i].temp?.min,
    mornTemp: apiData.daily[i].temp?.morn,
    nightTemp: apiData.daily[i].temp?.night,
    feelAfternoonTemp: apiData.daily[i].feels_like?.day,
    feelEveTemp: apiData.daily[i].feels_like?.eve,
    feelMornTemp: apiData.daily[i].feels_like?.morn,
    feelNightTemp: apiData.daily[i].feels_like?.night,
  };
  showWeatherDetails(storeData);
}

//Show weather details in app
function showWeatherDetails(storeData) {
  //Show weather condition icon
  weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${storeData.icon}@2x.png"
  alt="Weather-image"/>`;

  //Show weather situation text with description
  weatherDetails.innerHTML = `<div class="weather-situation">${
    storeData.descriptionTitle
  },${storeData.description}</div>
 <div>The high will be ${Math.round(storeData.maxTemp)}${symbols},
 the low will be ${Math.round(storeData.minTemp)}${symbols}.</div>`;

  //Show general weather details
  generalDetails.innerHTML = `Cloud: ${storeData.clouds} &nbsp &nbsp Wind Speed: ${storeData.wind_speed}${windSpeedUnit} 
   &nbsp &nbsp Pressure: ${storeData.pressure}hPa`; //&nbsp use for add some space.
  humidityAndOther.innerHTML = `Humidity: ${
    storeData.humidity
  }% &nbsp &nbsp UV: ${storeData.uvi} 
  &nbsp &nbsp Dew point: ${Math.round(storeData.dew_point)} ${symbols}`;

  //Show all teamperaturs
  const allDayTemp = [
    storeData.mornTemp,
    storeData.afternoonTemp,
    storeData.eveTemp,
    storeData.nightTemp,
    storeData.feelMornTemp,
    storeData.feelAfternoonTemp,
    storeData.feelEveTemp,
    storeData.feelNightTemp,
  ];
  showTemp.forEach(function (getElement, index) {
    getElement.innerHTML = `${Math.round(allDayTemp[index])} ${symbols}`;
  });

  //Show Sunrise-Sunset time
  const sunriseSunsetArr = [
    timeHourMin(storeData.sunrise),
    timeHourMin(storeData.sunset),
  ];
  sunriseSunset.forEach(function (getElement, index) {
    getElement.textContent = sunriseSunsetArr[index];
  });
}

//Time convert in HH mm
function timeHourMin(num) {
  const time = new Date(num * 1000).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return time.toLocaleLowerCase();
}
