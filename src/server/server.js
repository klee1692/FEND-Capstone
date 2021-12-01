// Setup express server

const dotenv = require('dotenv');
dotenv.config();
console.log(`Your Geonames API key is ${process.env.GEONAMES_USER}`);
console.log(`Your Weatherbit API key is ${process.env.WEATHERBIT_KEY}`);
console.log(`Your Pixabay API key is ${process.env.PIXABAY_KEY}`);

var path = require('path');

const express = require('express');
const app = express();
app.use(express.static('dist'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const fetch = require('node-fetch');

const cors = require('cors');
app.use(cors());

app.listen(8081, function () {
    console.log('Example app listening on port 8081!');
});

// Set GET route
app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist/index.html'));
});

// Set POST routes from Geonames, Weatherbit, Pixabay, REST
app.post('/getCoord', async function (req, res) {

    let city = req.body.cityTo;

    const geonamesKey = process.env.GEONAMES_USER;
    const coord = await fetch(`http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${geonamesKey}`);

    try {
        const results = await coord.json();
        console.log(results);
        let coordData = {
            city: results.geonames[0].name,
            country: results.geonames[0].countryName,
            lat: results.geonames[0].lat,
            lng: results.geonames[0].lng
        };
        res.send(coordData);
    } catch (error) {
        console.log('Error getting lat & lng');
    };

});

app.post('/getWeather', async function (req, res) {

    let lat = req.body.latitude;
    let lng = req.body.longitude;

    const weatherbitKey = process.env.WEATHERBIT_KEY;
    const weather = await fetch(`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&key=${weatherbitKey}`);

    try {
        const results = await weather.json();
        console.log(results);
        let weatherData = {
            city: results.data[0].city_name,
            country: results.data[0].country_code,
            temperature: results.data[0].temp,
            apparentTemp: results.data[0].app_temp,
            weather: results.data[0].weather.description,
            icon: results.data[0].weather.icon,
            airQuality: results.data[0].aqi,
            uvIndex: results.data[0].uv
        };
        res.send(weatherData);
    } catch (error) {
        console.log('Error getting weather information');
    };

});

app.post('/getImage', async function (req, res) {

    let query = req.body.searchTerm;

    const pixabayKey = process.env.PIXABAY_KEY;
    const pixabay = await fetch(`https://pixabay.com/api/?key=${pixabayKey}&q=${query}&image_type=photo&per_page=6&orientation=horizontal`);

    try {
        const results = await pixabay.json();
        console.log(results);
        let img = [{
            imageSm: results.hits[0].previewURL,
            imgMed: results.hits[0].webformatURL
        },
        {
            imageSm: results.hits[1].previewURL,
            imgMed: results.hits[1].webformatURL
        },
        {
            imageSm: results.hits[2].previewURL,
            imgMed: results.hits[2].webformatURL
        },
        {
            imageSm: results.hits[3].previewURL,
            imgMed: results.hits[3].webformatURL
        },
        {
            imageSm: results.hits[4].previewURL,
            imgMed: results.hits[4].webformatURL
        },
        {
            imageSm: results.hits[5].previewURL,
            imgMed: results.hits[5].webformatURL
        },
        ];
        res.send(img);
    } catch (error) {
        console.log('Error getting image');
    };

});

app.post('/restCountries', async function (req, res) {

    let country = req.body.countryName;

    const restCountry = await fetch(`https://restcountries.com/v2/name/${country}`);

    try {
        const results = await restCountry.json();
        console.log(results[0]);
        res.send(results[0]);
    } catch (error) {
        console.log('Error getting rest countries');
    };

});

// For testing purposes
module.exports = app

app.get('/test', async (req, res) => {
    res.json({ message: 'pass!' })
})