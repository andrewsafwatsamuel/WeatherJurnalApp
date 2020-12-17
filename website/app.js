/* Global Variables */
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = '86a9abf0018f9fe698c39241d29ee0ab';
const LOACAL_BASE_URL = 'http://localHost:8000/api/';

//dom elements
const zipInput = document.getElementById('zip');
const userFeelingInput = document.getElementById('feelings');
const generateButton = document.getElementById('generate');
const dateElelment = document.getElementById('date');
const tempElement = document.getElementById('temp');
const contentElement = document.getElementById('content');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

//defines project data
function setProjectData(temperature, date, userResponse) {
    return {
        temperature: temperature,
        date: date,
        userResponse: userResponse
    };
}

//gets the data from open weather maps by zip code
const getWeatherByZipCode = async(zipCode, url = composeUrl(zipCode)) => {
    let weatherData = await fetch(url);
    try {
        let jsonWeather = await weatherData.json();
        return jsonWeather.main.temp;

    } catch (error) {
        console.log(error);
    }
}

function composeUrl(zip, baseUrl = BASE_URL, apiKey = API_KEY) {
    return `${baseUrl}?zip=${zip}&appid=${apiKey}`;
}

const postWeatherData = async(url = '', data = {}) => {
    await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    try {
        console.log(SUCCESS)
    } catch (error) {
        console.log(error);
    }
}


const getWeatherData = async(url = '', onSuccess = () => {}) => {
    let data = await fetch(url, {
        method: 'GET',
        credentials: 'same-origin'
    });
    try {
        let json = await data.json();
        onSuccess(json);
    } catch (error) {
        console.log(error);
    }
}

generateButton.addEventListener('click', startWeatherChain);

function startWeatherChain() {
    getWeatherByZipCode(zipInput.value.trim())
        .then(val => postWeatherData(`${LOACAL_BASE_URL}addWeatherData`, setProjectData(val, newDate, userFeelingInput.value)))
        .then(getWeatherData(`${LOACAL_BASE_URL}getWeatherData`, onSuccess));
}

function onSuccess(data) {
    console.log(data);
    dateElelment.innerHTML = drawWeatherData('Date', data.date);
    tempElement.innerHTML = drawWeatherData('Temperature', data.temperature)
    contentElement.innerHTML = drawWeatherData('Content', data.userResponse)
}

function drawWeatherData(title, content) {
    return `<p><strong>${title}</strong>: ${content}</p>`
}