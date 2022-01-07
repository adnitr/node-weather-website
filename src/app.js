const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

// Setup paths for Express configs
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Setup handlebars engine, views and partials location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static files to serve
app.use(express.static(publicDirPath))

app.get('', (req, res)=>{
    res.render('index', {
        title: "Weather",
        name: "Adarsh Agrawal"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: "Adarsh Agrawal"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        helpText: "This is some helpful text",
        name: "Adarsh Agrawal"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
        if(error) {
            return res.send({error})
        } 
    
        forecast(latitude, longitude, (error, forecastResponse) => {
            if(error) {
                return res.send({error})
            }
            
            res.send({location, forecast: forecastResponse})
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: "Help article not found",
        name: "Adarsh Agrawal"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: "Page not found",
        name: "Adarsh Agrawal"
    })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})