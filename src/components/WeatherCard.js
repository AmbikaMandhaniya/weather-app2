import React from 'react';
import { MapPin, Droplets, Wind, Thermometer, Eye, Sunrise, Sunset } from 'lucide-react';
import { getWeatherIcon, formatTime, getWindDirection } from '../utils/helpers';

const WeatherCard = ({ weather }) => {
  return (
    <div className="glass-effect rounded-2xl p-6 mb-6 text-white fade-in">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center">
            <MapPin className="w-6 h-6 mr-2" />
            {weather.name}, {weather.country}
          </h2>
          <p className="text-white/80 capitalize">{weather.description}</p>
        </div>
        {getWeatherIcon(weather.icon, 64)}
      </div>
      
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-6xl font-light">{weather.temp}°</div>
          <div className="text-white/80">Feels like {weather.feels_like}°</div>
        </div>
      </div>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/10 rounded-lg p-3 text-center">
          <Droplets className="w-6 h-6 mx-auto mb-2 text-blue-200" />
          <div className="text-lg font-semibold">{weather.humidity}%</div>
          <div className="text-sm text-white/80">Humidity</div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-3 text-center">
          <Wind className="w-6 h-6 mx-auto mb-2 text-blue-200" />
          <div className="text-lg font-semibold">
            {weather.wind_speed} m/s {getWindDirection(weather.wind_deg)}
          </div>
          <div className="text-sm text-white/80">Wind</div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-3 text-center">
          <Thermometer className="w-6 h-6 mx-auto mb-2 text-blue-200" />
          <div className="text-lg font-semibold">{weather.pressure} hPa</div>
          <div className="text-sm text-white/80">Pressure</div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-3 text-center">
          <Eye className="w-6 h-6 mx-auto mb-2 text-blue-200" />
          <div className="text-lg font-semibold">{weather.visibility} km</div>
          <div className="text-sm text-white/80">Visibility</div>
        </div>
      </div>

      {/* Sun Times */}
      <div className="flex justify-between mt-6 pt-4 border-t border-white/20">
        <div className="flex items-center">
          <Sunrise className="w-5 h-5 mr-2 text-yellow-300" />
          <span>Sunrise: {formatTime(weather.sunrise)}</span>
        </div>
        <div className="flex items-center">
          <Sunset className="w-5 h-5 mr-2 text-orange-300" />
          <span>Sunset: {formatTime(weather.sunset)}</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
