// src/App.js
import React, { useState, useEffect } from 'react';
import { Search, MapPin, AlertCircle, Loader } from 'lucide-react';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import SearchResults from './components/SearchResults';
import LoadingSpinner from './components/LoadingSpinner';
import { fetchCurrentWeather, fetchForecast, searchCities } from './services/weatherService';
import useWeatherData from './hooks/useWeatherData';

const App = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeScreen, setActiveScreen] = useState('main');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  // Get user's geolocation
  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        (error) => {
          reject(new Error('Unable to retrieve location'));
        },
        { timeout: 10000 }
      );
    });
  };

  // Load weather data for coordinates
  const loadWeatherData = async (lat, lon) => {
    setLoading(true);
    setError(null);
    
    try {
      const [weather, forecastData] = await Promise.all([
        fetchCurrentWeather(lat, lon),
        fetchForecast(lat, lon)
      ]);
      
      setCurrentWeather(weather);
      setForecast(forecastData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle search
  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setSearchLoading(true);
    try {
      const results = await searchCities(query);
      setSearchResults(results);
    } catch (error) {
      setError('Search failed. Please try again.');
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  // Select city from search results
  const selectCity = async (city) => {
    setActiveScreen('main');
    setSearchQuery('');
    setSearchResults([]);
    await loadWeatherData(city.lat, city.lon);
  };

  // Initialize app with user location
  useEffect(() => {
    const initializeApp = async () => {
      try {
        const location = await getCurrentLocation();
        await loadWeatherData(location.lat, location.lon);
      } catch (error) {
        // Default to New York if geolocation fails
        await loadWeatherData(40.7128, -74.0060);
      }
    };

    initializeApp();
  }, []);

  // Debounced search
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      handleSearch(searchQuery);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  if (loading && !currentWeather) {
    return <LoadingSpinner />;
  }

  if (error && !currentWeather) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center p-4">
        <div className="text-center text-white glass-effect rounded-2xl p-8">
          <AlertCircle className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Weather Unavailable</h2>
          <p className="mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-white text-red-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
      {/* Navigation */}
      <nav className="p-4 flex justify-between items-center glass-effect">
        <h1 className="text-white text-xl font-bold">Weather App</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveScreen('main')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeScreen === 'main'
                ? 'bg-white text-blue-600'
                : 'text-white hover:bg-white/20'
            }`}
          >
            Current
          </button>
          <button
            onClick={() => setActiveScreen('search')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeScreen === 'search'
                ? 'bg-white text-blue-600'
                : 'text-white hover:bg-white/20'
            }`}
          >
            Search
          </button>
        </div>
      </nav>

      {/* Main Screen */}
      {activeScreen === 'main' && currentWeather && (
        <div className="p-4 max-w-4xl mx-auto fade-in">
          <WeatherCard weather={currentWeather} />
          <ForecastCard forecast={forecast} />
        </div>
      )}

      {/* Search Screen */}
      {activeScreen === 'search' && (
        <div className="p-4 max-w-2xl mx-auto fade-in">
          <div className="glass-effect rounded-2xl p-6">
            <h2 className="text-white text-2xl font-bold mb-6">Search Cities</h2>
            
            {/* Search Input */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter city name..."
                className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white/50 focus:bg-white/30 transition-all"
              />
            </div>

            <SearchResults
              results={searchResults}
              loading={searchLoading}
              query={searchQuery}
              onSelectCity={selectCity}
            />
          </div>
        </div>
      )}

      {/* Error Toast */}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg fade-in">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
            <button
              onClick={() => setError(null)}
              className="ml-3 text-white/80 hover:text-white"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;