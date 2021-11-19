const request = require('request');

const getGeocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoibmFnYXdlajQ0IiwiYSI6ImNrdzF0anU5bTIxZHEydXBobnp5N3NncmwifQ.W38cA2TM8ew5Wx-36T2IlA"

    request({ url: url, json: true }, (err, res) => {
        if (err) {
            callback("Error connecting to server", undefined)
        } else if (res.body.features.length === 0) {
            // console.log("Lon: ", res.body.features[0].center[0])
            // console.log("Lat: ", res.body.features[0].center[1])
            callback("Error finding the location", undefined)
        } else {

            callback(undefined, {
                latitude: res.body.features[0].center[1],
                longitude: res.body.features[0].center[0]
            })
        }
        // getForecast(res.body.features[0].center[1], res.body.features[0].center[0])
    })
}

const getForecast = (lat, lon, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=17cd29c00e364ac59242a377c5e7f8e7&query=" + encodeURIComponent(lat) + "," + encodeURIComponent(lon) + "&units=m"

    request({ url: url, json: true }, (err, res) => {
        if (err) {
            callback("Error connecting to the server", undefined)
        } else if (res.body.error) {
            callback("Error fetching the temperature", undefined)
        } else {

            const data = {
                forecast: `Currently it is ${res.body.current.temperature} deg Cel. and is looking ${res.body.current.weather_descriptions}. Have a Nice Day!!!`,
                location: res.body.location.region,
                country: res.body.location.country

            }
            callback(undefined, data)
        }
        // display()
    })
}

module.exports = {
    getGeocode: getGeocode,
    getForecast: getForecast
}