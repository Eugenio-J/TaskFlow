// src/pages/Auth/RegisterPage.jsx
import { Link } from 'react-router-dom';
import RegisterForm from '../../components/features/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Decorative (Hidden on mobile) */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-primary-600 via-primary-700 to-purple-800 p-12 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        </div>

        <div className="relative text-white text-center max-w-lg">
          <h2 className="text-4xl font-bold mb-6">
            Start your journey with TaskFlow
          </h2>
          <p className="text-primary-100 text-lg mb-8">
            Join thousands of professionals who trust TaskFlow to manage their projects and boost productivity.
          </p>
          
          {/* Feature list */}
          <div className="space-y-4 text-left">
            {[
              'Unlimited projects and tasks',
              'Beautiful Kanban boards',
              'Team collaboration tools',
              'Analytics and insights',
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-primary-100">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 bg-gray-50">
        <div className="w-full max-w-md animate-fade-in">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">TaskFlow</span>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Create your account
            </h1>
            <p className="text-gray-600">
              Start your free trial. No credit card required.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-card p-6 sm:p-8">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}