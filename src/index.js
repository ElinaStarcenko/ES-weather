let now = new Date();

function showDate(date) {
  let now = new Date();
  let days = [
    `Sunday`,
    `Monday`,
    `Tuesday`,
    `Wednesday`,
    `Thursday`,
    `Friday`,
    `Saturday`,
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let currentDate = `${day} ${hours}:${minutes}`;
  document.querySelector("#current-date").innerHTML = currentDate;
}
showDate();

function displayWeatherCelsius(response) {
  document.querySelector("#search-location").innerHTML = response.data.name;
  let temp = Math.round(response.data.main.temp);
  document.querySelector("#temp-celsius").innerHTML = temp;
  document.querySelector("#temp-fahrenheit").innerHTML = Math.round(
    temp * 1.8 + 32
  );
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );

  document.querySelector("#current-max").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#current-min").innerHTML = Math.round(
    response.data.main.temp_min
  );

  let sunrise = response.data.sys.sunrise;
  sunriseUnix = new Date(sunrise * 1000);
  let sunriseHour = sunriseUnix.getUTCHours();
  if (sunriseHour < 10) {
    sunriseHour = `0${sunriseHour}`;
  }
  let sunriseMinutes = sunriseUnix.getUTCMinutes();
  if (sunriseMinutes < 10) {
    sunriseMinutes = `0${sunriseMinutes}`;
  }
  document.querySelector(
    "#sunrise"
  ).innerHTML = `${sunriseHour}:${sunriseMinutes}`;

  let sunset = response.data.sys.sunset;
  sunsetUnix = new Date(sunset * 1000);
  let sunsetHour = sunsetUnix.getUTCHours();
  if (sunsetHour < 10) {
    sunsetHour = `0${sunsetHour}`;
  }
  let sunsetMinutes = sunsetUnix.getUTCMinutes();
  if (sunsetMinutes < 10) {
    sunsetMinutes = `0${sunsetMinutes}`;
  }
  document.querySelector(
    "#sunset"
  ).innerHTML = `${sunsetHour}:${sunsetMinutes}`;

  document.querySelector("#weather-now").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
}
function showLocation(position) {
  let apiKey = `c7778887358d1dad0433321d20c8c574`;
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?`;
  let units = `metric`;
  let apiUrl = `${apiEndpoint}lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherCelsius);
}
function sendLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}
function search(city) {
  let apiKey = `c7778887358d1dad0433321d20c8c574`;
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?`;
  let units = `metric`;
  let apiUrl = `${apiEndpoint}q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherCelsius);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#users-input").value;
  search(city);
}
function makeLatvian(event) {
  event.preventDefault();
  let now = new Date();
  let days = [
    `Svētdiena`,
    `Pirmdiena`,
    `Otrdiena`,
    `Trešdiena`,
    `Ceturtdiena`,
    `Piektdiena`,
    `Sestdiena`,
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let currentDate = `${day} ${hours}:${minutes}`;
  document.querySelector("#current-date").innerHTML = currentDate;
  document.querySelector(".sunrise").innerHTML = `Saullēkts:`;
  document.querySelector(".sunset").innerHTML = `Saulriets:`;
  document.querySelector(".feels").innerHTML = `Jūtās:`;
  document.querySelector(".humidity").innerHTML = `Mitrums:`;
  document.querySelector(".wind").innerHTML = `Vējš:`;
}
function makeEnglish(event) {
  location.reload();
}
function makeRussian(event) {
  event.preventDefault();
  let now = new Date();
  let days = [
    `Воскресенье`,
    `Понедельник`,
    `Вторник`,
    `Среда`,
    `Четверг`,
    `Пятница`,
    `Суббота`,
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let currentDate = `${day} ${hours}:${minutes}`;
  document.querySelector("#current-date").innerHTML = currentDate;
  document.querySelector(".sunrise").innerHTML = `Восход:`;
  document.querySelector(".sunset").innerHTML = `Закат:`;
  document.querySelector(".feels").innerHTML = `По ощущениям:`;
  document.querySelector(".humidity").innerHTML = `Влажность:`;
  document.querySelector(".wind").innerHTML = `Скорость ветра:`;
}
let currentLocation = document.querySelector("#location-button");
currentLocation.addEventListener("click", sendLocation);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("riga");

let inLatvian = document.querySelector("#in-latvian-button");
inLatvian.addEventListener("click", makeLatvian);

let inEnglish = document.querySelector("#in-english-button");
inEnglish.addEventListener("click", makeEnglish);

let inRussian = document.querySelector("#in-russian-button");
inRussian.addEventListener("click", makeRussian);
