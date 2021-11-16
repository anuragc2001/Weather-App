const request = require('request');

const getGeocode = (address) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoibmFnYXdlajQ0IiwiYSI6ImNrdzF0anU5bTIxZHEydXBobnp5N3NncmwifQ.W38cA2TM8ew5Wx-36T2IlA"

    request({ url: url, json: true }, (err, res) => {
        if (err) {
            console.log(err)
        } else {
            // console.log("Lon: ", res.body.features[0].center[0])
            // console.log("Lat: ", res.body.features[0].center[1])
        }
        getWeather(res.body.features[0].center[1], res.body.features[0].center[0])
    })
}

const getWeather = (lat, lon) => {
    const url = "http://api.weatherstack.com/current?access_key=17cd29c00e364ac59242a377c5e7f8e7&query=" + encodeURIComponent(lat) + "," + encodeURIComponent(lon) + "&units=m"

    request({ url: url, json: true }, (err, res) => {
        if (err) {
            console.log(err)
        } else {
            // display()
            const result = `Currently it is ${res.body.current.temperature} deg Cel. in ${res.body.location.name}, ${res.body.location.region}, ${res.body.location.country} and is looking ${res.body.current.weather_descriptions}. Have a Nice Day!!!`

            console.log(result)
        }
    })
}

module.exports = {
    getGeocode: getGeocode,
    getWeather: getWeather
}