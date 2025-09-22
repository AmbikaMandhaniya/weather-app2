import { Cloud, Sun, CloudRain, CloudSnow, Zap } from 'lucide-react';

export const weatherIconMap = {
  '01d': { component: Sun, color: 'text-yellow-500' },
  '01n': { component: Sun, color: 'text-yellow-300' },
  '02d': { component: Cloud, color: 'text-gray-400' },
  '02n': { component: Cloud, color: 'text-gray-500' },
  '03d': { component: Cloud, color: 'text-gray-500' },
  '03n': { component: Cloud, color: 'text-gray-600' },
  '04d': { component: Cloud, color: 'text-gray-600' },
  '04n': { component: Cloud, color: 'text-gray-700' },
  '09d': { component: CloudRain, color: 'text-blue-500' },
  '09n': { component: CloudRain, color: 'text-blue-600' },
  '10d': { component: CloudRain, color: 'text-blue-500' },
  '10n': { component: CloudRain, color: 'text-blue-600' },
  '11d': { component: Zap, color: 'text-yellow-600' },
  '11n': { component: Zap, color: 'text-yellow-500' },
  '13d': { component: CloudSnow, color: 'text-blue-200' },
  '13n': { component: CloudSnow, color: 'text-blue-100' },
  '50d': { component: Cloud, color: 'text-gray-400' },
  '50n': { component: Cloud, color: 'text-gray-500' },
};