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
    <div className="min-h-screen" style={{ background: 'radial-gradient(1200px 800px at 20% -10%, color-mix(in oklch, var(--color-base-200) 70%, transparent), transparent), radial-gradient(1200px 800px at 120% 10%, color-mix(in oklch, var(--color-base-300) 60%, transparent), transparent), var(--color-base-300)' }}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full backdrop-blur-md z-50 border-b" style={{ background: 'color-mix(in oklch, var(--color-base-300) 60%, transparent)', borderColor: 'color-mix(in oklch, var(--color-base-100) 30%, transparent)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}>
                <Brain className="w-5 h-5" style={{ color: 'var(--color-accent-content)' }} />
              </div>
              <span className="text-xl font-bold" style={{ color: 'var(--color-base-content)' }}>Mentora</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="transition-colors" style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>Features</a>
              <a href="#how-it-works" className="transition-colors" style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>How it Works</a>
              <a href="#pricing" className="transition-colors" style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>Pricing</a>
              <a href="/login" className="px-6 py-2 rounded-full transition-all duration-200" style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', color: 'var(--color-accent-content)' }}>
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
            <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-8" style={{ background: 'color-mix(in oklch, var(--color-base-100) 30%, transparent)', color: 'var(--color-info)' }}>
              <Brain className="w-4 h-4 mr-2" />
              Your AI-powered mentor that remembers, adapts, and collaborates
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight" style={{ color: 'var(--color-base-content)' }}>
              Transform Your
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}> Learning Experience</span>
            </h1>
            
            <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed" style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>
              The all-in-one AI-powered educational ecosystem where students, teachers, and institutes 
              share one intelligent platform. Transform raw content into personalized study experiences.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <a href="/login" className="px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-200 flex items-center" style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', color: 'var(--color-accent-content)' }}>
                Start Learning
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
              <button className="px-8 py-4 rounded-full text-lg font-semibold transition-all duration-200 flex items-center" style={{ border: '1px solid color-mix(in oklch, var(--color-base-100) 30%, transparent)', color: 'var(--color-base-content)' }}>
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ color: 'var(--color-base-content)' }}>10K+</div>
                <div style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>Active Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ color: 'var(--color-base-content)' }}>500+</div>
                <div style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>Teachers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ color: 'var(--color-base-content)' }}>50+</div>
                <div style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>Institutes</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8" style={{ background: 'var(--color-base-300)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--color-base-content)' }}>
              Powerful Features for Every Learner
            </h2>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>
              Everything you need to succeed in your educational journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl transition-all duration-300 cursor-pointer abyss-card hover:scale-[1.02]"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-transform duration-200 ${hoveredCard === index ? 'scale-110' : ''}`} style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}>
                  <feature.icon className="w-6 h-6" style={{ color: 'var(--color-accent-content)' }} />
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-base-content)' }}>{feature.title}</h3>
                <p style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ background: 'var(--color-base-200)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--color-base-content)' }}>
              Built for Everyone
            </h2>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>
              Whether you're a student, teacher, or institute, Mentora adapts to your needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {userTypes.map((userType, index) => (
              <div key={index} className="rounded-2xl p-8 transition-all duration-300 abyss-card hover:scale-[1.02]">
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6`} style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}>
                  {userType.title === 'Students' && <BookOpen className="w-8 h-8" style={{ color: 'var(--color-accent-content)' }} />}
                  {userType.title === 'Teachers' && <GraduationCap className="w-8 h-8" style={{ color: 'var(--color-accent-content)' }} />}
                  {userType.title === 'Institutes' && <Users className="w-8 h-8" style={{ color: 'var(--color-accent-content)' }} />}
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-base-content)' }}>{userType.title}</h3>
                <p className="mb-6" style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>{userType.description}</p>
                <ul className="space-y-2">
                  {userType.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center" style={{ color: 'var(--color-base-content)' }}>
                      <div className="w-2 h-2 rounded-full mr-3" style={{ background: 'var(--color-primary)' }}></div>
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
      <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl mb-8" style={{ color: 'color-mix(in oklch, var(--color-accent-content) 70%, transparent)' }}>
            Join thousands of students, teachers, and institutes already using Mentora
          </p>
          <a href="/login" className="px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-200" style={{ background: 'var(--color-accent-content)', color: 'var(--color-accent)' }}>
            Get Started Free
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8" style={{ background: 'var(--color-base-300)', color: 'var(--color-base-content)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}>
                  <Brain className="w-5 h-5" style={{ color: 'var(--color-accent-content)' }} />
                </div>
                <span className="text-xl font-bold">Mentora</span>
              </div>
              <p style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>Your AI-powered mentor that remembers, adapts, and collaborates.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2" style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>
                <li><a href="#" className="transition-colors">Features</a></li>
                <li><a href="#" className="transition-colors">Pricing</a></li>
                <li><a href="#" className="transition-colors">Demo</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2" style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>
                <li><a href="#" className="transition-colors">Help Center</a></li>
                <li><a href="#" className="transition-colors">Contact</a></li>
                <li><a href="#" className="transition-colors">Status</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2" style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>
                <li><a href="#" className="transition-colors">About</a></li>
                <li><a href="#" className="transition-colors">Blog</a></li>
                <li><a href="#" className="transition-colors">Careers</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 text-center" style={{ color: 'color-mix(in oklch, var(--color-base-content) 60%, transparent)', borderTop: '1px solid color-mix(in oklch, var(--color-base-100) 30%, transparent)' }}>
            <p>&copy; 2024 Mentora. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
