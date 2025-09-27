'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye, 
  Share, 
  Download,
  HelpCircle,
  Users,
  Calendar,
  Target,
  CheckCircle,
  Clock,
  BookOpen,
  Brain
} from 'lucide-react';

export default function TeacherQuizzesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const categories = [
    { id: 'all', label: 'All Quizzes', count: 8 },
    { id: 'ai', label: 'AI Generated', count: 5 },
    { id: 'manual', label: 'Manual', count: 3 },
    { id: 'published', label: 'Published', count: 6 },
    { id: 'draft', label: 'Draft', count: 2 },
  ];

  const quizzes = [
    {
      id: 1,
      title: 'Machine Learning Fundamentals Quiz',
      description: 'Comprehensive quiz covering basic ML concepts and algorithms',
      category: 'ai',
      status: 'published',
      questions: 15,
      duration: '20 min',
      difficulty: 'Beginner',
      createdAt: '2024-01-15',
      lastUsed: '2024-01-20',
      attempts: 156,
      avgScore: 85.2,
      course: 'ML Course A',
      tags: ['Machine Learning', 'Algorithms', 'Basics'],
      isStarred: true
    },
    {
      id: 2,
      title: 'Python Data Structures Assessment',
      description: 'Test knowledge of Python lists, dictionaries, and tuples',
      category: 'manual',
      status: 'published',
      questions: 12,
      duration: '15 min',
      difficulty: 'Intermediate',
      createdAt: '2024-01-10',
      lastUsed: '2024-01-18',
      attempts: 89,
      avgScore: 88.7,
      course: 'Python Programming',
      tags: ['Python', 'Data Structures'],
      isStarred: false
    },
    {
      id: 3,
      title: 'Statistics and Probability Quiz',
      description: 'Mathematical foundations for data science',
      category: 'ai',
      status: 'draft',
      questions: 20,
      duration: '30 min',
      difficulty: 'Advanced',
      createdAt: '2024-01-12',
      lastUsed: null,
      attempts: 0,
      avgScore: 0,
      course: 'Data Science Fundamentals',
      tags: ['Statistics', 'Probability', 'Math'],
      isStarred: true
    },
    {
      id: 4,
      title: 'Deep Learning Concepts Test',
      description: 'Neural networks and deep learning fundamentals',
      category: 'ai',
      status: 'published',
      questions: 18,
      duration: '25 min',
      difficulty: 'Intermediate',
      createdAt: '2024-01-08',
      lastUsed: '2024-01-19',
      attempts: 67,
      avgScore: 78.3,
      course: 'Advanced AI',
      tags: ['Deep Learning', 'Neural Networks'],
      isStarred: false
    }
  ];

  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         quiz.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         quiz.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || quiz.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'text-green-600 bg-green-100';
      case 'draft': return 'text-yellow-600 bg-yellow-100';
      case 'archived': return 'text-gray-600 bg-gray-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'Advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <DashboardLayout userType="teacher">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--color-base-content)' }}>Quiz Management</h1>
            <p style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>Create, manage, and track your quiz performance</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 rounded-lg transition-all duration-200 flex items-center space-x-2 btn-abyss"
            style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', color: 'var(--color-accent-content)' }}
          >
            <Plus className="w-5 h-5" />
            <span>Generate New Quiz</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="rounded-xl p-6 abyss-card border-abyss">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>Total Quizzes</p>
                <p className="text-2xl font-bold" style={{ color: 'var(--color-base-content)' }}>{quizzes.length}</p>
              </div>
              <div className="p-3 rounded-lg border-abyss" style={{ background: 'color-mix(in oklch, var(--color-base-100) 25%, transparent)' }}>
                <HelpCircle className="w-6 h-6" style={{ color: 'var(--color-primary)' }} />
              </div>
            </div>
          </div>
          
          <div className="rounded-xl p-6 abyss-card border-abyss">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>Published</p>
                <p className="text-2xl font-bold" style={{ color: 'var(--color-base-content)' }}>{quizzes.filter(q => q.status === 'published').length}</p>
              </div>
              <div className="p-3 rounded-lg border-abyss" style={{ background: 'color-mix(in oklch, var(--color-base-100) 25%, transparent)' }}>
                <CheckCircle className="w-6 h-6" style={{ color: 'var(--color-success)' }} />
              </div>
            </div>
          </div>
          
          <div className="rounded-xl p-6 abyss-card border-abyss">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>Total Attempts</p>
                <p className="text-2xl font-bold" style={{ color: 'var(--color-base-content)' }}>{quizzes.reduce((sum, q) => sum + q.attempts, 0)}</p>
              </div>
              <div className="p-3 rounded-lg border-abyss" style={{ background: 'color-mix(in oklch, var(--color-base-100) 25%, transparent)' }}>
                <Users className="w-6 h-6" style={{ color: 'var(--color-secondary)' }} />
              </div>
            </div>
          </div>
          
          <div className="rounded-xl p-6 abyss-card border-abyss">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>Avg Score</p>
                <p className="text-2xl font-bold" style={{ color: 'var(--color-base-content)' }}>
                  {Math.round(quizzes.filter(q => q.attempts > 0).reduce((sum, q) => sum + q.avgScore, 0) / quizzes.filter(q => q.attempts > 0).length) || 0}%
                </p>
              </div>
              <div className="p-3 rounded-lg border-abyss" style={{ background: 'color-mix(in oklch, var(--color-base-100) 25%, transparent)' }}>
                <Target className="w-6 h-6" style={{ color: 'var(--color-warning)' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="rounded-xl p-6 abyss-card border-abyss mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: 'color-mix(in oklch, var(--color-base-content) 60%, transparent)' }} />
                <input
                  type="text"
                  placeholder="Search quizzes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg focus:ring-2"
                  style={{ border: '1px solid color-mix(in oklch, var(--color-base-100) 35%, transparent)', background: 'color-mix(in oklch, var(--color-base-300) 80%, transparent)', color: 'var(--color-base-content)', outlineColor: 'var(--color-primary)' }}
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5" style={{ color: 'color-mix(in oklch, var(--color-base-content) 60%, transparent)' }} />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="rounded-lg px-3 py-2 focus:ring-2 border-abyss"
                  style={{ background: 'color-mix(in oklch, var(--color-base-300) 80%, transparent)', color: 'var(--color-base-content)', outlineColor: 'var(--color-primary)' }}
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.label} ({category.count})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Quizzes Table */}
        <div className="rounded-xl shadow-sm abyss-card border-abyss">
          <div className="p-6" style={{ borderBottom: '1px solid color-mix(in oklch, var(--color-base-100) 30%, transparent)' }}>
            <h2 className="text-xl font-semibold" style={{ color: 'var(--color-base-content)' }}>Your Quizzes</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead style={{ background: 'color-mix(in oklch, var(--color-base-100) 25%, transparent)' }}>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'color-mix(in oklch, var(--color-base-content) 60%, transparent)' }}>Quiz</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'color-mix(in oklch, var(--color-base-content) 60%, transparent)' }}>Course</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'color-mix(in oklch, var(--color-base-content) 60%, transparent)' }}>Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'color-mix(in oklch, var(--color-base-content) 60%, transparent)' }}>Performance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'color-mix(in oklch, var(--color-base-content) 60%, transparent)' }}>Last Used</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'color-mix(in oklch, var(--color-base-content) 60%, transparent)' }}>Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ background: 'transparent', borderColor: 'color-mix(in oklch, var(--color-base-100) 25%, transparent)' }}>
                {filteredQuizzes.map(quiz => (
                  <tr key={quiz.id} className="transition-colors" style={{ background: 'transparent' }}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center border-abyss" style={{ background: 'color-mix(in oklch, var(--color-base-100) 25%, transparent)' }}>
                            <HelpCircle className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium flex items-center space-x-2" style={{ color: 'var(--color-base-content)' }}>
                            <span>{quiz.title}</span>
                            {quiz.isStarred && <span className="text-yellow-500">★</span>}
                          </div>
                          <div className="text-sm" style={{ color: 'color-mix(in oklch, var(--color-base-content) 65%, transparent)' }}>{quiz.description}</div>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border-abyss`} style={{ color: 'var(--color-warning)', background: 'color-mix(in oklch, var(--color-warning) 15%, transparent)' }}>
                              {quiz.difficulty}
                            </span>
                            <span className="text-xs" style={{ color: 'color-mix(in oklch, var(--color-base-content) 60%, transparent)' }}>{quiz.questions} questions • {quiz.duration}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm" style={{ color: 'var(--color-base-content)' }}>{quiz.course}</div>
                      <div className="text-sm" style={{ color: 'color-mix(in oklch, var(--color-base-content) 60%, transparent)' }}>{quiz.createdAt}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border-abyss`} style={{ color: 'var(--color-success)', background: 'color-mix(in oklch, var(--color-success) 15%, transparent)' }}>
                        {quiz.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm" style={{ color: 'var(--color-base-content)' }}>{quiz.attempts} attempts</div>
                      <div className="text-sm" style={{ color: 'color-mix(in oklch, var(--color-base-content) 60%, transparent)' }}>Avg: {quiz.avgScore}%</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm" style={{ color: 'var(--color-base-content)' }}>{quiz.lastUsed || 'Never'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="p-1 border-abyss rounded" title="View" style={{ color: 'var(--color-primary)' }}>
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1 border-abyss rounded" title="Edit" style={{ color: 'color-mix(in oklch, var(--color-base-content) 60%, transparent)' }}>
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1 border-abyss rounded" title="Share" style={{ color: 'var(--color-success)' }}>
                          <Share className="w-4 h-4" />
                        </button>
                        <button className="p-1 border-abyss rounded" title="More" style={{ color: 'color-mix(in oklch, var(--color-base-content) 60%, transparent)' }}>
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create Quiz Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="rounded-xl p-6 w-full max-w-md mx-4 abyss-card border-abyss">
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-base-content)' }}>Generate New Quiz</h3>
              
              <div className="space-y-4">
                <div className="rounded-lg p-4 border-abyss" style={{ background: 'color-mix(in oklch, var(--color-base-100) 25%, transparent)' }}>
                  <div className="flex items-center space-x-3">
                    <Brain className="w-8 h-8" style={{ color: 'var(--color-primary)' }} />
                    <div>
                      <h4 className="font-semibold" style={{ color: 'var(--color-base-content)' }}>AI Quiz Generation</h4>
                      <p className="text-sm" style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>Generate quizzes from your uploaded content</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <button className="w-full p-4 border-2 border-dashed rounded-lg transition-colors text-left border-abyss">
                    <div className="flex items-center space-x-3">
                      <BookOpen className="w-6 h-6" style={{ color: 'var(--color-primary)' }} />
                      <div>
                        <div className="font-medium" style={{ color: 'var(--color-base-content)' }}>From Content Library</div>
                        <div className="text-sm" style={{ color: 'color-mix(in oklch, var(--color-base-content) 65%, transparent)' }}>Select from your uploaded materials</div>
                      </div>
                    </div>
                  </button>
                  
                  <button className="w-full p-4 border-2 border-dashed rounded-lg transition-colors text-left border-abyss">
                    <div className="flex items-center space-x-3">
                      <HelpCircle className="w-6 h-6" style={{ color: 'var(--color-success)' }} />
                      <div>
                        <div className="font-medium" style={{ color: 'var(--color-base-content)' }}>Manual Creation</div>
                        <div className="text-sm" style={{ color: 'color-mix(in oklch, var(--color-base-content) 65%, transparent)' }}>Create questions manually</div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-lg transition-colors btn-abyss-outline"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
