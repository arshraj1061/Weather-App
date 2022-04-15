// Mapbox API - Used to get coordinates of a place from name given in URL

const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYXJzaHJhaiIsImEiOiJja3ZpYzliNDMybDM4MnZwZ3RtdDBkeDByIn0.PopGMWzc0j3vQ7EOAh2CHg&limit=1'

    request({  url , json: true}, (error, {body} = {} ) => {
        if(error) {
            callback('Unable to connect to location service!', undefined)
        }
        else if( body.features.length == 0) {
            callback('No matching results for this location please enter another one!',undefined)
        }
        else {
            callback(undefined, {
                Location : body.features[0].place_name ,
                Longitude : body.features[0].center[0] ,
                Latitude : body.features[0].center[1]
            })
        }
    })
}

module.exports = geocode