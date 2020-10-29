const http = require('http')

const url = 'http://api.weatherstack.com/current?access_key=aa2d5d380524770d2f4dc5d287dbdebb&query=40,-75'

const request = http.request(url, (response) => {

    let data = ''

    response.on('data', (chunk) => {
        data = data + chunk.toString()
    })

    response.on('end', () => {
        const body = JSON.parse(data)
        console.log(body);
    })
})

request.on('error', (error) => {
    console.log(error);
})

request.end()