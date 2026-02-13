// src/pages/NotFound/NotFoundPage.jsx
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button/Button';

export default function NotFoundPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-7xl sm:text-8xl md:text-9xl font-bold text-gray-200">404</h1>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mt-4 mb-3 sm:mb-4">
          Page not found
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 max-w-sm mx-auto">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          <Link to="/" className="w-full sm:w-auto">
            <Button className="w-full">Go Home</Button>
          </Link>
          <Link to="/dashboard" className="w-full sm:w-auto">
            <Button variant="secondary" className="w-full">Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}