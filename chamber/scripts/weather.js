
// Port Harcourt Chamber of Commerce
// Weather information using Open-Meteo API

const latitude = 4.8156;
const longitude = 7.0498;

const weatherIcon = document.querySelector("#weather-icon");
const temperatureElement = document.querySelector("#current-temperature");
const descriptionElement = document.querySelector("#weather-description");
const forecastContainer = document.querySelector("#forecast-container");

// Convert weather codes into readable descriptions and icons
function getWeatherInfo(code) {
    const weatherConditions = {
        0: ["Clear sky", "☀️"],
        1: ["Mainly clear", "🌤️"],
        2: ["Partly cloudy", "⛅"],
        3: ["Overcast", "☁️"],
        45: ["Foggy", "🌫️"],
        48: ["Rime fog", "🌫️"],
        51: ["Light drizzle", "🌦️"],
        53: ["Moderate drizzle", "🌦️"],
        55: ["Heavy drizzle", "🌧️"],
        61: ["Light rain", "🌧️"],
        63: ["Moderate rain", "🌧️"],
        65: ["Heavy rain", "🌧️"],
        71: ["Light snow", "🌨️"],
        73: ["Moderate snow", "🌨️"],
        75: ["Heavy snow", "❄️"],
        80: ["Rain showers", "🌦️"],
        81: ["Moderate rain showers", "🌧️"],
        82: ["Heavy rain showers", "⛈️"],
        95: ["Thunderstorm", "⛈️"],
        96: ["Thunderstorm with hail", "⛈️"],
        99: ["Severe thunderstorm with hail", "⛈️"]
    };

    return weatherConditions[code] || ["Unknown conditions", "🌡️"];
}

// Display current weather
function displayCurrentWeather(data) {
    const current = data.current;
    const [description, icon] = getWeatherInfo(current.weather_code);

    temperatureElement.textContent =
        `${Math.round(current.temperature_2m)}°C`;

    descriptionElement.textContent =
        `${description} | Feels like ${Math.round(current.apparent_temperature)}°C`;

    // Create a simple weather icon using SVG
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
            <text x="50%" y="65%" font-size="65"
                text-anchor="middle">${icon}</text>
        </svg>
    `;

    weatherIcon.src =
        "data:image/svg+xml," + encodeURIComponent(svg);

    weatherIcon.alt = description;
    weatherIcon.hidden = false;
}

// Display three-day forecast
function displayForecast(data) {
    forecastContainer.innerHTML = "";

    const daily = data.daily;

    for (let i = 0; i < daily.time.length; i++) {
        const date = new Date(`${daily.time[i]}T00:00:00`);

        const dayName = date.toLocaleDateString("en-US", {
            weekday: "long"
        });

        const [description, icon] =
            getWeatherInfo(daily.weather_code[i]);

        const forecastCard = document.createElement("div");

        forecastCard.classList.add("forecast-card");

        forecastCard.innerHTML = `
            <h4>${dayName}</h4>
            <p class="forecast-icon">${icon}</p>
            <p>${description}</p>
            <p>
                High: ${Math.round(daily.temperature_2m_max[i])}°C
            </p>
            <p>
                Low: ${Math.round(daily.temperature_2m_min[i])}°C
            </p>
        `;

        forecastContainer.appendChild(forecastCard);
    }
}

// Fetch weather information from Open-Meteo
async function getWeather() {
    const apiURL =
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Africa%2FLagos&forecast_days=3`;

    try {
        const response = await fetch(apiURL);

        if (!response.ok) {
            throw new Error("Unable to retrieve weather data.");
        }

        const data = await response.json();

        displayCurrentWeather(data);
        displayForecast(data);

    } catch (error) {
        console.error("Weather error:", error);

        temperatureElement.textContent =
            "Weather information unavailable.";

        descriptionElement.textContent =
            "Please try again later.";

        forecastContainer.textContent =
            "Unable to load the weather forecast.";
    }
}

// Run the weather function
getWeather();
