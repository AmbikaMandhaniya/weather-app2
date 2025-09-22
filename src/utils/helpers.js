import React from 'react';
import { weatherIconMap } from './weatherIcons';
import { Cloud } from 'lucide-react';

// Get weather icon component
export const getWeatherIcon = (code, size = 24) => {
  const iconData = weatherIconMap[code];
  if (!iconData) {
    return <Cloud size={size} className="text-gray-500" />;
  }
  
  const IconComponent = iconData.component;
  return <IconComponent size={size} className={iconData.color} />;
};

// Format timestamp to time string
export const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Convert wind degrees to direction
export const getWindDirection = (degrees) => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return directions[Math.round(degrees / 45) % 8];
};

// Format date for forecast
export const formatForecastDate = (date, index) => {
  if (index === 0) return 'Today';
  if (index === 1) return 'Tomorrow';
  return new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
};

// Temperature conversion utilities
export const celsiusToFahrenheit = (celsius) => {
  return Math.round((celsius * 9/5) + 32);
};

export const fahrenheitToCelsius = (fahrenheit) => {
  return Math.round((fahrenheit - 32) * 5/9);
};