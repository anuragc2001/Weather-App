const request = require("request")
const weather = require("./utils")

const getWeather = function () {
    weather.getGeocode(process.argv[2])
}

getWeather();
