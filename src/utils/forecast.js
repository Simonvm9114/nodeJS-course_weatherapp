const request = require('request')
const chalk = require('chalk')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=b68ca60aed3472d6e6e89f1abc652c70&query=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback(chalk.red('Unable to connect to weather service!'), undefined)
        } else if (body.error) {
            callback(chalk.red('Please specify a valid location.'), undefined)
        } else {
            const {weather_descriptions: describtion, temperature, precip, humidity} = body.current
            callback(undefined, `${describtion[0]}. It's currently ${temperature} degrees out. There is a ${precip}% chance of rain. The humidity is ${humidity}%.`)
        }
    })
}

module.exports = forecast