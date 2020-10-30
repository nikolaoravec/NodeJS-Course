const path = require('path')
const express = require('express')
const hbs = require('hbs');
const { registerPartials } = require('hbs');

const app = express()


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
    res.send('Weather page')
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

app.listen(3000, () => {
    console.log("Port up and running!");
})