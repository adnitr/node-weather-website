const request = require('postman-request')

const forecast = (lat, lon, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=metric&appid=5cc0ff0e63fb368b3af9bae8d315d9d7'

    request({url, json:true}, (err, {body}={}) => {
        if(err) {
            callback('Unable to connect to the waether service!', undefined)
        } else if(body.message) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.weather[0].description + ". It is currently " + body.main.temp + " degrees out. It feels like " + body.main.feels_like + " degrees out.")
        }
    })
}

module.exports = forecast