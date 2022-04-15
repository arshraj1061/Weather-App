// Weatherstack API - Used to get the weather forecast of a place from 

const request = require('request')

const forecast = (latitude, longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8cf47b13d99202f31bf8a2e057737945&query=' + latitude +',' + longitude + '&units=m'

    request( { url , json: true} , (error, { body } = {} ) => {
        if(error) {
            callback('Unable to connect to weather service!', undefined)
        }
        else if(body.error) {
            callback('Unable to find location!', undefined)
        }
        else {
            callback(undefined , 
                {
                    Weather_description : body.current.weather_descriptions ,
                    Temperature : body.current.temperature ,
                    Feels_like : body.current.feelslike ,
                    Humidity : body.current.humidity
                })
        }
    })

}

module.exports = forecast