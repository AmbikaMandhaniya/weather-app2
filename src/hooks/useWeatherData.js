import { useState, useEffect, useCallback } from 'react';
import { fetchCurrentWeather, fetchForecast } from '../services/weatherService';

const useWeatherData = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadWeatherData = useCallback(async (lat, lon) => {
    setLoading(true);
    setError(null);
    
    try {
      const [weather, forecastData] = await Promise.all([
        fetchCurrentWeather(lat, lon),
        fetchForecast(lat, lon)
      ]);
      
      setCurrentWeather(weather);
      setForecast(forecastData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshData = useCallback(() => {
    if (currentWeather) {
      // Refresh with last known location
      // You would need to store lat/lon in state to use this
      console.log('Refreshing weather data...');
    }
  }, [currentWeather]);

  return {
    currentWeather,
    forecast,
    loading,
    error,
    loadWeatherData,
    refreshData,
    setError
  };
};

export default useWeatherData;