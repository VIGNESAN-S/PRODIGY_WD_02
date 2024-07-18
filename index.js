const apiKey = '1a4dde1824da75ef9a763d229ba6d08a';
const weatherDataDiv = document.getElementById('weatherData');
const body = document.body;

function fetchWeather() {
    const location = document.getElementById('locationInput').value;
    if (location) {
        fetchWeatherByLocation(location);
    } else {
        fetchWeatherByCurrentLocation();
    }
}

function fetchWeatherByLocation(location) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => console.error('Error fetching weather data:', error));
}

function fetchWeatherByCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
                .then(response => response.json())
                .then(data => displayWeather(data))
                .catch(error => console.error('Error fetching weather data:', error));
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

function displayWeather(data) {
    if (data.cod !== 200) {
        weatherDataDiv.innerHTML = `<div>Error: ${data.message}</div>`;
        return;
    }

    const { name, weather, main } = data;
    const weatherIcon = getWeatherIcon(weather[0].main);

    weatherDataDiv.innerHTML = `
        <div>Location: ${name}</div>
        <div>Weather: <i class="wi ${weatherIcon} weather-icon"></i> ${weather[0].description}</div>
        <div>Temperature: ${main.temp}°C</div>
        <div>Humidity: ${main.humidity}%</div>
        <div>Pressure: ${main.pressure} hPa</div>
    `;

    changeBackground(weather[0].main);
}

function getWeatherIcon(weatherMain) {
    switch (weatherMain.toLowerCase()) {
        case 'clear':
            return 'wi-day-sunny';
        case 'clouds':
            return 'wi-cloudy';
        case 'rain':
            return 'wi-rain';
        case 'snow':
            return 'wi-snow';
        case 'thunderstorm':
            return 'wi-thunderstorm';
        case 'drizzle':
            return 'wi-rain-mix';
        case 'haze':
            return 'wi-fog';
        default:
            return 'wi-na';
    }
}

function changeBackground(weatherMain) {
    let backgroundImage;
    switch (weatherMain.toLowerCase()) {
        case 'clear':
            backgroundImage = 'url(https://cdn-icons-mp4.flaticon.com/512/6455/6455017.mp4)';
            break;
        case 'clouds':
            backgroundImage = 'url(https://cdn-icons-mp4.flaticon.com/512/6455/6455024.mp4)';
            break;
        case 'rain':
            backgroundImage = 'url(https://cdn-icons-mp4.flaticon.com/512/6455/6455055.mp4)';
            break;
        case 'snow':
            backgroundImage = 'url(https://cdn-icons-mp4.flaticon.com/512/6454/6454998.mp4)';
            break;
        case 'thunderstorm':
            backgroundImage = 'url(https://cdn-icons-mp4.flaticon.com/512/6455/6455012.mp4)';
            break;
        case 'drizzle':
            backgroundImage = 'url(http://openweathermap.org/img/wn/09d@2x.png)';
        case 'haze':
            backgroundImage = 'url(http://openweathermap.org/img/wn/50d@2x.png)';
        default:
            backgroundImage = 'url(https://img.freepik.com/free-vector/sky-background-video-conferencing_23-2148639325.jpg)';
            break;
    }
    body.style.backgroundImage = backgroundImage;
}
