const request = require('request')
const chalk = require('chalk')

const geocode = (address, callback) => {
    const url = 'https://geocode.search.hereapi.com/v1/geocode?q=' + encodeURIComponent(address) + '&apiKey=RbbWRV6FMulbq0NDQzBLjXKh2oYWj7Fej5yD_AlVctc'

    request({ url, json: true }, (error, { body }) =>{
        if (error) {
            callback(chalk.red('Unable to connect to the location service!', undefined))
        } else if (!body.items) {
            callback(chalk.red('Please enter a value!'), undefined)
        } else if (body.items.length === 0) {
            callback('Address not found!', undefined)
        } else {
            const {title: label, position} = body.items[0]
            callback(undefined, {
                label,
                latitude: position.lat,
                longitude: position.lng
            })
        }
    })
}

module.exports = geocode