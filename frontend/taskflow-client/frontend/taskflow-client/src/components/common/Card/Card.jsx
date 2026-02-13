// src/components/common/Card/Card.jsx
export default function Card({ children, className = '', padding = true }) {
  return (
    <div
      className={`
        bg-white rounded-lg shadow-sm border border-gray-200
        ${padding ? 'p-6' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

// Sub-components for compound pattern
Card.Header = function CardHeader({ children, className = '' }) {
  return (
    <div className={`border-b border-gray-200 px-6 py-4 ${className}`}>
      {children}
    </div>
  );
};

Card.Body = function CardBody({ children, className = '' }) {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
};

Card.Footer = function CardFooter({ children, className = '' }) {
  return (
    <div className={`border-t border-gray-200 px-6 py-4 ${className}`}>
      {children}
    </div>
  );
};