//Set the base url of API and key values
const API = {
    KEY: "ad67b4e252f0b62fb174eddd1d2f6ed1",
    BASE_URL: "https://api.openweathermap.org/data/2.5/weather"
}

let searchElement = document.querySelector(".search-box");

searchElement.addEventListener("keypress", setCityName);

//Method to get city name
function setCityName(e) {
    if (e.keyCode == 13) {
        fetchWeatherData(searchElement.value)
    }
}

//Method to get weather data for a given city
function fetchWeatherData(city) {
    fetch(`${API.BASE_URL}?q=${city}&appid=${API.KEY}&units=metric`)
        .then((res) => res.json())
        .then(res => displayResults((res)))
}

//Method to display the results in the weather forecast application 
function displayResults(weatherData) {
    let city = document.querySelector(".city")
    city.innerText = `${weatherData.name},${weatherData.sys.country}`
    let date = new Date();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    let currentDate = `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`

    let dateElement = document.querySelector(".date")
    dateElement.innerText = currentDate;

    let temperature = document.querySelector(".temp")
    temperature.innerText = Math.round(weatherData.main.temp) + "°c"

    let waether = document.querySelector(".weather")
    weatherData.innerText = weatherData.weather[0].main

    let hilow = document.querySelector(".hi-low")
    hilow.innerText = Math.round(weatherData.main.temp_min) + "°c / " + Math.round(weatherData.main.temp_max) + "°c"
}