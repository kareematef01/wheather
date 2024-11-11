let userLocation = document.getElementById("userLocation")
let btnFind = document.getElementById("btnFind")
let todayName = document.getElementById("todayName")
let todayMonth = document.getElementById("todayMonth")
let todayNumber = document.getElementById("todayNumber")
let nextdayName = document.querySelectorAll(".nextdayName")
let nextDayNumber = document.querySelectorAll(".nextDayNumber")
let nextDayMonth = document.querySelectorAll(".nextDayMonth")
let todayImg = document.getElementById("todayImg")
let todayTemperature = document.getElementById("todayTemperature")
let todayDescription = document.getElementById("todayDescription")
let todayLocation = document.getElementById("todayLocation")
let humidity = document.getElementById("humidity")
let winds = document.getElementById("winds")
let windDir = document.getElementById("windDir")
let tomorrowName = document.getElementById("tomorrowName")
let tomorrowImage = document.querySelectorAll(".tImg")
let tomorrowMaxTemperature = document.querySelectorAll(".maxTemp")
let tomorrowMinTemperature = document.querySelectorAll(".minTemp")
let tomorrowDescription = document.querySelectorAll(".des")


if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(function (Position) {
        const latitude = Position.coords.latitude
        const longitude = Position.coords.longitude
        startApp(`${latitude},${longitude}`)
    });
} else {

    window.alert("Geolocation is not supported by this browser.");

}

startApp()

btnFind.addEventListener("click", function () {
    startApp(userLocation.value);
})

userLocation.addEventListener("input", function () {
    startApp(userLocation.value);
})



async function getWeatherData(city) {
    let wheatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=30d82410954e4d9c9b6182356240511&q=${city}&days=3&aqi=no&alerts=no
`)
    let wheatherData = await wheatherResponse.json()

    return wheatherData
}

async function startApp(city = "london") {
    let wheatherData = await getWeatherData(city)
    if (!wheatherData.error) {
        displayTodayWheather(wheatherData)
        displaytommorow(wheatherData)
    }

}

function displayTodayWheather(data) {
    let tDate = new Date()
    todayName.innerHTML = tDate.toLocaleDateString("en-US", { weekday: "long" })
    todayMonth.innerHTML = tDate.toLocaleDateString("en-US", { month: "long" })
    todayNumber.innerHTML = tDate.getDate()
    todayLocation.innerHTML = data.location.name;
    todayTemperature.innerHTML = data.current.temp_c + "°C"
    todayImg.setAttribute('src', "https:" + data.current.condition.icon)
    todayDescription.innerHTML = data.current.condition.text
    humidity.innerHTML = data.current.humidity + "%"
    winds.innerHTML = data.current.wind_kph + "km/h"
    windDir.innerHTML = data.current.wind_dir
}

function displaytommorow(data) {
    let tommorwData = data.forecast.forecastday

    for (let i = 0; i < 2; i++) {
        let nextDate = new Date(tommorwData[i + 1].date)
        nextdayName[i].innerHTML = nextDate.toLocaleDateString("en-US", { weekday: "long" })
        nextDayNumber[i].innerHTML = nextDate.getDate()
        nextDayMonth[i].innerHTML = nextDate.toLocaleDateString("en-US", { month: "long" })
        tomorrowMaxTemperature[i].innerHTML = tommorwData[i + 1].day.maxtemp_c + "°C"
        tomorrowMinTemperature[i].innerHTML = tommorwData[i + 1].day.mintemp_c + "°C"
        tomorrowDescription[i].innerHTML = tommorwData[i + 1].day.condition.text
        tomorrowImage[i].setAttribute("src", "https:" + tommorwData[i + 1].day.condition.icon)

    }
}





