//main dependencies
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

//main app setup
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

//server setup
const port = 8000;
app.listen(port, onListen)

function onListen() {
    console.log('server started');
    console.log(`server is running on http://localhost:${port}`)
}

//api
let projectData = {};
const root = '/api'

//add new data
app.post(`${root}/addWeatherData`, doOnPost);

function doOnPost(request, response) {
    projectData = request.body;
    response.send();
}

//get Project Data
app.get(`${root}/getWeatherData`, sendProjectData);

function sendProjectData(request, response) {
    response.send(projectData);
}