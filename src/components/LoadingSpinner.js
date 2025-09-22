import React from 'react';
import { Loader } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center">
      <div className="text-center text-white">
        <Loader className="w-12 h-12 animate-spin mx-auto mb-4" />
        <p className="text-lg">Loading weather data...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;