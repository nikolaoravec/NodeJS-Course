const path = require('path')
const express = require('express')
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewaPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup static directory to serve
app.use(express.static(publicDirPath))

//Setup handlebars engine and wievs location
app.set('view engine','hbs')
app.set('views', viewaPath)
hbs.registerPartials(partialsPath)

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Nikola Oravec'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About me',
        name: 'Nikola Oravec'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Nikola Oravec'
    })
})

app.get('/weather', (req,res) => {

    const address = req.query.address

    geocode(address, (error, { longitude , latitude, locationName } = {} ) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude , longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location: locationName,
                address: address
            })
        })
    })
})


app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        error: 'Help article not found'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        error: 'Page not found'
    })
})

app.listen(port, () => {
    console.log("Port up and running!");
})