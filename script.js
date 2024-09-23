const apiKey = 'a5d9d04040969490d09bf939c883d12a';  // Get your API key from OpenWeatherMap
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('city');

const cityName = document.getElementById('city-name');
const description = document.getElementById('description');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const weatherContainer = document.getElementById('weather');

// Hide weather info until it's fetched
weatherContainer.classList.add('hidden');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        fetchWeather(city);
    }
});

async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert(error.message);
    }
}

function displayWeather(data) {
    const temp = data.main.temp;
    const weatherDescription = data.weather[0].description;
    const humidityLevel = data.main.humidity;
    const windSpeed = data.wind.speed;

    cityName.textContent = data.name;
    description.textContent = `Condition: ${weatherDescription}`;
    temperature.textContent = `Temperature: ${temp}°C`;
    humidity.textContent = `Humidity: ${humidityLevel}%`;
    wind.textContent = `Wind Speed: ${windSpeed} m/s`;

    weatherContainer.classList.remove('hidden');
}
