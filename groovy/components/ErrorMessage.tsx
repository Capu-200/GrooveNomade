import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ 
  title = "Erreur", 
  message, 
  onRetry 
}: ErrorMessageProps) {
  return (
    <div className="rounded-md bg-red-50 p-4 border border-red-200">
      <div className="flex">
        <ExclamationTriangleIcon className="h-5 w-5 text-red-400 flex-shrink-0" />
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">{title}</h3>
          <div className="mt-2 text-sm text-red-700">
            <p>{message}</p>
          </div>
          {onRetry && (
            <div className="mt-4">
              <button
                type="button"
                onClick={onRetry}
                className="rounded-md bg-red-50 px-2 py-1.5 text-sm font-medium text-red-800 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
              >
                Réessayer
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 