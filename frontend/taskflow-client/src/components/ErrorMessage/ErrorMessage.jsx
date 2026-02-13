// src/components/common/ErrorMessage/ErrorMessage.jsx
import Button from '../Button/Button';

export default function ErrorMessage({ 
  title = 'Something went wrong',
  message,
  onRetry,
}) {
  return (
    <div className="text-center py-12 px-4">
      {/* Icon */}
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h3>

      {/* Message */}
      {message && (
        <p className="text-gray-600 mb-6 max-w-sm mx-auto">
          {message}
        </p>
      )}

      {/* Retry Button */}
      {onRetry && (
        <Button onClick={onRetry} variant="secondary">
          Try Again
        </Button>
      )}
    </div>
  );
}