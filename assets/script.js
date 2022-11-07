let currentWeatherCard = document.getElementById('currentWeatherCard')
let forecastCards = document.getElementById('forecastCards')
document.getElementById('searchButton').addEventListener('click', getCity)
const key = '367d2e7754399aa80a6b2a9dc5f5370c';

function getCity() {
    let cityName = document.getElementById('searchBar').value
    fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&appid=' + key)
    .then(function(resp) { return resp.json() })
    .then(function(data) { 
        console.log(data)
        if (data[0] == undefined) {
            alert("Enter a valid city")
        } else
            fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + data[0].lat + '&lon=' + data[0].lon + '&units=imperial' + '&appid=' + key)
        .then(function(resp) { return resp.json() })
        .then(function(data) {
            console.log(data)
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${data.city.coord.lat}&lon=${data.city.coord.lon}&units=imperial&appid=${key}`)
        .then(function(resp) { return resp.json()})
        .then(function(data) {
            console.log(data)
            currentWeatherCard.innerText = ''

            let createWeatherDiv = document.createElement('div')
            currentWeatherCard.appendChild(createWeatherDiv)
            createWeatherDiv.classList.add('card')
            createWeatherDiv.classList.add('m-3')
            let currentWeatherMain = document.createElement('div')
            createWeatherDiv.appendChild(currentWeatherMain)
            createWeatherDiv.classList.add('card-body')
            let currentWeatherResp = data.main
            let dateFormat = moment(currentWeatherResp.dt).format('MMM Do, YYYY')
            let currentDate = ('Current Date: ' + dateFormat)
            let currentTemp = ('Current Temp: ' + data.main.temp + '°F')
            let currentHumidity = ('Current Humidity: ' + data.main.humidity)
            let currentWind = ('Current Wind Speed: ' + data.wind.speed + ' mph')
            let currentWeatherID = data.weather[0].icon
            let currentWeatherImage = document.createElement('img')
            currentWeatherImage.src = "https://openweathermap.org/img/wn/" + currentWeatherID + '@' + '2x.png'
            currentWeatherMain.innerHTML = currentDate + '<br/>' + currentTemp + '<br/>' + currentHumidity + '<br/>' + currentWind + '<br/>'
            currentWeatherMain.append(currentWeatherImage)
      
        })
        
    
    
        }
    )})

}