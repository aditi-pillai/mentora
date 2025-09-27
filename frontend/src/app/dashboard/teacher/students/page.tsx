'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  Users,
  Search,
  Filter,
  Plus,
  Mail,
  Phone,
  Calendar,
  BookOpen,
  Target,
  TrendingUp,
  TrendingDown,
  Eye,
  MessageSquare,
  Award,
  AlertCircle,
  CheckCircle,
  Clock,
  User,
  MoreVertical,
  Edit,
  Trash2,
  Download,
  Upload,
  Star,
  Activity,
  X
} from 'lucide-react';

export default function StudentsPage() {
  const [activeTab, setActiveTab] = useState('all-students');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);

  // Mock students data
  const students = [
    {
      id: 1,
      name: 'Alex Chen',
      email: 'alex.chen@university.edu',
      studentId: 'STU001',
      courses: ['Machine Learning Fundamentals', 'Python Programming'],
      progress: 85,
      averageScore: 92,
      lastActive: '2 hours ago',
      status: 'active',
      avatar: 'AC',
      joinDate: '2024-01-15',
      totalStudyTime: 45.5,
      assignmentsSubmitted: 8,
      assignmentsTotal: 10,
      quizzesCompleted: 12,
      quizzesTotal: 15
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@university.edu',
      studentId: 'STU002',
      courses: ['Machine Learning Fundamentals', 'Data Structures'],
      progress: 78,
      averageScore: 87,
      lastActive: '1 day ago',
      status: 'active',
      avatar: 'SJ',
      joinDate: '2024-01-10',
      totalStudyTime: 38.2,
      assignmentsSubmitted: 6,
      assignmentsTotal: 8,
      quizzesCompleted: 10,
      quizzesTotal: 12
    },
    {
      id: 3,
      name: 'Mike Davis',
      email: 'mike.davis@university.edu',
      studentId: 'STU003',
      courses: ['Python Programming', 'Web Development'],
      progress: 92,
      averageScore: 89,
      lastActive: '3 hours ago',
      status: 'active',
      avatar: 'MD',
      joinDate: '2024-01-12',
      totalStudyTime: 52.8,
      assignmentsSubmitted: 9,
      assignmentsTotal: 9,
      quizzesCompleted: 14,
      quizzesTotal: 14
    },
    {
      id: 4,
      name: 'Emma Wilson',
      email: 'emma.wilson@university.edu',
      studentId: 'STU004',
      courses: ['Data Structures', 'Web Development'],
      progress: 65,
      averageScore: 76,
      lastActive: '5 days ago',
      status: 'inactive',
      avatar: 'EW',
      joinDate: '2024-01-08',
      totalStudyTime: 28.5,
      assignmentsSubmitted: 4,
      assignmentsTotal: 7,
      quizzesCompleted: 6,
      quizzesTotal: 10
    }
  ];

  const courses = [
    'Machine Learning Fundamentals',
    'Python Programming',
    'Data Structures',
    'Web Development'
  ];

  const tabs = [
    { id: 'all-students', name: 'All Students', icon: Users },
    { id: 'active', name: 'Active', icon: Activity },
    { id: 'at-risk', name: 'At Risk', icon: AlertCircle },
    { id: 'top-performers', name: 'Top Performers', icon: Award }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'at-risk': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCourse = selectedCourse === 'all' || student.courses.includes(selectedCourse);
    
    return matchesSearch && matchesCourse;
  });

  return (
    <DashboardLayout userType="teacher">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Students</h1>
              <p className="text-gray-600 mt-2">Manage and track your students' progress</p>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setShowAddStudentModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Student</span>
              </button>
            </div>
          </div>

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

        {/* Search and Filter */}
        <div className="mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Courses</option>
                {courses.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
              <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Students Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <div key={student.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {student.avatar}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{student.name}</h3>
                    <p className="text-sm text-gray-600 mb-1">{student.email}</p>
                    <p className="text-xs text-gray-500">ID: {student.studentId}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
                    {student.status}
                  </span>
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">Overall Progress</span>
                    <span className="font-medium">{student.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(student.progress)}`}
                      style={{ width: `${student.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Average Score:</span>
                    <span className={`font-medium ml-1 ${getScoreColor(student.averageScore)}`}>
                      {student.averageScore}%
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Study Time:</span>
                    <span className="font-medium ml-1">{student.totalStudyTime}h</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Assignments:</span>
                    <span className="font-medium ml-1">{student.assignmentsSubmitted}/{student.assignmentsTotal}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Quizzes:</span>
                    <span className="font-medium ml-1">{student.quizzesCompleted}/{student.quizzesTotal}</span>
                  </div>
                </div>

                <div className="text-sm">
                  <span className="text-gray-600">Last Active:</span>
                  <span className="font-medium ml-1">{student.lastActive}</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Enrolled Courses:</p>
                <div className="flex flex-wrap gap-1">
                  {student.courses.map((course, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                      {course}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <button className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  <MessageSquare className="w-4 h-4" />
                  <span>Message</span>
                </button>
                <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  <Eye className="w-4 h-4" />
                  <span>View Details</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Summary */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{students.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Students</p>
                <p className="text-2xl font-bold text-gray-900">
                  {students.filter(s => s.status === 'active').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Progress</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(students.reduce((acc, s) => acc + s.progress, 0) / students.length)}%
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Score</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(students.reduce((acc, s) => acc + s.averageScore, 0) / students.length)}%
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Add Student Modal */}
        {showAddStudentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Add Student</h2>
                <button 
                  onClick={() => setShowAddStudentModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Student Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter student name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Student ID</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter student ID"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Courses</label>
                  <div className="space-y-2">
                    {courses.map(course => (
                      <label key={course} className="flex items-center">
                        <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                        <span className="ml-2 text-sm text-gray-700">{course}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
                <button 
                  onClick={() => setShowAddStudentModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Add Student
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
