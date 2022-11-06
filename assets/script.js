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
            fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + data[0].lat + '&lon=' + data[0].lon + '&appid=' + key)
        .then(function(resp) { return resp.json() })
        .then(function(data) {
            console.log(data)
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${data.city.coord.lat}&lon=${data.city.coord.lon}&appid=${key}`)
        .then(function(resp) { return resp.json()})
        .then(function(data) {
            console.log(data)
        })
        }
    )})

}