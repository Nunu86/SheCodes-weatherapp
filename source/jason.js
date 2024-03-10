function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Weds", "Thurs", "Fri", "Sat"];

  return days[date.getDay()];
}
function displayForcast(response) {
  console.log(response.data);
  let forcastElements = document.querySelector("#forcastElements");

  let duplicateDays = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 7) {
      duplicateDays =
        duplicateDays +
        `<div id="week-days">${formatDay(day.time)}</div>
        <div id="week-icons"><img src=${day.condition.icon_url}></img></div>
        <div id="week-temperatures"><strong>${Math.round(
          day.temperature.maximum
        )}°</strong> ${Math.round(day.temperature.minimum)}°</div>`;
    }
  });
  forcastElements.innerHTML = duplicateDays;
}

function displayCurrenttemp(response) {
  let output = Math.round(response.data.temperature.current);
  let output1 = Math.round(response.data.temperature.humidity);
  let output2 = Math.round(response.data.wind.speed);
  let output3 = response.data.condition.description;
  let cityElement = document.querySelector("#city");

  let tempValue = document.querySelector("#currenttemp");
  let tempValue1 = document.querySelector("#hum");
  let tempValue2 = document.querySelector("#wind");
  let tempValue3 = document.querySelector("#cdescription");
  cityElement.innerHTML = response.data.city;

  tempValue.innerHTML = output;
  tempValue1.innerHTML = output1;
  tempValue2.innerHTML = output2;
  tempValue3.innerHTML = output3;

  let iconAdd = document.querySelector("#fluffy-clouds");

  iconAdd.innerHTML = `<img src="${response.data.condition.icon_url}"></img>`;

  getForcast(response.data.city);
}
function getCity(city) {
  let apiKey = "8ab570aff7t8c4d757b9f03613oab792";
  let theLink = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(theLink).then(displayCurrenttemp);
}

function changeElements(event) {
  event.preventDefault();
  let enterCity = document.querySelector("input.tile-input");
  getCity(enterCity.value);
}
let searchButton = document.querySelector("form");
searchButton.addEventListener("submit", changeElements);

let changeFrance = document.querySelector("h1");
changeFrance.innerHTML = `response.data.city`;

function getForcast(city) {
  let apiKey = "8ab570aff7t8c4d757b9f03613oab792";
  let forcastapiLink = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios.get(forcastapiLink).then(displayForcast);
}
getCity("paris");

function revealDate() {
  let todaysDate = new Date();
  let displayDay = todaysDate.getDay();
  let displayTime = todaysDate.getHours();
  let displayMins = todaysDate.getMinutes();

  let dayArray = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let realDay = dayArray[displayDay];
  return `${realDay} ${displayTime}:${displayMins}`;
}
let realDate = revealDate();
let insertDate = document.querySelector("#dateMap");
insertDate.innerHTML = realDate;
