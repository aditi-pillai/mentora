'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  Plus,
  BookOpen,
  Users,
  Calendar,
  Settings,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Share,
  Download,
  Upload,
  FileText,
  Target,
  Brain,
  Play,
  Star,
  Clock,
  Award,
  ChevronRight,
  Search,
  Filter,
  X,
  UserPlus,
  MessageSquare,
  BarChart3,
  Building2
} from 'lucide-react';

export default function TeacherCoursesPage() {
  const [activeTab, setActiveTab] = useState('my-courses');
  const [showCreateCourseModal, setShowCreateCourseModal] = useState(false);
  const [showShareContentModal, setShowShareContentModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [connectedInstitute, setConnectedInstitute] = useState<any>(null);
  const [sharedContent, setSharedContent] = useState<any[]>([]);

  useEffect(() => {
    // Load connected institute data
    const instituteData = localStorage.getItem('connectedInstitute');
    if (instituteData) {
      setConnectedInstitute(JSON.parse(instituteData));
    }
    
    // Load shared content data or create default for demo
    const sharedData = localStorage.getItem('sharedContent');
    if (sharedData) {
      setSharedContent(JSON.parse(sharedData));
    } else {
      // Create default shared content for demo
      const defaultSharedContent = [
        {
          id: 1,
          contentId: 'sg-1',
          courseId: '1',
          contentTitle: 'Introduction to Machine Learning',
          courseTitle: 'Machine Learning Fundamentals',
          shareOptions: {
            announcement: true,
            materials: true,
            assignment: false,
            message: 'Please review this study guide before our next class.'
          },
          sharedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
          status: 'shared'
        },
        {
          id: 2,
          contentId: 'quiz-1',
          courseId: '1',
          contentTitle: 'ML Fundamentals Quiz',
          courseTitle: 'Machine Learning Fundamentals',
          shareOptions: {
            announcement: false,
            materials: false,
            assignment: true,
            message: 'Complete this quiz by next Friday.'
          },
          sharedAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
          status: 'shared'
        }
      ];
      setSharedContent(defaultSharedContent);
      localStorage.setItem('sharedContent', JSON.stringify(defaultSharedContent));
    }
  }, []);

  // Mock teacher courses data
  const teacherCourses = [
    {
      id: 1,
      title: 'Machine Learning Fundamentals',
      description: 'Comprehensive introduction to machine learning concepts and algorithms',
      institute: connectedInstitute?.name || 'Tech University',
      students: 145,
      assignments: 8,
      status: 'active',
      createdDate: '2024-01-15',
      lastActivity: '2 hours ago',
      thumbnail: '🤖',
      tags: ['Machine Learning', 'AI', 'Python'],
      aiContent: {
        studyGuides: 5,
        quizzes: 12,
        presentations: 3,
        mindMaps: 2
      }
    },
    {
      id: 2,
      title: 'Python Programming',
      description: 'Complete Python programming course from basics to advanced topics',
      institute: connectedInstitute?.name || 'Tech University',
      students: 203,
      assignments: 12,
      status: 'active',
      createdDate: '2024-01-10',
      lastActivity: '4 hours ago',
      thumbnail: '🐍',
      tags: ['Python', 'Programming', 'Web Development'],
      aiContent: {
        studyGuides: 8,
        quizzes: 15,
        presentations: 6,
        mindMaps: 4
      }
    },
    {
      id: 3,
      title: 'Data Science Essentials',
      description: 'Essential data science tools and techniques for beginners',
      institute: 'Data Science Academy',
      students: 98,
      assignments: 6,
      status: 'draft',
      createdDate: '2024-01-20',
      lastActivity: '1 day ago',
      thumbnail: '📊',
      tags: ['Data Science', 'Statistics', 'Analytics'],
      aiContent: {
        studyGuides: 3,
        quizzes: 8,
        presentations: 2,
        mindMaps: 1
      }
    }
  ];

  // Mock AI-generated content from study guides
  const aiGeneratedContent = [
    {
      id: 'sg-1',
      type: 'study-guide',
      title: 'Introduction to Machine Learning',
      description: 'Basic concepts and definitions',
      generatedDate: '2024-01-15',
      tags: ['concepts', 'basics', 'introduction'],
      content: {
        sections: ['What is ML?', 'Types of Learning', 'Applications'],
        questionsGenerated: 12,
        notesGenerated: 5
      }
    },
    {
      id: 'quiz-1',
      type: 'quiz',
      title: 'ML Fundamentals Quiz',
      description: 'Interactive quiz on machine learning basics',
      generatedDate: '2024-01-16',
      tags: ['quiz', 'assessment', 'basics'],
      content: {
        questions: 20,
        difficulty: 'Beginner',
        topics: ['Supervised Learning', 'Unsupervised Learning', 'Evaluation']
      }
    },
    {
      id: 'ppt-1',
      type: 'presentation',
      title: 'ML Concepts Presentation',
      description: 'PowerPoint presentation on ML concepts',
      generatedDate: '2024-01-17',
      tags: ['presentation', 'slides', 'teaching'],
      content: {
        slides: 25,
        duration: '45m',
        sections: ['Introduction', 'Key Concepts', 'Examples']
      }
    },
    {
      id: 'notes-1',
      type: 'revision-notes',
      title: 'ML Revision Notes',
      description: 'Comprehensive revision notes for exam preparation',
      generatedDate: '2024-01-18',
      tags: ['revision', 'exam', 'notes'],
      content: {
        sections: 8,
        keyPoints: 45,
        formulas: 12
      }
    }
  ];

  const tabs = [
    { id: 'my-courses', name: 'My Courses', icon: BookOpen },
    { id: 'ai-content', name: 'AI Content', icon: Brain },
    { id: 'shared-content', name: 'Shared Content', icon: Share },
    { id: 'students', name: 'Students', icon: Users },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 }
  ];

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'study-guide': return FileText;
      case 'quiz': return Target;
      case 'presentation': return Play;
      case 'revision-notes': return FileText;
      default: return FileText;
    }
  };

  const getContentTypeColor = (type: string) => {
    switch (type) {
      case 'study-guide': return 'bg-blue-100 text-blue-800';
      case 'quiz': return 'bg-green-100 text-green-800';
      case 'presentation': return 'bg-purple-100 text-purple-800';
      case 'revision-notes': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleShareContent = (contentId: string, courseId: string, shareOptions: any) => {
    const content = aiGeneratedContent.find(c => c.id === contentId);
    const course = teacherCourses.find(c => c.id === parseInt(courseId));
    
    if (content && course) {
      const newSharedItem = {
        id: Date.now(),
        contentId,
        courseId,
        contentTitle: content.title,
        courseTitle: course.title,
        shareOptions,
        sharedAt: new Date().toISOString(),
        status: 'shared'
      };
      
      const updatedSharedContent = [...sharedContent, newSharedItem];
      setSharedContent(updatedSharedContent);
      localStorage.setItem('sharedContent', JSON.stringify(updatedSharedContent));
      
      // Show success message
      alert(`Successfully shared "${content.title}" with "${course.title}" course!`);
      setShowShareContentModal(false);
    }
  };

  return (
    <DashboardLayout userType="teacher">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
              <p className="text-gray-600 mt-2">
                {connectedInstitute 
                  ? `Teaching at ${connectedInstitute.name}` 
                  : 'Connect to an institute to create courses'
                }
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setShowCreateCourseModal(true)}
                disabled={!connectedInstitute}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-4 h-4" />
                <span>Create Course</span>
              </button>
            </div>
          </div>

          {/* Connected Institute Info */}
          {connectedInstitute && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{connectedInstitute.name}</h3>
                    <p className="text-sm text-gray-600">{connectedInstitute.location}</p>
                    <p className="text-xs text-gray-500">{connectedInstitute.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{connectedInstitute.students?.toLocaleString() || '0'} Students</p>
                  <p className="text-sm text-gray-600">{connectedInstitute.teachers?.toLocaleString() || '0'} Teachers</p>
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
                  <p className="text-sm text-yellow-700">Connect to an institute to access course management features</p>
                </div>
                <a 
                  href="/dashboard/teacher/settings"
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
        {activeTab === 'my-courses' && (
          <div className="space-y-6">
            {!connectedInstitute ? (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Institute Connected</h3>
                <p className="text-gray-600 mb-6">Connect to an institute to create and manage courses</p>
                <button 
                  onClick={() => window.location.href = '/dashboard/teacher/settings'}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Go to Settings
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teacherCourses.map((course) => (
                  <div key={course.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-3">
                        <div className="text-3xl">{course.thumbnail}</div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{course.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{course.description}</p>
                          <p className="text-xs text-blue-600">{course.institute}</p>
                        </div>
                      </div>
                      <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Students:</span>
                        <span className="font-medium">{course.students}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Assignments:</span>
                        <span className="font-medium">{course.assignments}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">AI Content:</span>
                        <span className="font-medium">
                          {course.aiContent.studyGuides + course.aiContent.quizzes + course.aiContent.presentations + course.aiContent.mindMaps} items
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Last Activity:</span>
                        <span className="font-medium">{course.lastActivity}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        course.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {course.status}
                      </span>
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => {
                            setSelectedCourse(course);
                            setShowShareContentModal(true);
                          }}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" 
                          title="Share AI Content"
                        >
                          <Share className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="View">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" title="Edit">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'ai-content' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">AI Generated Content</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search content..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="relative">
                  <select className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>All Types</option>
                    <option>Study Guides</option>
                    <option>Quizzes</option>
                    <option>Presentations</option>
                    <option>Revision Notes</option>
                  </select>
                  <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiGeneratedContent.map((content) => {
                const Icon = getContentTypeIcon(content.type);
                return (
                  <div key={content.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{content.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{content.description}</p>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getContentTypeColor(content.type)}`}>
                            {content.type.replace('-', ' ')}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Generated:</span>
                        <span className="font-medium">{content.generatedDate}</span>
                      </div>
                      {content.content.questionsGenerated && (
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Questions:</span>
                          <span className="font-medium">{content.content.questionsGenerated}</span>
                        </div>
                      )}
                      {content.content.sections && (
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Sections:</span>
                          <span className="font-medium">{content.content.sections.length}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex flex-wrap gap-1">
                        {content.tags.slice(0, 2).map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <button 
                        onClick={() => {
                          setSelectedCourse({ title: 'Select Course' });
                          setShowShareContentModal(true);
                        }}
                        className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        <Share className="w-3 h-3" />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'shared-content' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Shared Content</h2>
              <div className="text-sm text-gray-600">
                {sharedContent.length} items shared with students
              </div>
            </div>

            {sharedContent.length === 0 ? (
              <div className="text-center py-12">
                <Share className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Content Shared Yet</h3>
                <p className="text-gray-600 mb-6">Share AI-generated content with your students to see it here</p>
                <button 
                  onClick={() => setActiveTab('ai-content')}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Go to AI Content
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {sharedContent.map((item) => (
                  <div key={item.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{item.contentTitle}</h3>
                        <p className="text-sm text-gray-600 mb-2">Shared with: {item.courseTitle}</p>
                        <p className="text-xs text-gray-500">
                          Shared {new Date(item.sharedAt).toLocaleDateString()} at {new Date(item.sharedAt).toLocaleTimeString()}
                        </p>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        {item.status}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Share Options:</p>
                        <div className="flex flex-wrap gap-2">
                          {item.shareOptions.announcement && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">Announcement</span>
                          )}
                          {item.shareOptions.materials && (
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Course Materials</span>
                          )}
                          {item.shareOptions.assignment && (
                            <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">Assignment</span>
                          )}
                        </div>
                      </div>

                      {item.shareOptions.message && (
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-1">Message:</p>
                          <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                            "{item.shareOptions.message}"
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'students' && (
          <div className="space-y-6">
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Student Management</h3>
              <p className="text-gray-600">Student management features coming soon</p>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="text-center py-12">
              <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Course Analytics</h3>
              <p className="text-gray-600">Analytics and reporting features coming soon</p>
            </div>
          </div>
        )}

        {/* Create Course Modal */}
        {showCreateCourseModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Create New Course</h2>
                <button 
                  onClick={() => setShowCreateCourseModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6">
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Course Title</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter course title"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Enter course description"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Duration (weeks)</label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="12"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Max Students</label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="50"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Course Category</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Select Category</option>
                      <option>Computer Science</option>
                      <option>Data Science</option>
                      <option>Mathematics</option>
                      <option>Engineering</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Institute</label>
                    <input
                      type="text"
                      value={connectedInstitute?.name || ''}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                    />
                  </div>
                </form>
              </div>
              
              <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
                <button 
                  onClick={() => setShowCreateCourseModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Create Course
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Share Content Modal */}
        {showShareContentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Share AI Content</h2>
                <button 
                  onClick={() => setShowShareContentModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target as HTMLFormElement);
                  const courseId = formData.get('courseId') as string;
                  const contentId = formData.get('contentId') as string;
                  const shareOptions = {
                    announcement: formData.get('announcement') === 'on',
                    materials: formData.get('materials') === 'on',
                    assignment: formData.get('assignment') === 'on',
                    message: formData.get('message') as string
                  };
                  handleShareContent(contentId, courseId, shareOptions);
                }}
                className="flex flex-col h-full"
              >
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Select Course</label>
                      <select name="courseId" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option value="">Select Course</option>
                        {teacherCourses.map((course) => (
                          <option key={course.id} value={course.id}>{course.title}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Select Content</label>
                      <select name="contentId" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option value="">Select Content</option>
                        {aiGeneratedContent.map((content) => (
                          <option key={content.id} value={content.id}>{content.title}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Share Options</label>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input type="checkbox" name="announcement" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                          <span className="ml-2 text-sm text-gray-700">Post as announcement</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" name="materials" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                          <span className="ml-2 text-sm text-gray-700">Add to course materials</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" name="assignment" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                          <span className="ml-2 text-sm text-gray-700">Create assignment</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Message (Optional)</label>
                      <textarea
                        name="message"
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        placeholder="Add a message for your students..."
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
                  <button 
                    type="button"
                    onClick={() => setShowShareContentModal(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Share Content
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
