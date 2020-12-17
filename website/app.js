/* Global Variables */
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = '86a9abf0018f9fe698c39241d29ee0ab';

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
    let newData = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    try {
        console.log(newData)
    } catch (error) {
        console.log(error);
    }
}

getWeatherByZipCode(94207)
    .then(val => postWeatherData('http:/localHost:8000/api/addWeatherData', setProjectData(val, newDate, 'hahahah')));