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
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=abba9799275dcadf3f8f7698fcc317e3`, { mods: `cors` });
    const weatherData = await response.json();

    if(weatherData.message === "city not found" || weatherData.message === "Nothing to geocode") {
        alert('Please Enter a Valid City!');
        return null;
    }

    currentWeather.textContent = weatherData.weather[0].main;
    cityName.textContent = weatherData.name;
    fahrenheit.textContent = convertKelvinToFahrenheit(weatherData.main.temp);
    celsius.textContent = convertKelvinToCelsius(weatherData.main.temp);
}

getWeather('houston');

userSubmit.addEventListener('click', () => {
    getWeather(userCity.value);
    userCity.value = ``;
}); 

