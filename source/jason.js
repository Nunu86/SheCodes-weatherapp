function displayCurrenttemp(response) {
  let output = Math.round(response.data.temperature.current);
  let output1 = Math.round(response.data.temperature.humidity);
  let output2 = Math.round(response.data.wind.speed);
  let output3 = response.data.condition.description;

  let tempValue = document.querySelector("#currenttemp");
  let tempValue1 = document.querySelector("#hum");
  let tempValue2 = document.querySelector("#wind");
  let tempValue3 = document.querySelector("#cdescription");

  tempValue.innerHTML = output;
  tempValue1.innerHTML = output1;
  tempValue2.innerHTML = output2;
  tempValue3.innerHTML = output3;

  let iconAdd = document.querySelector("#fluffy-clouds");

  iconAdd.innerHTML = `<img src="${response.data.condition.icon_url}"></img>`;
}

function changeElements(event) {
  event.preventDefault();
  let enterCity = document.querySelector("input.tile-input");
  let realCity = enterCity.value;

  let apiKey = "8ab570aff7t8c4d757b9f03613oab792";
  let theLink = `https://api.shecodes.io/weather/v1/current?query=${realCity}&key=${apiKey}`;

  axios.get(theLink).then(displayCurrenttemp);

  let changeFrance = document.querySelector("h1");
  changeFrance.innerHTML = realCity;
}

let searchButton = document.querySelector("form");
searchButton.addEventListener("submit", changeElements);

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
