const request = require('postman-request')

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWRuaXRyIiwiYSI6ImNrdXRsaTZ5MjFpYTUydXM3MG93MnE5a2sifQ.XDzk7_-fj2GJAEOdFVRn4Q&limit=1'

    request({url, json: true}, (err,{body}={}) => {
        if(err) {
            callback('Unable to connect to geocoding api!', undefined)
        } else if(body.features.length===0) {
            callback('Unable to find the location. Try another search', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode