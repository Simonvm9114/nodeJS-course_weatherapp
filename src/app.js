const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const staticContent = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(staticContent))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Simon van Meegdenburg'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Simon van Meegdenburg'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Simon van Meegdenburg',
        helpMessage: 'Here is a help message'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { label, latitude, longitude } = {}) => {
        if (error) {
            console.log(error)
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, weatherData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: weatherData,
                location: label,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    } 

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Simon van Meegdenburg',
        errorText: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Simon van Meegdenburg',
        errorText: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})