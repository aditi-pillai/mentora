'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  BookOpen,
  Users,
  Calendar,
  Clock,
  Star,
  Search,
  Filter,
  Eye,
  ChevronRight,
  Play,
  FileText,
  Target,
  Brain,
  Award,
  TrendingUp,
  UserPlus,
  Building2,
  GraduationCap,
  CheckCircle,
  Plus
} from 'lucide-react';

export default function StudentCoursesPage() {
  const [activeTab, setActiveTab] = useState('available');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [connectedInstitute, setConnectedInstitute] = useState<any>(null);
  const [sharedContent, setSharedContent] = useState<any[]>([]);

  useEffect(() => {
    // Load connected institute data
    const instituteData = localStorage.getItem('connectedInstitute');
    if (instituteData) {
      setConnectedInstitute(JSON.parse(instituteData));
    }
    
    // Load shared content data
    const sharedData = localStorage.getItem('sharedContent');
    if (sharedData) {
      setSharedContent(JSON.parse(sharedData));
    }
  }, []);

  // Mock available courses from institutes
  const availableCourses = [
    {
      id: 1,
      title: 'Machine Learning Fundamentals',
      description: 'Comprehensive introduction to machine learning concepts and algorithms',
      institute: 'Tech University',
      teacher: 'Dr. Sarah Chen',
      students: 145,
      duration: '12 weeks',
      difficulty: 'Beginner',
      category: 'Computer Science',
      startDate: '2024-02-01',
      endDate: '2024-04-30',
      thumbnail: '🤖',
      tags: ['Machine Learning', 'AI', 'Python'],
      rating: 4.8,
      reviews: 156,
      price: 'Free',
      features: ['AI-Generated Content', 'Interactive Quizzes', 'Study Materials', 'Certificate']
    },
    {
      id: 2,
      title: 'Python Programming',
      description: 'Complete Python programming course from basics to advanced topics',
      institute: 'Tech University',
      teacher: 'Prof. Michael Rodriguez',
      students: 203,
      duration: '10 weeks',
      difficulty: 'Beginner',
      category: 'Programming',
      startDate: '2024-02-15',
      endDate: '2024-05-01',
      thumbnail: '🐍',
      tags: ['Python', 'Programming', 'Web Development'],
      rating: 4.7,
      reviews: 234,
      price: 'Free',
      features: ['Hands-on Projects', 'Code Reviews', 'Portfolio Building']
    },
    {
      id: 3,
      title: 'Data Science Essentials',
      description: 'Essential data science tools and techniques for beginners',
      institute: 'Data Science Academy',
      teacher: 'Dr. Emily Watson',
      students: 98,
      duration: '8 weeks',
      difficulty: 'Intermediate',
      category: 'Data Science',
      startDate: '2024-03-01',
      endDate: '2024-04-30',
      thumbnail: '📊',
      tags: ['Data Science', 'Statistics', 'Analytics'],
      rating: 4.9,
      reviews: 89,
      price: 'Free',
      features: ['Real Datasets', 'Industry Projects', 'Mentorship']
    },
    {
      id: 4,
      title: 'Statistics and Probability',
      description: 'Mathematical foundations for data science and machine learning',
      institute: 'AI Institute',
      teacher: 'Prof. David Kim',
      students: 167,
      duration: '6 weeks',
      difficulty: 'Intermediate',
      category: 'Mathematics',
      startDate: '2024-02-20',
      endDate: '2024-04-10',
      thumbnail: '📈',
      tags: ['Statistics', 'Probability', 'Mathematics'],
      rating: 4.6,
      reviews: 112,
      price: 'Free',
      features: ['Mathematical Proofs', 'Practical Applications', 'Problem Solving']
    }
  ];

  // Mock enrolled courses with shared content
  const enrolledCourses = [
    {
      id: 1,
      title: 'Machine Learning Fundamentals',
      institute: 'Tech University',
      teacher: 'Dr. Sarah Chen',
      progress: 65,
      nextLesson: 'Neural Networks Basics',
      lastAccessed: '2 days ago',
      thumbnail: '🤖',
      status: 'active',
      sharedContent: sharedContent.filter(sc => sc.courseId === '1')
    },
    {
      id: 2,
      title: 'Python Programming',
      institute: 'Tech University',
      teacher: 'Prof. Michael Rodriguez',
      progress: 100,
      nextLesson: 'Course Completed',
      lastAccessed: '1 week ago',
      thumbnail: '🐍',
      status: 'completed',
      sharedContent: sharedContent.filter(sc => sc.courseId === '2')
    }
  ];

  const tabs = [
    { id: 'enrolled', name: 'My Courses', icon: BookOpen },
    { id: 'available', name: 'Available Courses', icon: Plus },
    { id: 'completed', name: 'Completed', icon: Award }
  ];

  const categories = ['all', 'Computer Science', 'Programming', 'Data Science', 'Mathematics'];

  const filteredCourses = availableCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.teacher.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout userType="student">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Courses</h1>
              <p className="text-gray-600 mt-2">
                {connectedInstitute 
                  ? `Browse courses from ${connectedInstitute.name} and other institutes` 
                  : 'Browse courses from various educational institutes'
                }
              </p>
            </div>
          </div>

          {/* Connected Institute Info */}
          {connectedInstitute && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200 mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{connectedInstitute.name}</h3>
                  <p className="text-sm text-gray-600">{connectedInstitute.location}</p>
                  <p className="text-xs text-gray-500">Student at {connectedInstitute.type}</p>
                </div>
              </div>
            </div>
          )}

          {!connectedInstitute && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-yellow-800">No Institute Connected</h3>
                  <p className="text-sm text-yellow-700">Connect to an institute to access courses</p>
                </div>
                <a 
                  href="/dashboard/student/settings"
                  className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm font-medium"
                >
                  Connect Institute
                </a>
              </div>
            </div>
          )}

          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'enrolled' && (
          <div className="space-y-6">
            {enrolledCourses.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Enrolled Courses</h3>
                <p className="text-gray-600 mb-6">Browse available courses to start learning</p>
                <button 
                  onClick={() => setActiveTab('available')}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Browse Courses
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {enrolledCourses.map((course) => (
                  <div key={course.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-3">
                        <div className="text-3xl">{course.thumbnail}</div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{course.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{course.institute}</p>
                          <p className="text-xs text-blue-600">{course.teacher}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                        {course.status}
                      </span>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Progress:</span>
                        <span className="font-medium">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Next:</span>
                        <span className="font-medium">{course.nextLesson}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Last Accessed:</span>
                        <span className="font-medium">{course.lastAccessed}</span>
                      </div>
                    </div>

                    {/* Shared Content */}
                    {course.sharedContent && course.sharedContent.length > 0 && (
                      <div className="mb-4 pt-4 border-t border-gray-200">
                        <p className="text-sm font-medium text-gray-700 mb-2">Shared by Teacher:</p>
                        <div className="space-y-2">
                          {course.sharedContent.slice(0, 2).map((content: any) => (
                            <div key={content.id} className="flex items-center justify-between bg-blue-50 rounded-lg p-2">
                              <div className="flex items-center space-x-2">
                                <FileText className="w-4 h-4 text-blue-600" />
                                <span className="text-sm text-blue-800">{content.contentTitle}</span>
                              </div>
                              <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                                {content.shareOptions.announcement ? 'Announcement' : 
                                 content.shareOptions.materials ? 'Materials' : 'Assignment'}
                              </span>
                            </div>
                          ))}
                          {course.sharedContent.length > 2 && (
                            <p className="text-xs text-gray-500">+{course.sharedContent.length - 2} more shared items</p>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <Play className="w-4 h-4" />
                        <span>Continue</span>
                      </button>
                      <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        <Eye className="w-4 h-4" />
                        <span>View</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'available' && (
          <div className="space-y-6">
            {/* Search and Filter */}
            <div className="flex items-center space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
                <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>
            </div>

            {/* Available Courses */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <div key={course.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-3">
                      <div className="text-3xl">{course.thumbnail}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{course.title}</h3>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{course.description}</p>
                        <div className="flex items-center space-x-2 text-xs text-blue-600">
                          <Building2 className="w-3 h-3" />
                          <span>{course.institute}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Instructor:</span>
                      <span className="font-medium">{course.teacher}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Students:</span>
                      <span className="font-medium">{course.students}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{course.duration}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Starts:</span>
                      <span className="font-medium">{course.startDate}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Rating:</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-medium">{course.rating}</span>
                        <span className="text-gray-500">({course.reviews})</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(course.difficulty)}`}>
                      {course.difficulty}
                    </span>
                    <span className="text-lg font-bold text-green-600">{course.price}</span>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {course.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-2 mb-4">
                    <p className="text-sm font-medium text-gray-700">Features:</p>
                    <div className="flex flex-wrap gap-1">
                      {course.features.slice(0, 2).map((feature, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                          {feature}
                        </span>
                      ))}
                      {course.features.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                          +{course.features.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <UserPlus className="w-4 h-4" />
                      <span>Enroll</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      <Eye className="w-4 h-4" />
                      <span>Preview</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Courses Found</h3>
                <p className="text-gray-600">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'completed' && (
          <div className="space-y-6">
            <div className="text-center py-12">
              <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Completed Courses</h3>
              <p className="text-gray-600">Your completed courses will appear here</p>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
