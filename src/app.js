const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Andrew Mead'
    })
})

app.get('/weather', (req, res) => {

    let address = req.query.address;
    if (address) {
        geocode(address, (error, { latitude, longitude, place }={}) => {
            if (error) {
                console.log("first")
                return res.send({
                    error: error
                })
            }
            else {
                forecast(latitude, longitude, (error, forecastData) => {
                    if (error) {
                        console.log("second")
                        return res.send({
                            error: error
                        })
                    }
                    console.log(place)
                    console.log(forecastData)

                    return res.send({
                        forecast: forecastData,
                        location: place,
                        address: address
                    })
                })
            }
        })


    }

    else {
        return res.send({
            error: 'Address must be provided!'
        })
    }
})

app.get('/products', (req, res) => {
    //console.log(req)
    if (!req.query.search) {
        return res.send(
            {
                Error: 'Search query is missing!'
            }
        )
    }
    res.send({
        products: []
    }
    )
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})