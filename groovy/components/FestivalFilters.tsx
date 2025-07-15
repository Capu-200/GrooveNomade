import { useState } from 'react';
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Festival } from '@/lib/airtable';

interface FestivalFiltersProps {
  festivals: Festival[];
  onFiltersChange: (filteredFestivals: Festival[]) => void;
}

interface Filters {
  genre: string;
  country: string;
  nbDays: string;
  minPrice: number;
  maxPrice: number;
}

export default function FestivalFilters({ festivals, onFiltersChange }: FestivalFiltersProps) {
  const [filters, setFilters] = useState<Filters>({
    genre: '',
    country: '',
    nbDays: '',
    minPrice: 0,
    maxPrice: 0
  });

  // Extraire les options uniques
  const genres = [...new Set(festivals.map(f => f.genre).filter(Boolean))];
  const countries = [...new Set(festivals.map(f => f.country).filter(Boolean))];
  const maxPrice = Math.max(
    ...festivals.flatMap(f => [
      f.price_1_day || 0,
      f.price_2_days || 0,
      f.price_3_days || 0
    ])
  );

  const applyFilters = (newFilters: Filters) => {
    setFilters(newFilters);
    
    let filtered = festivals.filter(festival => {
      // Filtre par genre
      if (newFilters.genre && festival.genre !== newFilters.genre) return false;
      
      // Filtre par pays
      if (newFilters.country && festival.country !== newFilters.country) return false;
      
      // Filtre par nombre de jours
      if (newFilters.nbDays && festival.nb_jours !== parseInt(newFilters.nbDays)) return false;
      
      // Filtre par prix
      const festivalPrices = [
        festival.price_1_day || 0,
        festival.price_2_days || 0,
        festival.price_3_days || 0
      ];
      const minFestivalPrice = Math.min(...festivalPrices.filter(p => p > 0));
      const maxFestivalPrice = Math.max(...festivalPrices);
      
      if (newFilters.minPrice > 0 && minFestivalPrice < newFilters.minPrice) return false;
      if (newFilters.maxPrice > 0 && maxFestivalPrice > newFilters.maxPrice) return false;
      
      return true;
    });
    
    onFiltersChange(filtered);
  };

  const clearFilters = () => {
    const clearedFilters = {
      genre: '',
      country: '',
      nbDays: '',
      minPrice: 0,
      maxPrice: 0
    };
    setFilters(clearedFilters);
    onFiltersChange(festivals);
  };

  const hasActiveFilters = Object.values(filters).some(value => 
    value !== '' && value !== 0
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <FunnelIcon className="h-5 w-5 mr-2" />
          Filtres
        </h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center space-x-1 px-3 py-1 text-sm text-red-600 hover:text-red-800 transition-colors"
          >
            <XMarkIcon className="h-4 w-4" />
            <span>Effacer</span>
          </button>
        )}
      </div>

      <div className="space-y-6">
        
        {/* Genre */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Genre musical
          </label>
          <select
            value={filters.genre}
            onChange={(e) => applyFilters({ ...filters, genre: e.target.value })}
            className="w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="">Tous les genres</option>
            {genres.map(genre => (
              <option key={genre} value={genre} className="text-gray-700">{genre}</option>
            ))}
          </select>
        </div>

        {/* Pays */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pays
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="country"
                value=""
                checked={filters.country === ''}
                onChange={(e) => applyFilters({ ...filters, country: e.target.value })}
                className="mr-2 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Tous les pays</span>
            </label>
            {countries.map(country => (
              <label key={country} className="flex items-center">
                <input
                  type="radio"
                  name="country"
                  value={country}
                  checked={filters.country === country}
                  onChange={(e) => applyFilters({ ...filters, country: e.target.value })}
                  className="mr-2 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{country}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Nombre de jours */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nombre de jours
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => applyFilters({ ...filters, nbDays: '' })}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                filters.nbDays === '' 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tous
            </button>
            <button
              onClick={() => applyFilters({ ...filters, nbDays: '1' })}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                filters.nbDays === '1' 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              1 jour
            </button>
            <button
              onClick={() => applyFilters({ ...filters, nbDays: '2' })}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                filters.nbDays === '2' 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              2 jours
            </button>
            <button
              onClick={() => applyFilters({ ...filters, nbDays: '3' })}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                filters.nbDays === '3' 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              3 jours
            </button>
          </div>
        </div>

        {/* Plage de prix */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Plage de prix (€)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Min"
              min="0"
              max={maxPrice}
              value={filters.minPrice || ''}
              onChange={(e) => applyFilters({ ...filters, minPrice: parseInt(e.target.value) || 0 })}
              className="px-3 py-2 border text-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <input
              type="number"
              placeholder="Max"
              min="0"
              max={maxPrice}
              value={filters.maxPrice || ''}
              onChange={(e) => applyFilters({ ...filters, maxPrice: parseInt(e.target.value) || 0 })}
              className="px-3 py-2 border text-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>

      </div>
    </div>
  );
} 