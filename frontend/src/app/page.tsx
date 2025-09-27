'use client';

import { useState } from 'react';
import { Brain, Users, GraduationCap, BookOpen, Upload, MessageSquare, BarChart3, ArrowRight, Play } from 'lucide-react';

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Memory",
      description: "Long-term context memory that adapts to your learning style across semesters"
    },
    {
      icon: Upload,
      title: "Multi-Input Content",
      description: "Upload PDFs, YouTube videos, research papers - all organized in one place"
    },
    {
      icon: MessageSquare,
      title: "Collaborative Spaces",
      description: "Group study rooms with AI co-pilot and auto-generated meeting notes"
    },
    {
      icon: BarChart3,
      title: "Smart Analytics",
      description: "Track progress, generate quizzes, and get personalized insights"
    }
  ];

  const userTypes = [
    {
      title: "Students",
      description: "Organize study materials, generate practice questions, and collaborate with peers",
      features: ["Study Guides", "Practice Quizzes", "Group Study Rooms", "AI Summaries"],
      color: "from-blue-500 to-purple-600"
    },
    {
      title: "Teachers",
      description: "Create engaging content, generate quizzes, and track student progress",
      features: ["Quiz Generator", "Content Management", "Student Analytics", "Research Tools"],
      color: "from-green-500 to-teal-600"
    },
    {
      title: "Institutes",
      description: "Manage courses, assignments, and provide cutting-edge AI-driven education",
      features: ["Course Management", "Performance Tracking", "Assignment Auto-grading", "Integration Hub"],
      color: "from-purple-500 to-pink-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Mentora</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">How it Works</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
              <a href="/login" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-200">
                Get Started
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Brain className="w-4 h-4 mr-2" />
              Your AI-powered mentor that remembers, adapts, and collaborates
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Transform Your
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Learning Experience</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              The all-in-one AI-powered educational ecosystem where students, teachers, and institutes 
              share one intelligent platform. Transform raw content into personalized study experiences.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <a href="/login" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-200 flex items-center">
                Start Learning
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full text-lg font-semibold hover:border-gray-400 transition-all duration-200 flex items-center">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">10K+</div>
                <div className="text-gray-600">Active Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">500+</div>
                <div className="text-gray-600">Teachers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">50+</div>
                <div className="text-gray-600">Institutes</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Every Learner
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to succeed in your educational journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-200 cursor-pointer"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mb-4 transition-transform duration-200 ${hoveredCard === index ? 'scale-110' : ''}`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Built for Everyone
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Whether you're a student, teacher, or institute, Mentora adapts to your needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {userTypes.map((userType, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-200">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${userType.color} flex items-center justify-center mb-6`}>
                  {userType.title === 'Students' && <BookOpen className="w-8 h-8 text-white" />}
                  {userType.title === 'Teachers' && <GraduationCap className="w-8 h-8 text-white" />}
                  {userType.title === 'Institutes' && <Users className="w-8 h-8 text-white" />}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{userType.title}</h3>
                <p className="text-gray-600 mb-6">{userType.description}</p>
                <ul className="space-y-2">
                  {userType.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of students, teachers, and institutes already using Mentora
          </p>
          <a href="/login" className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-200">
            Get Started Free
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Mentora</span>
              </div>
              <p className="text-gray-400">Your AI-powered mentor that remembers, adapts, and collaborates.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Demo</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Mentora. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
