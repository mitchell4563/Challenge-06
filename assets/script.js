let currentWeatherCard = document.getElementById("currentWeatherCard");
let forecastCards = document.getElementById("forecastCards");
let increm = localStorage.getItem("index") ? localStorage.getItem("index") : 0;
let historyContainer = document.getElementById("searchHistory");
const key = "367d2e7754399aa80a6b2a9dc5f5370c";
document.getElementById("searchButton").addEventListener("click", main);

function main() {
  getWeather();
  addToHistory();
}
function getWeather() {
  let cityName = document.getElementById("searchBar").value;
  document.getElementById("currentTitle").innerHTML = "Current Weather in " + cityName;
  document.getElementById("forecastTitle").innerHTML = "5 Day Forecast";
  fetch(
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
      cityName +
      "&appid=" +
      key
  )
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      console.log(data);
      if (data[0] == undefined) {
        alert("Enter a valid city");
      } else
        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&units=imperial&appid=${key}`
        )
          .then(function (resp) {
            return resp.json();
          })
          .then(function (data) {
            console.log(data);
            fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${data.city.coord.lat}&lon=${data.city.coord.lon}&units=imperial&appid=${key}`
            )
              .then(function (resp) {
                return resp.json();
              })
              .then(function (data) {
                console.log(data);
                currentWeatherCard.innerText = "";

                let createWeatherDiv = document.createElement("div");
                currentWeatherCard.appendChild(createWeatherDiv);
                createWeatherDiv.classList.add("card");
                createWeatherDiv.classList.add("m-3");
                let currentWeatherMain = document.createElement("div");
                createWeatherDiv.appendChild(currentWeatherMain);
                createWeatherDiv.classList.add("card-body");
                let currentWeatherResp = data.main;
                let dateFormat = moment(currentWeatherResp.dt).format(
                  "MMM Do, YYYY"
                );
                let currentDate = "Date: " + dateFormat;
                let currentTemp = "Current Temp: " + data.main.temp + "°F";
                let currentHumidity = "Current Humidity: " + data.main.humidity;
                let currentWind =
                  "Current Wind Speed: " + data.wind.speed + " mph";
                let currentWeatherID = data.weather[0].icon;
                let currentWeatherImage = document.createElement("img");
                currentWeatherImage.src =
                  "https://openweathermap.org/img/wn/" +
                  currentWeatherID +
                  "@" +
                  "2x.png";
                currentWeatherMain.innerHTML =
                  currentDate +
                  "<br/>" +
                  currentTemp +
                  "<br/>" +
                  currentHumidity +
                  "<br/>" +
                  currentWind +
                  "<br/>";
                currentWeatherMain.append(currentWeatherImage);
                currentWeatherCard.style.maxWidth = "35vh";
              });
            forecastCards.innerText = "";
            for (i = 0; i <= 39; i++) {
              if (i % 8 === 0) {
                let forecastDiv = document.createElement("div");
                forecastCards.appendChild(forecastDiv);
                let forecastBody = document.createElement("div");
                forecastDiv.appendChild(forecastBody);
                forecastBody.classList.add("card-body");
                forecastBody.classList.add("card");
                let forecastData = data.list[i];
                let dateFormatted = moment(forecastData.dt_txt).format(
                  "MMM Do, YYYY"
                );
                forecastBody.append("Date: " + dateFormatted + "\n");
                forecastBody.append(
                  "Temp: " + forecastData.main.temp + "°F" + "\n"
                );
                forecastBody.append(
                  "Humidity: " + forecastData.main.humidity + " %" + "\n"
                );
                forecastBody.append(
                  "Wind Speed: " + forecastData.wind.speed + " MPH"
                );
                let weatherID = forecastData.weather[0].icon;
                let createImage = document.createElement("img");
                createImage.src =
                  "https://openweathermap.org/img/wn/" +
                  weatherID +
                  "@" +
                  "2x.png";
                forecastBody.append(createImage);
                createImage.style.maxHeight = "10vh";
                createImage.style.maxWidth = "10vh";
                forecastCards.style.minWidth = "35vh";
                forecastCards.classList.add("m-3");
                forecastCards.classList.add("d-inline-flex");
                forecastBody.classList.add("m-3");
              }
            }
          });
    });
}

function addToHistory() {
  let cityName = document.getElementById("searchBar").value;
  increm++;
  localStorage.setItem("index", increm);
  localStorage.setItem(increm, cityName);
  // interval to check if new item in localstorage
  setInterval(function () {
    historyContainer.innerText = "";
    // history handler using localstorage. uses previous incrememnted index stored in localstorage
    for (var i = localStorage.index; i > 0; i--) {
      // returns only 5 items from local storage
      if (i === localStorage.index - 5) {
        break;
      } else { 
        var searchHistoryItem = localStorage[i];
        // creates html and styling
        var lineItem = document.createElement("button");
        historyContainer.appendChild(lineItem);
        lineItem.classList.add("bg-dark");
        lineItem.classList.add("text-white");
        lineItem.classList.add("btn");
        lineItem.classList.add("m-1");
        lineItem.classList.add("p-2");
        lineItem.classList.add("previousSearch");
        lineItem.setAttribute("id", "history", +i);
        lineItem.innerText = searchHistoryItem;
      }
    }
  }, 3000);
}

// interval to add event listeners to history buttons and any newly added history buttons
setInterval(() => {
  var allHistoryButtons = document.querySelectorAll("button.previousSearch");
  // eventlistener for history buttons
  allHistoryButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      document.getElementById("searchBar").value = this.innerText;
      document.getElementById("searchButton").click();
    });
  });
}, 1000);
