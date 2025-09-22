import React from 'react';
import { Search, MapPin, Loader } from 'lucide-react';

const SearchResults = ({ results, loading, query, onSelectCity }) => {
  if (loading) {
    return (
      <div className="text-center py-8">
        <Loader className="w-8 h-8 animate-spin text-white mx-auto mb-2" />
        <p className="text-white/80">Searching...</p>
      </div>
    );
  }

  if (results.length > 0) {
    return (
      <div className="space-y-2">
        <h3 className="text-white font-semibold mb-3">Search Results:</h3>
        {results.map((city, index) => (
          <button
            key={index}
            onClick={() => onSelectCity(city)}
            className="w-full text-left bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-colors group"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-semibold group-hover:text-blue-100">
                  {city.name}
                </div>
                <div className="text-white/60 text-sm">{city.country}</div>
              </div>
              <MapPin className="w-5 h-5 text-white/60 group-hover:text-white" />
            </div>
          </button>
        ))}
      </div>
    );
  }

  if (query && !loading && results.length === 0) {
    return (
      <div className="text-center py-8 text-white/60">
        <p>No cities found matching "{query}"</p>
      </div>
    );
  }

  return (
    <div className="text-center py-8 text-white/60">
      <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
      <p>Type a city name to start searching</p>
    </div>
  );
};

export default SearchResults;