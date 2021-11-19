const path = require('path');
const express = require("express")
const getWeather = require("./utils/utils")
const port = 3000

const app = express()

const publicDirPath = path.join(__dirname, "../public")

app.set("view engine", "hbs")
app.set("views", path.join(__dirname, "../views"))
app.use(express.static(publicDirPath))


app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }

    getWeather.getGeocode(req.query.address, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            getWeather.getForecast(data.latitude, data.longitude, (err, weatherData) => {
                if (err) {
                    console.log(err)
                } else {
                    res.send({
                        forecast: weatherData.forecast,
                        region: req.query.address,
                        location: weatherData.location,
                        country: weatherData.country
                    })
                    // res.send(weatherData)
                }
            })
        }
    })


    // res.send({
    //     address: req.query.address
    // })
})
app.listen(port, () => {
    console.log(`Port running at ${port}`)
})