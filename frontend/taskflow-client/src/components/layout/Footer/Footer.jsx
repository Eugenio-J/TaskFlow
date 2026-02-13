// src/components/layout/Footer/Footer.jsx
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Logo & Copyright */}
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" 
              />
            </svg>
            <span className="text-xs sm:text-sm text-gray-500">
              © {new Date().getFullYear()} TaskFlow
            </span>
          </div>

          {/* Links */}
          <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700">
              GitHub
            </a>
            <Link to="/docs" className="text-gray-500 hover:text-gray-700">Docs</Link>
            <Link to="/privacy" className="text-gray-500 hover:text-gray-700">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}