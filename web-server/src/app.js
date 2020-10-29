const path = require('path')
const express = require('express')

const app = express()

const publicDirPath = path.join(__dirname, '../public')

app.use(express.static(publicDirPath))
app.set('view engine','hbs')

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

app.listen(3000, () => {
    console.log("Port up and running!");
})