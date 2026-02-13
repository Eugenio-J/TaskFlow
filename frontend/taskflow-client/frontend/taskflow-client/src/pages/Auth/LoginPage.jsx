// src/pages/Auth/LoginPage.jsx
import { Link } from 'react-router-dom';
import LoginForm from '../../components/features/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12 bg-gray-50">
        <div className="w-full max-w-md animate-fade-in">
          {/* Logo */}
          <Link to="/" className="inline-flex items-center gap-3 mb-10">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-gray-900">TaskFlow</span>
          </Link>

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">
              Welcome back
            </h1>
            <p className="mt-3 text-lg text-gray-600">
              Sign in to continue to your dashboard
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-8 border border-gray-100">
            <LoginForm />
          </div>

          {/* Footer */}
          <p className="mt-10 text-center text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
              Sign up free →
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Decorative */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-400/20 rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative flex items-center justify-center p-12">
          <div className="text-center text-white max-w-lg">
            {/* Illustration */}
            <div className="mb-10">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-xl rounded-3xl mb-8">
                <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Manage your tasks with ease
            </h2>
            <p className="text-lg text-white/80 leading-relaxed">
              Stay organized, collaborate with your team, and achieve your goals faster than ever before.
            </p>

            {/* Testimonial */}
            <div className="mt-12 p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
              <p className="text-white/90 italic mb-4">
                "TaskFlow has completely transformed how our team works. We're 3x more productive now!"
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full" />
                <div className="text-left">
                  <div className="font-semibold text-white">Sarah Johnson</div>
                  <div className="text-sm text-white/60">CEO, TechCorp</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}