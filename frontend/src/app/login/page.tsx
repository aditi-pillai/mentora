'use client';

import { useState } from 'react';
import { Brain, User, GraduationCap, Building2, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [userType, setUserType] = useState<'student' | 'teacher' | 'institute'>('student');
  const [email, setEmail] = useState('demo@mentora.com');
  const [password, setPassword] = useState('demo123');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const userTypes = [
    {
      id: 'student' as const,
      title: 'Student',
      description: 'Access study materials, quizzes, and collaboration tools',
      icon: User,
      color: 'from-blue-500 to-purple-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 'teacher' as const,
      title: 'Teacher',
      description: 'Create content, generate quizzes, and track progress',
      icon: GraduationCap,
      color: 'from-green-500 to-teal-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      id: 'institute' as const,
      title: 'Institute',
      description: 'Manage courses, assignments, and analytics',
      icon: Building2,
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Store user type in localStorage for demo purposes
    localStorage.setItem('userType', userType);
    localStorage.setItem('userEmail', email);
    
    // Redirect to dashboard based on user type
    router.push(`/dashboard/${userType}`);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Back to Home */}
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Brain className="w-7 h-7 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Mentora</h1>
          <p className="text-gray-600">Sign in to your account to continue</p>
        </div>

        {/* User Type Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">Select Account Type</label>
          <div className="grid grid-cols-3 gap-3">
            {userTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setUserType(type.id)}
                className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                  userType === type.id
                    ? `${type.borderColor} ${type.bgColor} shadow-md`
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <type.icon className={`w-6 h-6 mx-auto mb-2 ${
                  userType === type.id ? 'text-gray-900' : 'text-gray-400'
                }`} />
                <div className={`text-xs font-medium ${
                  userType === type.id ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {type.title}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors pr-12"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-500 transition-colors">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 text-center space-y-4">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <a href="#" className="text-blue-600 hover:text-blue-500 font-semibold transition-colors">
                Sign up
              </a>
            </p>
            
            <div className="border-t pt-4">
              <p className="text-sm text-gray-600 mb-3">Are you an educational institution?</p>
              <Link 
                href="/institute-register" 
                className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors font-medium"
              >
                <Building2 className="w-4 h-4" />
                <span>Register Institute</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">Demo Credentials</h3>
          <div className="text-xs text-blue-800 space-y-1">
            <p><strong>Email:</strong> demo@mentora.com</p>
            <p><strong>Password:</strong> demo123</p>
            <p className="text-blue-600 mt-2">Try any user type - all work with these credentials!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
