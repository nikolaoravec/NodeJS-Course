const request = require('postman-request');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// const url = ''
// request({ url: url, json: true }, (error,response) => {
//     if (error) {
//         console.log("Unable to connect to weather service!");
//     } else if(response.body.error) {
//         console.log("Unable to find location!");
//     } else {
//         console.log("It's currently " + response.body.current.temperature + " degress out. It feels like " + response.body.current.feelslike + " degress out.");
//     }
// })

const location = process.argv[2]

if(location.length === 0){
    console.log("No location provided!");
} else {
    geocode(location, (error, {longitude , latitude, locationName} = {} ) => {
        if(error){
            return console.log(error);    
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return console.log(error);
            }
    
            console.log(locationName);
            console.log(forecastData);
          })
    })
}


//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)



