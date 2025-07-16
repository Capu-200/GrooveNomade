import { Festival } from '@/lib/airtable';
import Link from 'next/link';

interface FestivalCardProps {
  festival: Festival;
}

export default function FestivalCard({ festival }: FestivalCardProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    // Gestion du format français DD/MM/YYYY
    if (dateString.includes('/')) {
      const [day, month, year] = dateString.split('/');
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    }
    // Format standard YYYY-MM-DD
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatDateRange = () => {
    if (!festival.date_debut) return '';
    const startDate = formatDate(festival.date_debut);
    const endDate = festival.date_fin ? formatDate(festival.date_fin) : '';
    if (startDate === endDate || !endDate) {
      return startDate;
    }
    return `${startDate} - ${endDate}`;
  };

  const getLocation = () => {
    const parts = [];
    if (festival.city) parts.push(festival.city);
    if (festival.country) parts.push(festival.country);
    return parts.join(', ');
  };

  return (
    <Link href={`/festival/${festival.id}`} className="block group focus:outline-none">
      <div className="relative bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-transparent group-hover:border-purple-400">
        <div className="aspect-square w-full overflow-hidden rounded-t-lg bg-gray-200">
          {festival.imageUrl ? (
            <img
              src={festival.imageUrl}
              alt={festival.name}
              className="h-full w-full object-cover group-hover:opacity-75 transition-opacity duration-300"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-gray-100">
              <span className="text-gray-400 text-sm">Aucune image</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
              {festival.name}
            </h3>
            {festival.nb_jours && festival.nb_jours > 0 && (
              <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                {festival.nb_jours}J
              </span>
            )}
          </div>
          {festival.date_debut && (
            <p className="text-sm text-gray-600 mb-2">
              📅 {formatDateRange()}
            </p>
          )}
          {getLocation() && (
            <p className="text-sm text-gray-600 mb-2">
              📍 {getLocation()}
            </p>
          )}
          {festival.genre && (
            <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full mb-3">
              {festival.genre}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
} 