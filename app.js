const express = require('express');
const app = express();
const axios = require('axios');
const fs = require('fs');
const dotenv = require('dotenv')

dotenv.config({ path: './config.env' });


// const APIKEY = 
const APIKEY = process.env.APIKEY

app.get('/', async (req, res) => {
	const random = Math.floor(Math.random() * 19);
	const data = await fs.promises.readFile('./hotels.json', 'utf-8');
	const list = JSON.parse(data);
	const { lat, lon } = list[random].geo;

	const response = await axios.get(
		`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${APIKEY}`
	);

	const weather = response.data;
	console.log(weather);

	const hotel = list[random].name;
	console.log(hotel);
	res.json({
		data: [hotel, weather],
	});
});

app.listen(3005, (req, res) => {
	console.log('server listen');
});
