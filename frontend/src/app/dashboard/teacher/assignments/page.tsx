'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  FileText,
  Plus,
  Search,
  Filter,
  Calendar,
  Clock,
  Users,
  BookOpen,
  Target,
  CheckCircle,
  AlertCircle,
  Eye,
  Edit,
  Trash2,
  Download,
  Upload,
  MessageSquare,
  Star,
  MoreVertical,
  X,
  Send,
  FileCheck,
  Timer
} from 'lucide-react';

export default function AssignmentsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [showCreateAssignmentModal, setShowCreateAssignmentModal] = useState(false);

  // Mock assignments data
  const assignments = [
    {
      id: 1,
      title: 'Neural Network Implementation',
      description: 'Build a neural network from scratch using Python and NumPy',
      course: 'Machine Learning Fundamentals',
      dueDate: '2024-02-15',
      totalPoints: 100,
      submissions: 12,
      totalStudents: 15,
      averageScore: 87.5,
      status: 'active',
      type: 'coding',
      difficulty: 'medium',
      estimatedTime: '4-6 hours',
      instructions: 'Implement a 3-layer neural network with backpropagation...',
      rubric: 'Code quality (30%), Functionality (40%), Documentation (20%), Testing (10%)'
    },
    {
      id: 2,
      title: 'Data Visualization Dashboard',
      description: 'Create an interactive dashboard using Python libraries',
      course: 'Python Programming',
      dueDate: '2024-02-20',
      totalPoints: 80,
      submissions: 8,
      totalStudents: 12,
      averageScore: 92.3,
      status: 'active',
      type: 'project',
      difficulty: 'hard',
      estimatedTime: '6-8 hours',
      instructions: 'Use matplotlib, seaborn, and plotly to create visualizations...',
      rubric: 'Visualization quality (40%), Code organization (30%), Creativity (20%), Documentation (10%)'
    },
    {
      id: 3,
      title: 'Binary Tree Operations',
      description: 'Implement various operations on binary trees',
      course: 'Data Structures & Algorithms',
      dueDate: '2024-02-10',
      totalPoints: 60,
      submissions: 15,
      totalStudents: 18,
      averageScore: 78.9,
      status: 'graded',
      type: 'coding',
      difficulty: 'medium',
      estimatedTime: '3-4 hours',
      instructions: 'Implement insert, delete, search, and traversal operations...',
      rubric: 'Correctness (50%), Efficiency (30%), Code style (20%)'
    },
    {
      id: 4,
      title: 'Web Development Portfolio',
      description: 'Create a personal portfolio website using HTML, CSS, and JavaScript',
      course: 'Web Development',
      dueDate: '2024-03-01',
      totalPoints: 120,
      submissions: 5,
      totalStudents: 10,
      averageScore: 0,
      status: 'draft',
      type: 'project',
      difficulty: 'easy',
      estimatedTime: '8-10 hours',
      instructions: 'Design and develop a responsive portfolio website...',
      rubric: 'Design (30%), Functionality (40%), Responsiveness (20%), Content (10%)'
    }
  ];

  const courses = [
    'Machine Learning Fundamentals',
    'Python Programming',
    'Data Structures & Algorithms',
    'Web Development'
  ];

  const tabs = [
    { id: 'all', name: 'All Assignments', icon: FileText },
    { id: 'active', name: 'Active', icon: Timer },
    { id: 'graded', name: 'Graded', icon: CheckCircle },
    { id: 'draft', name: 'Drafts', icon: Edit }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'graded': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'coding': return Target;
      case 'project': return FileText;
      case 'essay': return BookOpen;
      default: return FileText;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCourse = selectedCourse === 'all' || assignment.course === selectedCourse;
    
    const matchesTab = activeTab === 'all' || assignment.status === activeTab;
    
    return matchesSearch && matchesCourse && matchesTab;
  });

  return (
    <DashboardLayout userType="teacher">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: 'var(--color-base-content)' }}>Assignments</h1>
              <p className="mt-2" style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>Create and manage assignments for your courses</p>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setShowCreateAssignmentModal(true)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors btn-abyss"
                style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', color: 'var(--color-accent-content)' }}
              >
                <Plus className="w-4 h-4" />
                <span>Create Assignment</span>
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="" style={{ borderBottom: '1px solid color-mix(in oklch, var(--color-base-100) 30%, transparent)' }}>
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-3 px-3 font-medium text-sm transition-colors border-abyss rounded-t-lg`}
                    style={{ color: activeTab === tab.id ? 'var(--color-primary)' : 'color-mix(in oklch, var(--color-base-content) 65%, transparent)', background: activeTab === tab.id ? 'color-mix(in oklch, var(--color-primary) 12%, transparent)' : 'transparent' }}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: 'color-mix(in oklch, var(--color-base-content) 60%, transparent)' }} />
              <input
                type="text"
                placeholder="Search assignments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg focus:ring-2"
                style={{ border: '1px solid color-mix(in oklch, var(--color-base-100) 35%, transparent)', background: 'color-mix(in oklch, var(--color-base-300) 80%, transparent)', color: 'var(--color-base-content)', outlineColor: 'var(--color-primary)' }}
              />
            </div>
            <div className="relative">
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="appearance-none rounded-lg px-4 py-2 pr-8 focus:ring-2 border-abyss"
                style={{ background: 'color-mix(in oklch, var(--color-base-300) 80%, transparent)', color: 'var(--color-base-content)', outlineColor: 'var(--color-primary)' }}
              >
                <option value="all">All Courses</option>
                {courses.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
              <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Assignments Grid */}
        <div className="space-y-6">
          {filteredAssignments.map((assignment) => {
            const TypeIcon = getTypeIcon(assignment.type);
            return (
              <div key={assignment.id} className="rounded-xl p-6 shadow-sm abyss-card border-abyss hover:scale-[1.01] transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center border-abyss" style={{ background: 'color-mix(in oklch, var(--color-base-100) 25%, transparent)' }}>
                      <TypeIcon className="w-6 h-6" style={{ color: 'var(--color-primary)' }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-1" style={{ color: 'var(--color-base-content)' }}>{assignment.title}</h3>
                      <p className="mb-2" style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>{assignment.description}</p>
                      <div className="flex items-center space-x-4 text-sm" style={{ color: 'color-mix(in oklch, var(--color-base-content) 60%, transparent)' }}>
                        <div className="flex items-center space-x-1">
                          <BookOpen className="w-4 h-4" />
                          <span>{assignment.course}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>Due: {formatDate(assignment.dueDate)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{assignment.estimatedTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 rounded-full text-xs font-medium border-abyss" style={{ color: 'var(--color-success)', background: 'color-mix(in oklch, var(--color-success) 15%, transparent)' }}>{assignment.status}</span>
                    <span className="px-2 py-1 rounded-full text-xs font-medium border-abyss" style={{ color: 'var(--color-warning)', background: 'color-mix(in oklch, var(--color-warning) 15%, transparent)' }}>{assignment.difficulty}</span>
                    <button className="p-1 border-abyss rounded" style={{ color: 'color-mix(in oklch, var(--color-base-content) 60%, transparent)' }}>
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                  <div className="text-center p-4 rounded-lg border-abyss" style={{ background: 'color-mix(in oklch, var(--color-base-100) 20%, transparent)' }}>
                    <div className="text-2xl font-bold" style={{ color: 'var(--color-base-content)' }}>{assignment.totalPoints}</div>
                    <div className="text-sm" style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>Total Points</div>
                  </div>
                  <div className="text-center p-4 rounded-lg border-abyss" style={{ background: 'color-mix(in oklch, var(--color-base-100) 20%, transparent)' }}>
                    <div className="text-2xl font-bold" style={{ color: 'var(--color-base-content)' }}>{assignment.submissions}</div>
                    <div className="text-sm" style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>Submissions</div>
                  </div>
                  <div className="text-center p-4 rounded-lg border-abyss" style={{ background: 'color-mix(in oklch, var(--color-base-100) 20%, transparent)' }}>
                    <div className="text-2xl font-bold" style={{ color: 'var(--color-base-content)' }}>{assignment.totalStudents}</div>
                    <div className="text-sm" style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>Total Students</div>
                  </div>
                  <div className="text-center p-4 rounded-lg border-abyss" style={{ background: 'color-mix(in oklch, var(--color-base-100) 20%, transparent)' }}>
                    <div className="text-2xl font-bold" style={{ color: 'var(--color-base-content)' }}>
                      {assignment.averageScore > 0 ? `${assignment.averageScore}%` : 'N/A'}
                    </div>
                    <div className="text-sm" style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>Average Score</div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between text-sm mb-2" style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>
                    <span>Submission Progress</span>
                    <span className="font-medium">{assignment.submissions}/{assignment.totalStudents}</span>
                  </div>
                  <div className="w-full rounded-full h-2 border-abyss" style={{ background: 'color-mix(in oklch, var(--color-base-100) 25%, transparent)' }}>
                    <div 
                      className="h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(assignment.submissions / assignment.totalStudents) * 100}%`, background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid color-mix(in oklch, var(--color-base-100) 30%, transparent)' }}>
                  <div className="flex items-center space-x-3">
                    <button className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors btn-abyss" style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', color: 'var(--color-accent-content)' }}>
                      <Eye className="w-4 h-4" />
                      <span>View Submissions</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors btn-abyss-outline">
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors btn-abyss-outline">
                      <MessageSquare className="w-4 h-4" />
                      <span>Announce</span>
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 rounded-lg transition-colors border-abyss" style={{ color: 'color-mix(in oklch, var(--color-base-content) 60%, transparent)' }}>
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg transition-colors border-abyss" style={{ color: 'color-mix(in oklch, var(--color-base-content) 60%, transparent)' }}>
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Create Assignment Modal */}
        {showCreateAssignmentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="rounded-xl max-w-2xl w-full max-h-[90vh] flex flex-col abyss-card border-abyss">
              <div className="flex items-center justify-between p-6" style={{ borderBottom: '1px solid color-mix(in oklch, var(--color-base-100) 30%, transparent)' }}>
                <h2 className="text-xl font-semibold" style={{ color: 'var(--color-base-content)' }}>Create Assignment</h2>
                <button 
                  onClick={() => setShowCreateAssignmentModal(false)}
                  className="p-2 rounded-lg transition-colors" style={{ color: 'color-mix(in oklch, var(--color-base-content) 60%, transparent)' }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>Assignment Title</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 rounded-lg focus:ring-2"
                      style={{ border: '1px solid color-mix(in oklch, var(--color-base-100) 35%, transparent)', background: 'color-mix(in oklch, var(--color-base-300) 80%, transparent)', color: 'var(--color-base-content)', outlineColor: 'var(--color-primary)' }}
                      placeholder="Enter assignment title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>Description</label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-2 rounded-lg focus:ring-2 resize-none"
                      style={{ border: '1px solid color-mix(in oklch, var(--color-base-100) 35%, transparent)', background: 'color-mix(in oklch, var(--color-base-300) 80%, transparent)', color: 'var(--color-base-content)', outlineColor: 'var(--color-primary)' }}
                      placeholder="Enter assignment description"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>Course</label>
                      <select className="w-full px-3 py-2 rounded-lg focus:ring-2 border-abyss" style={{ background: 'color-mix(in oklch, var(--color-base-300) 80%, transparent)', color: 'var(--color-base-content)', outlineColor: 'var(--color-primary)' }}>
                        {courses.map(course => (
                          <option key={course} value={course}>{course}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>Assignment Type</label>
                      <select className="w-full px-3 py-2 rounded-lg focus:ring-2 border-abyss" style={{ background: 'color-mix(in oklch, var(--color-base-300) 80%, transparent)', color: 'var(--color-base-content)', outlineColor: 'var(--color-primary)' }}>
                        <option value="coding">Coding Assignment</option>
                        <option value="project">Project</option>
                        <option value="essay">Essay</option>
                        <option value="quiz">Quiz</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>Due Date</label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 rounded-lg focus:ring-2"
                        style={{ border: '1px solid color-mix(in oklch, var(--color-base-100) 35%, transparent)', background: 'color-mix(in oklch, var(--color-base-300) 80%, transparent)', color: 'var(--color-base-content)', outlineColor: 'var(--color-primary)' }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>Total Points</label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 rounded-lg focus:ring-2"
                        style={{ border: '1px solid color-mix(in oklch, var(--color-base-100) 35%, transparent)', background: 'color-mix(in oklch, var(--color-base-300) 80%, transparent)', color: 'var(--color-base-content)', outlineColor: 'var(--color-primary)' }}
                        placeholder="100"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>Difficulty</label>
                      <select className="w-full px-3 py-2 rounded-lg focus:ring-2 border-abyss" style={{ background: 'color-mix(in oklch, var(--color-base-300) 80%, transparent)', color: 'var(--color-base-content)', outlineColor: 'var(--color-primary)' }}>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>Instructions</label>
                    <textarea
                      rows={4}
                      className="w-full px-3 py-2 rounded-lg focus:ring-2 resize-none"
                      style={{ border: '1px solid color-mix(in oklch, var(--color-base-100) 35%, transparent)', background: 'color-mix(in oklch, var(--color-base-300) 80%, transparent)', color: 'var(--color-base-content)', outlineColor: 'var(--color-primary)' }}
                      placeholder="Enter detailed instructions for the assignment"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>Rubric</label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-2 rounded-lg focus:ring-2 resize-none"
                      style={{ border: '1px solid color-mix(in oklch, var(--color-base-100) 35%, transparent)', background: 'color-mix(in oklch, var(--color-base-300) 80%, transparent)', color: 'var(--color-base-content)', outlineColor: 'var(--color-primary)' }}
                      placeholder="Enter grading rubric"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-3 p-6" style={{ borderTop: '1px solid color-mix(in oklch, var(--color-base-100) 30%, transparent)' }}>
                <button 
                  onClick={() => setShowCreateAssignmentModal(false)}
                  className="px-4 py-2 rounded-lg transition-colors btn-abyss-outline"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 rounded-lg transition-colors btn-abyss" style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', color: 'var(--color-accent-content)' }}>
                  Create Assignment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
