import React from 'react';
import { getWeatherIcon } from '../utils/helpers';

const ForecastCard = ({ forecast }) => {
  return (
    <div className="glass-effect rounded-2xl p-6 fade-in">
      <h3 className="text-white text-xl font-bold mb-4">5-Day Forecast</h3>
      <div className="space-y-3">
        {forecast.map((day, index) => (
          <div key={index} className="flex items-center justify-between bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-colors">
            <div className="flex items-center space-x-4">
              {getWeatherIcon(day.icon, 32)}
              <div>
                <div className="text-white font-semibold">{day.date}</div>
                <div className="text-white/80 capitalize text-sm">{day.description}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white text-lg font-semibold">
                {day.temp_max}° / {day.temp_min}°
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;