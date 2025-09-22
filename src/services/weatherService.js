// src/services/weatherService.js - PRODUCTION VERSION
const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

// Fetch current weather data
export const fetchCurrentWeather = async (lat, lon) => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('Weather data unavailable');
    }
    
    const data = await response.json();
    return {
      name: data.name,
      country: data.sys.country,
      temp: Math.round(data.main.temp),
      feels_like: Math.round(data.main.feels_like),
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      visibility: Math.round(data.visibility / 1000),
      wind_speed: data.wind.speed,
      wind_deg: data.wind.deg,
      sunrise: data.sys.sunrise * 1000,
      sunset: data.sys.sunset * 1000
    };
  } catch (error) {
    throw new Error('Failed to fetch current weather');
  }
};

// Fetch 5-day forecast
export const fetchForecast = async (lat, lon) => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('Forecast data unavailable');
    }
    
    const data = await response.json();
    const dailyData = {};
    
    data.list.forEach(item => {
      const date = new Date(item.dt * 1000).toDateString();
      if (!dailyData[date]) {
        dailyData[date] = {
          temp_max: item.main.temp_max,
          temp_min: item.main.temp_min,
          description: item.weather[0].description,
          icon: item.weather[0].icon
        };
      } else {
        dailyData[date].temp_max = Math.max(dailyData[date].temp_max, item.main.temp_max);
        dailyData[date].temp_min = Math.min(dailyData[date].temp_min, item.main.temp_min);
      }
    });
    
    return Object.entries(dailyData).slice(0, 5).map(([date, data], index) => ({
      date: index === 0 ? 'Today' : new Date(date).toLocaleDateString('en-US', { weekday: 'long' }),
      temp_max: Math.round(data.temp_max),
      temp_min: Math.round(data.temp_min),
      description: data.description,
      icon: data.icon
    }));
  } catch (error) {
    throw new Error('Failed to fetch forecast data');
  }
};

// Search cities by name
export const searchCities = async (query) => {
  try {
    const response = await fetch(
      `${GEO_URL}/direct?q=${query}&limit=5&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Search failed');
    }
    
    const data = await response.json();
    return data.map(city => ({
      name: city.name,
      country: city.country,
      lat: city.lat,
      lon: city.lon
    }));
  } catch (error) {
    throw new Error('Search failed');
  }
};