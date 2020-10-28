const request = require('postman-request');

// const url = 'http://api.weatherstack.com/current?access_key=aa2d5d380524770d2f4dc5d287dbdebb&query=44.839880, 20.415634'
// request({ url: url, json: true }, (error,response) => {
//     if (error) {
//         console.log("Unable to connect to weather service!");
//     } else if(response.body.error) {
//         console.log("Unable to find location!");
//     } else {
//         console.log("It's currently " + response.body.current.temperature + " degress out. It feels like " + response.body.current.feelslike + " degress out.");
//     }
// })


const mapboxURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoibm9yYXZlYzk4IiwiYSI6ImNrZ3RsbTBrMzBjNmsyenBlcnRhcGZuamgifQ.2k9fnvGbVeNMGq7Hmgl3vw"


request({ url: mapboxURL, json: true }, (error, response) => {
    if (error) {
        console.log("Connection to server crashed! Check your network connection");
    } else if(response.body.features.length  === 0) {
        console.log("No features found");
    } else {
        console.log("It's LAD " + response.body.features[0].center[1]);
        console.log("It's LONG " + response.body.features[0].center[0]);
    }
})

