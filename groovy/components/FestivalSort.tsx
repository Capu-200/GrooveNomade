import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface FestivalSortProps {
  onSortChange: (sortBy: string) => void;
  currentSort: string;
}

export default function FestivalSort({ onSortChange, currentSort }: FestivalSortProps) {
  const sortOptions = [
    { value: 'date_asc', label: 'Date (plus proche)' },
    { value: 'date_desc', label: 'Date (plus lointaine)' },
    { value: 'name_asc', label: 'Nom (A-Z)' },
    { value: 'name_desc', label: 'Nom (Z-A)' },
    { value: 'price_asc', label: 'Prix (croissant)' },
    { value: 'price_desc', label: 'Prix (décroissant)' },
    { value: 'days_asc', label: 'Durée (croissante)' },
    { value: 'days_desc', label: 'Durée (décroissante)' }
  ];

  return (
    <div className="flex items-center space-x-2">
      <label className="text-sm font-medium text-gray-700">
        Trier par :
      </label>
      <div className="relative">
        <select
          value={currentSort}
          onChange={(e) => onSortChange(e.target.value)}
          className="appearance-none text-gray-700 bg-white border border-gray-300 rounded-md px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
} 