const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000  //Set port to given by heroku or default is 3000

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
        title: 'Weather App',
        name: 'Arsh Raj'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Arsh Raj'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Arsh Raj'
    })
})

app.get('/products', (req,res)=>{
    console.log(req.query.search)
    res.send({
        products :[]
    })
})

app.get('/weather', (req, res) => {
    
    if(!req.query.address){
        return res.send({
            error : 'You must provide an Address!'
        })
    }

    geocode( req.query.address, (error, {Latitude,Longitude,Location} = {} ) => {
        if(error) {
          return  res.send({
              error : error
            })
        }
    
        forecast(Latitude , Longitude ,  (forecastError, {Weather_description, Temperature, feelslike, Humidity,lat,lon,localtime,
                 timezone_id, wind_speed , wind_dir , pressure , precip , uv_index } = {} ) => {
            
                if(forecastError) {
              return  res.send({
                  error : forecastError
                })
            }
                 res.send({
                    lat : lat,
                    lon : lon,
                    Location :  Location, 
                    localtime : localtime,
                    timezone_id : timezone_id,
                    Weather_Description : Weather_description,
                    Temperature : Temperature,
                    feelslike : feelslike,
                    Humidity : Humidity,
                    wind_speed : wind_speed,
                    wind_dir : wind_dir,
                    pressure : pressure,
                    precip : precip,
                    uv_index : uv_index
                 })
        })
    }) 
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Arsh Raj',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Arsh Raj',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})