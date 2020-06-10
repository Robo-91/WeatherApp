const weatherIcon = document.getElementById(`weather-icon`);
const userCity = document.getElementById(`user-city`);
const userSubmit = document.getElementById(`user-submit`);
const currentWeather = document.getElementById(`weather-condition`);
const cityName = document.getElementById(`city`);
const fahrenheit = document.getElementById(`fahrenheit`);
const celsius = document.getElementById(`celsius`);

function convertKelvinToFahrenheit(n) {
    n = (n - 273.15) * 9/5 + 32;
    return `${Math.ceil(n)}F`;
}

function convertKelvinToCelsius(n) {
    n = n - 273.15;
    return `${Math.ceil(n)}C`;
}

async function getWeather(city) {

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=abba9799275dcadf3f8f7698fcc317e3`, { mods: `cors` });
    const weatherData = await response.json();

    if(weatherData.message === "city not found" || weatherData.message === "Nothing to geocode") {
        alert('Please Enter a Valid City!');
        return null;
    }

    const weatherDesc = weatherData.weather[0].description;
    currentWeather.textContent = weatherDesc;
    cityName.textContent = weatherData.name;
    fahrenheit.textContent = convertKelvinToFahrenheit(weatherData.main.temp);
    celsius.textContent = convertKelvinToCelsius(weatherData.main.temp);

    switch(weatherDesc) {
        case 'clear sky' :
            weatherIcon.innerHTML = `<i class="fas fa-sun"></i>`;
            break;
        case 'few clouds' :
            weatherIcon.innerHTML = `<i class="fas fa-cloud-sun"></i>`;
            break;
        case 'scattered clouds' :
            weatherIcon.innerHTML = `<i class="fas fa-cloud"></i>`;
            break;
        case 'broken clouds' :
            weatherIcon.innerHTML = `<i class="fas fa-cloud-meatball"></i>`;
            break;
        case 'shower rain' :
            weatherIcon.innerHTML = `<i class="fas fa-cloud-showers-heavy"></i>`;
            break;
        case 'rain' :
            weatherIcon.innerHTML = `<i class="fas fa-cloud-rain"></i>`;
            break;
        case 'thunderstorm' :
            weatherIcon.innerHTML = `<i class="fas fa-bolt"></i>`;
            break;
        case 'snow' :
            weatherIcon.innerHTML = `<i class="fas fa-snowflake"></i>`;
            break;
        case 'mist' :
            weatherIcon.innerHTML = `<i class="fas fa-smog"></i>`;
            break;
    }


}

getWeather('houston');

userSubmit.addEventListener('click', () => {
    getWeather(userCity.value);
    userCity.value = ``;
}); 

