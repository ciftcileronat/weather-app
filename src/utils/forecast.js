const request = require("request");

const forecast = (address, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=d9e06ea5713934ab223062543dd1e575&query=Dublin" +
    address +
    request({ url, json: true }, (error, { body }) => {
      if (error) {
        callback("Unable to connect to weather service!", undefined);
      } else if (body.error) {
        callback("Unable to find location", undefined);
      } else {
        callback(
          undefined,
          "In " +
            response.body.location.name +
            " weather is " +
            response.body.current.weather_descriptions[0] +
            ". It is currently " +
            response.body.current.temperature +
            " degrees out. It feels like " +
            response.body.current.feelslike
        );
      }
    });
};

module.exports = forecast;
