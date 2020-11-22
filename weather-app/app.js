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
console.log(location);
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
