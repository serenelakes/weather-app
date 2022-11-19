//Date&Time

function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return weekDays[day];
}

//Forecast

function displayForecast(response) {
  console.log(response.data);
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5)
      forecastHTML =
        forecastHTML +
        `
        <div class="col">  
         <div class="card">
            <div class="card-body">
              <div class="weather-forecast-date">${formatDay(
                forecastDay.dt
              )}</div>
              <img src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
                   alt=""
                   width="42"
               />
              <div class="degree">${Math.round(forecastDay.temp.day)}°</div>
            </div>
          </div>
        </div>  
          `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "17ad6e67aa629189f73b053634668b20";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric
`;
  axios.get(apiUrl).then(displayForecast);
}

//Search engine for Cityname + real Temperature

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#weatherDescription").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#temperature-number").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  celciusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

function searchCity(cityname) {
  let apiKey = "17ad6e67aa629189f73b053634668b20";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityname = document.querySelector("#Search-city-input").value;
  searchCity(cityname);
}

function searchLocation(position) {
  let apiKey = "17ad6e67aa629189f73b053634668b20";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature-number");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelciusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-number");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

//CALL
let celciusTemperature = null;

let dateTime = document.querySelector("#date");
let currentTime = new Date();
dateTime.innerHTML = formatDate(currentTime);

let form = document.querySelector("#Cityname-form");
form.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelciusTemperature);

searchCity("San Francisco");
