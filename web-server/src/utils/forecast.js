const request = require('postman-request');

const forecast = (lat,long,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=aa2d5d380524770d2f4dc5d287dbdebb&query='+ lat + ',' + long

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to forecast services',undefined)
        } else if(body.error) {
            callback('Unable to find the forecast for given location!',undefined)
        } else {
            callback(undefined,"It's currently " + body.current.temperature +
             " degress out. It feels like " + body.current.feelslike + " degress out. Current humidity is " + body.current.humidity + '%.')
        }
    })
}

module.exports = forecast