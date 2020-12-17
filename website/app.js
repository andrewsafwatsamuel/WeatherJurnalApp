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
        console.log(error)
    }
}

function composeUrl(zip, baseUrl = BASE_URL, apiKey = API_KEY) {
    return `${baseUrl}?zip=${zip}&appid=${apiKey}`;
}