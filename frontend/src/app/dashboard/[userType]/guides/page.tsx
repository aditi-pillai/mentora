'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  BookOpen,
  FileText,
  Play,
  Pause,
  MoreVertical,
  Search,
  Filter,
  Plus,
  Folder,
  Star,
  Clock,
  Users,
  Eye,
  Download,
  Share,
  Edit,
  Trash2,
  Calendar,
  Tag,
  ChevronDown,
  ChevronRight,
  Brain,
  Target,
  Zap,
  X
} from 'lucide-react';

export default function StudyGuidesPage() {
  const params = useParams();
  const userType = params.userType as 'student' | 'teacher' | 'institute';
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [expandedPlaylists, setExpandedPlaylists] = useState<Set<string>>(new Set(['ml-fundamentals']));
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState<any>(null);

  // Dummy study guides data organized in playlists
  const studyPlaylists = [
    {
      id: 'ml-fundamentals',
      title: 'Machine Learning Fundamentals',
      description: 'Complete study materials for ML basics',
      color: 'bg-blue-500',
      icon: Brain,
      createdAt: '2024-01-15',
      totalGuides: 8,
      totalDuration: '2h 30m',
      guides: [
        {
          id: 'ml-intro',
          title: 'Introduction to Machine Learning',
          description: 'Basic concepts and definitions',
          type: 'study-guide',
          duration: '15m',
          difficulty: 'Beginner',
          tags: ['concepts', 'basics', 'introduction'],
          createdAt: '2024-01-15',
          lastAccessed: '2024-01-20',
          content: {
            summary: 'Comprehensive overview of machine learning fundamentals',
            sections: ['What is ML?', 'Types of Learning', 'Applications'],
            questionsGenerated: 12,
            notesGenerated: 5
          },
          relatedChat: 'AI Chat - Machine Learning Q&A',
          status: 'completed'
        },
        {
          id: 'supervised-learning',
          title: 'Supervised Learning Deep Dive',
          description: 'Detailed exploration of supervised learning algorithms',
          type: 'study-guide',
          duration: '25m',
          difficulty: 'Intermediate',
          tags: ['supervised', 'algorithms', 'classification'],
          createdAt: '2024-01-16',
          lastAccessed: '2024-01-19',
          content: {
            summary: 'In-depth analysis of supervised learning methods',
            sections: ['Linear Regression', 'Decision Trees', 'SVM', 'Random Forest'],
            questionsGenerated: 18,
            notesGenerated: 8
          },
          relatedChat: 'AI Chat - Supervised Learning Discussion',
          status: 'in-progress'
        },
        {
          id: 'unsupervised-learning',
          title: 'Unsupervised Learning Concepts',
          description: 'Understanding unsupervised learning techniques',
          type: 'study-guide',
          duration: '20m',
          difficulty: 'Intermediate',
          tags: ['unsupervised', 'clustering', 'dimensionality'],
          createdAt: '2024-01-17',
          lastAccessed: '2024-01-18',
          content: {
            summary: 'Complete guide to unsupervised learning methods',
            sections: ['K-Means', 'Hierarchical Clustering', 'PCA', 'DBSCAN'],
            questionsGenerated: 15,
            notesGenerated: 6
          },
          relatedChat: 'AI Chat - Unsupervised Learning Q&A',
          status: 'completed'
        },
        {
          id: 'model-evaluation',
          title: 'Model Evaluation Techniques',
          description: 'How to assess machine learning model performance',
          type: 'study-guide',
          duration: '18m',
          difficulty: 'Intermediate',
          tags: ['evaluation', 'metrics', 'validation'],
          createdAt: '2024-01-18',
          lastAccessed: '2024-01-19',
          content: {
            summary: 'Comprehensive guide to model evaluation',
            sections: ['Cross-Validation', 'Metrics', 'Overfitting Prevention'],
            questionsGenerated: 14,
            notesGenerated: 7
          },
          relatedChat: 'AI Chat - Model Evaluation Discussion',
          status: 'pending'
        },
        {
          id: 'ml-quiz-1',
          title: 'ML Fundamentals Quiz',
          description: 'Interactive quiz on machine learning basics',
          type: 'quiz',
          duration: '10m',
          difficulty: 'Beginner',
          tags: ['quiz', 'assessment', 'basics'],
          createdAt: '2024-01-19',
          lastAccessed: '2024-01-20',
          content: {
            summary: 'Comprehensive quiz covering ML fundamentals',
            sections: ['Multiple Choice', 'True/False', 'Scenario Questions'],
            questionsGenerated: 20,
            notesGenerated: 0
          },
          relatedChat: 'AI Chat - ML Quiz Generation',
          status: 'completed'
        },
        {
          id: 'ml-mindmap',
          title: 'ML Concepts Mind Map',
          description: 'Visual representation of ML concepts and relationships',
          type: 'mindmap',
          duration: '12m',
          difficulty: 'Beginner',
          tags: ['visual', 'mindmap', 'concepts'],
          createdAt: '2024-01-20',
          lastAccessed: '2024-01-20',
          content: {
            summary: 'Interactive mind map of ML concepts',
            sections: ['Concept Mapping', 'Relationships', 'Visual Learning'],
            questionsGenerated: 0,
            notesGenerated: 1
          },
          relatedChat: 'AI Chat - ML Mind Map Creation',
          status: 'completed'
        },
        {
          id: 'ml-revision-notes',
          title: 'ML Revision Notes',
          description: 'Comprehensive revision notes for exam preparation',
          type: 'revision-notes',
          duration: '30m',
          difficulty: 'All Levels',
          tags: ['revision', 'exam', 'notes'],
          createdAt: '2024-01-20',
          lastAccessed: '2024-01-20',
          content: {
            summary: 'Complete revision notes for ML fundamentals',
            sections: ['Key Concepts', 'Formulas', 'Examples', 'Practice Questions'],
            questionsGenerated: 25,
            notesGenerated: 15
          },
          relatedChat: 'AI Chat - ML Revision Notes Generation',
          status: 'in-progress'
        },
        {
          id: 'ml-presentation',
          title: 'ML Fundamentals Presentation',
          description: 'PowerPoint presentation on ML concepts',
          type: 'presentation',
          duration: '45m',
          difficulty: 'Beginner',
          tags: ['presentation', 'slides', 'teaching'],
          createdAt: '2024-01-20',
          lastAccessed: '2024-01-20',
          content: {
            summary: 'Professional presentation on ML fundamentals',
            sections: ['Introduction', 'Key Concepts', 'Examples', 'Conclusion'],
            questionsGenerated: 0,
            notesGenerated: 0
          },
          relatedChat: 'AI Chat - ML Presentation Creation',
          status: 'completed'
        }
      ]
    },
    {
      id: 'data-science',
      title: 'Data Science Essentials',
      description: 'Core data science concepts and tools',
      color: 'bg-green-500',
      icon: Target,
      createdAt: '2024-01-10',
      totalGuides: 5,
      totalDuration: '1h 45m',
      guides: [
        {
          id: 'data-analysis',
          title: 'Data Analysis Fundamentals',
          description: 'Essential data analysis techniques',
          type: 'study-guide',
          duration: '20m',
          difficulty: 'Beginner',
          tags: ['analysis', 'statistics', 'data'],
          createdAt: '2024-01-10',
          lastAccessed: '2024-01-18',
          content: {
            summary: 'Complete guide to data analysis basics',
            sections: ['Descriptive Statistics', 'Data Visualization', 'EDA'],
            questionsGenerated: 16,
            notesGenerated: 9
          },
          relatedChat: 'AI Chat - Data Analysis Discussion',
          status: 'completed'
        },
        {
          id: 'python-pandas',
          title: 'Python Pandas Guide',
          description: 'Comprehensive guide to pandas library',
          type: 'study-guide',
          duration: '35m',
          difficulty: 'Intermediate',
          tags: ['python', 'pandas', 'programming'],
          createdAt: '2024-01-12',
          lastAccessed: '2024-01-19',
          content: {
            summary: 'In-depth pandas tutorial with examples',
            sections: ['DataFrames', 'Operations', 'GroupBy', 'Merging'],
            questionsGenerated: 22,
            notesGenerated: 12
          },
          relatedChat: 'AI Chat - Pandas Q&A',
          status: 'in-progress'
        }
      ]
    },
    {
      id: 'statistics',
      title: 'Statistics & Probability',
      description: 'Mathematical foundations for data science',
      color: 'bg-purple-500',
      icon: Zap,
      createdAt: '2024-01-05',
      totalGuides: 3,
      totalDuration: '1h 15m',
      guides: [
        {
          id: 'probability-basics',
          title: 'Probability Fundamentals',
          description: 'Basic probability concepts and calculations',
          type: 'study-guide',
          duration: '25m',
          difficulty: 'Beginner',
          tags: ['probability', 'math', 'basics'],
          createdAt: '2024-01-05',
          lastAccessed: '2024-01-17',
          content: {
            summary: 'Complete probability theory guide',
            sections: ['Basic Concepts', 'Conditional Probability', 'Bayes Theorem'],
            questionsGenerated: 20,
            notesGenerated: 8
          },
          relatedChat: 'AI Chat - Probability Discussion',
          status: 'completed'
        }
      ]
    }
  ];

  const togglePlaylist = (playlistId: string) => {
    const newExpanded = new Set(expandedPlaylists);
    if (newExpanded.has(playlistId)) {
      newExpanded.delete(playlistId);
    } else {
      newExpanded.add(playlistId);
    }
    setExpandedPlaylists(newExpanded);
  };

  const openGuideModal = (guide: any) => {
    setSelectedGuide(guide);
    setShowGuideModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'study-guide': return BookOpen;
      case 'quiz': return Target;
      case 'mindmap': return Brain;
      case 'revision-notes': return FileText;
      case 'presentation': return Play;
      default: return FileText;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout userType={userType}>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Study Guides</h1>
              <p className="text-gray-600 mt-2">Organized learning materials generated from your AI conversations</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4" />
                <span>New Playlist</span>
              </button>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search study guides..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="study-guide">Study Guides</option>
                <option value="quiz">Quizzes</option>
                <option value="mindmap">Mind Maps</option>
                <option value="revision-notes">Revision Notes</option>
                <option value="presentation">Presentations</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Study Guides Playlists */}
        <div className="space-y-6">
          {studyPlaylists.map((playlist) => {
            const isExpanded = expandedPlaylists.has(playlist.id);
            const PlaylistIcon = playlist.icon;
            
            return (
              <div key={playlist.id} className="bg-white rounded-xl border border-gray-200 shadow-sm">
                {/* Playlist Header */}
                <div 
                  className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => togglePlaylist(playlist.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 ${playlist.color} rounded-lg flex items-center justify-center`}>
                        <PlaylistIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">{playlist.title}</h2>
                        <p className="text-gray-600 mt-1">{playlist.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <span className="flex items-center space-x-1">
                            <FileText className="w-4 h-4" />
                            <span>{playlist.totalGuides} guides</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{playlist.totalDuration}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{playlist.createdAt}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      {isExpanded ? (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Playlist Content */}
                {isExpanded && (
                  <div className="border-t border-gray-200">
                    <div className="p-6">
                      <div className="grid gap-4">
                        {playlist.guides.map((guide) => {
                          const GuideIcon = getTypeIcon(guide.type);
                          
                          return (
                            <div key={guide.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                                <GuideIcon className="w-5 h-5 text-gray-600" />
                              </div>
                              
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <h3 className="font-semibold text-gray-900">{guide.title}</h3>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(guide.status)}`}>
                                    {guide.status}
                                  </span>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(guide.difficulty)}`}>
                                    {guide.difficulty}
                                  </span>
                                </div>
                                <p className="text-gray-600 text-sm mb-2">{guide.description}</p>
                                <div className="flex items-center space-x-4 text-xs text-gray-500">
                                  <span className="flex items-center space-x-1">
                                    <Clock className="w-3 h-3" />
                                    <span>{guide.duration}</span>
                                  </span>
                                  <span className="flex items-center space-x-1">
                                    <Target className="w-3 h-3" />
                                    <span>{guide.content.questionsGenerated} questions</span>
                                  </span>
                                  <span className="flex items-center space-x-1">
                                    <FileText className="w-3 h-3" />
                                    <span>{guide.content.notesGenerated} notes</span>
                                  </span>
                                  <span className="text-blue-600">{guide.relatedChat}</span>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                <button 
                                  onClick={() => openGuideModal(guide)}
                                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" 
                                  title="View"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Download">
                                  <Download className="w-4 h-4" />
                                </button>
                                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" title="More">
                                  <MoreVertical className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {studyPlaylists.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Study Guides Yet</h3>
            <p className="text-gray-600 mb-6">Start chatting with AI to generate your first study guide</p>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Go to AI Chat
            </button>
          </div>
        )}

        {/* Study Guide Modal */}
        {showGuideModal && selectedGuide && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    {(() => {
                      const GuideIcon = getTypeIcon(selectedGuide.type);
                      return <GuideIcon className="w-6 h-6 text-blue-600" />;
                    })()}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{selectedGuide.title}</h2>
                    <p className="text-sm text-gray-500 mt-1">{selectedGuide.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                    Download
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                    Share
                  </button>
                  <button 
                    onClick={() => setShowGuideModal(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Main Content */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Study Guide Content */}
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Study Content</h3>
                      <div className="prose prose-sm max-w-none">
                        <p className="text-gray-700 mb-4">{selectedGuide.content.summary}</p>
                        
                        <h4 className="font-semibold text-gray-900 mb-3">Key Sections:</h4>
                        <ul className="space-y-2">
                          {selectedGuide.content.sections.map((section: string, index: number) => (
                            <li key={index} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span className="text-gray-700">{section}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Generated Questions */}
                    {selectedGuide.content.questionsGenerated > 0 && (
                      <div className="bg-blue-50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-blue-900 mb-4">Generated Questions</h3>
                        <p className="text-blue-800 mb-4">
                          This study guide includes {selectedGuide.content.questionsGenerated} practice questions to test your understanding.
                        </p>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          Start Practice Quiz
                        </button>
                      </div>
                    )}

                    {/* Generated Notes */}
                    {selectedGuide.content.notesGenerated > 0 && (
                      <div className="bg-green-50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-green-900 mb-4">Study Notes</h3>
                        <p className="text-green-800 mb-4">
                          {selectedGuide.content.notesGenerated} detailed study notes have been generated to help you review key concepts.
                        </p>
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                          View Notes
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    {/* Guide Info */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-3">Guide Information</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Type:</span>
                          <span className="font-medium capitalize">{selectedGuide.type.replace('-', ' ')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Duration:</span>
                          <span className="font-medium">{selectedGuide.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Difficulty:</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(selectedGuide.difficulty)}`}>
                            {selectedGuide.difficulty}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Status:</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedGuide.status)}`}>
                            {selectedGuide.status}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Created:</span>
                          <span className="font-medium">{selectedGuide.createdAt}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Last Accessed:</span>
                          <span className="font-medium">{selectedGuide.lastAccessed}</span>
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-3">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedGuide.tags.map((tag: string, index: number) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Related Chat */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-3">Related Chat</h4>
                      <p className="text-sm text-blue-600 mb-3">{selectedGuide.relatedChat}</p>
                      <button className="text-sm text-blue-600 hover:text-blue-800 underline">
                        View Original Conversation
                      </button>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-3">Quick Actions</h4>
                      <div className="space-y-2">
                        <button className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                          Mark as Complete
                        </button>
                        <button className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                          Add to Favorites
                        </button>
                        <button className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                          Create Similar Guide
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
