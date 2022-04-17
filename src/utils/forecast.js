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
            // console.log(body)
            callback(undefined , 
                {
                    lat: body.location.lat,
                    lon: body.location.lon,
                    localtime : body.location.localtime,
                    timezone_id : body.location.timezone_id,
                    Weather_description : body.current.weather_descriptions ,
                    Temperature : body.current.temperature ,
                    feelslike: body.current.feelslike,
                    Humidity : body.current.humidity,
                    wind_speed: body.current.wind_speed,
                    wind_dir: body.current.wind_dir,
                    pressure: body.current.pressure,
                    precip: body.current.precip,
                    uv_index: body.current.uv_index
                })
                
        }
    })

}

module.exports = forecast