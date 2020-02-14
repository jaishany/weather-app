const request = require("request")
const forecast = (latitude,longitude,callback) =>
{

    url = "https://api.darksky.net/forecast/5f10aea2e6ec347626173b7069e2d2a4/"+latitude+","+longitude

    request({ url, json: true }, function (error, {body}) {


        if (error) callback("unable to connect to weather service!",undefined)
        else if (body.error){
            callback("Bad Request!",undefined)
        }
        else
        {
            callback(undefined,"It's currently " + body.currently.temperature + " degrees out.There is a " + body.currently.precipProbability + "% chance of rain.");
        }
});
}

module.exports = forecast