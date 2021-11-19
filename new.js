require('dotenv').config()
const url = "hello" + process.env.WEATHERTOKEN
console.log(url)
console.log(String(process.env.GEOCODEAPI))