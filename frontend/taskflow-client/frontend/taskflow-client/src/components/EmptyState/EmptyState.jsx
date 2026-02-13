// src/components/common/EmptyState/EmptyState.jsx
export default function EmptyState({ icon, title, description, action }) {
  return (
    <div className="text-center py-8 sm:py-12 px-4">
      {icon && <div className="flex justify-center mb-3 sm:mb-4">{icon}</div>}
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      {description && (
        <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 max-w-sm mx-auto">{description}</p>
      )}
      {action}
    </div>
  );
}