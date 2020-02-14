const request = require('request')

const geocode = (address, callback) => {

    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1IjoianMyNTE3NjA0NyIsImEiOiJjazYwNmU5YXgwNHR0M2pwazR5ZmF5andtIn0.COBnXG31r6L0q32TyPAanw&limit=1"
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback("unable to connect to weather service!", undefined,undefined)
        }
        else if (body.features.length === 0) {
            callback('Invalid search value', undefined,undefined)
        }
        else {
            callback(undefined, {
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                place:body.features[0].place_name
            });
        }
    });


}

module.exports = geocode