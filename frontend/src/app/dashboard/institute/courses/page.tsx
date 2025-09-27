'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  BookOpen, 
  Plus, 
  Users, 
  TrendingUp, 
  Calendar, 
  Settings,
  Edit,
  Trash2,
  Eye,
  Award,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function CoursesPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    category: '',
    duration: '',
    maxStudents: ''
  });

  const courses = [
    {
      id: 1,
      title: 'Machine Learning Fundamentals',
      description: 'Comprehensive introduction to ML algorithms and applications',
      category: 'AI & Data Science',
      instructor: 'Dr. Sarah Chen',
      students: 156,
      maxStudents: 200,
      status: 'active',
      startDate: '2024-02-01',
      endDate: '2024-06-15',
      completionRate: 87,
      avgGrade: 85.2,
      assignments: 12,
      quizzes: 8
    },
    {
      id: 2,
      title: 'Advanced Python Programming',
      description: 'Deep dive into Python for data science and web development',
      category: 'Programming',
      instructor: 'Prof. Mike Johnson',
      students: 98,
      maxStudents: 120,
      status: 'active',
      startDate: '2024-01-15',
      endDate: '2024-05-30',
      completionRate: 92,
      avgGrade: 88.7,
      assignments: 15,
      quizzes: 10
    },
    {
      id: 3,
      title: 'Data Visualization & Analytics',
      description: 'Creating compelling visualizations and business insights',
      category: 'Data Science',
      instructor: 'Dr. Emily Rodriguez',
      students: 73,
      maxStudents: 100,
      status: 'upcoming',
      startDate: '2024-03-01',
      endDate: '2024-07-15',
      completionRate: 0,
      avgGrade: 0,
      assignments: 0,
      quizzes: 0
    },
    {
      id: 4,
      title: 'Statistics for Data Scientists',
      description: 'Mathematical foundations for data analysis',
      category: 'Mathematics',
      instructor: 'Dr. David Kim',
      students: 0,
      maxStudents: 80,
      status: 'draft',
      startDate: '2024-04-01',
      endDate: '2024-08-15',
      completionRate: 0,
      avgGrade: 0,
      assignments: 0,
      quizzes: 0
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'upcoming': return 'text-blue-600 bg-blue-100';
      case 'draft': return 'text-gray-600 bg-gray-100';
      case 'completed': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'upcoming': return Clock;
      case 'draft': return Edit;
      case 'completed': return Award;
      default: return AlertCircle;
    }
  };

  const createCourse = () => {
    // In a real app, this would create the course in the backend
    console.log('Creating course:', newCourse);
    setShowCreateModal(false);
    setNewCourse({ title: '', description: '', category: '', duration: '', maxStudents: '' });
  };

  return (
    <DashboardLayout userType="institute">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Course Management</h1>
            <p className="text-gray-600">Manage your institution's courses and track performance</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Create Course</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Courses</p>
                <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Courses</p>
                <p className="text-2xl font-bold text-gray-900">{courses.filter(c => c.status === 'active').length}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{courses.reduce((sum, c) => sum + c.students, 0)}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Completion</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(courses.filter(c => c.status === 'active').reduce((sum, c) => sum + c.completionRate, 0) / courses.filter(c => c.status === 'active').length) || 0}%
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Courses Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">All Courses</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Instructor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {courses.map(course => {
                  const StatusIcon = getStatusIcon(course.status);
                  return (
                    <tr key={course.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{course.title}</div>
                          <div className="text-sm text-gray-500">{course.description}</div>
                          <div className="text-xs text-gray-400 mt-1">{course.category}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{course.instructor}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{course.students}/{course.maxStudents}</div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${(course.students / course.maxStudents) * 100}%` }}
                          ></div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {course.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {course.status === 'active' ? (
                          <div>
                            <div className="text-sm text-gray-900">{course.completionRate}% completion</div>
                            <div className="text-sm text-gray-500">Avg grade: {course.avgGrade}%</div>
                          </div>
                        ) : (
                          <div className="text-sm text-gray-500">No data yet</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-900 p-1">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-900 p-1">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-900 p-1">
                            <Settings className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create Course Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Course</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Course Title</label>
                  <input
                    type="text"
                    value={newCourse.title}
                    onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter course title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={newCourse.description}
                    onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe the course content"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={newCourse.category}
                    onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select category</option>
                    <option value="AI & Data Science">AI & Data Science</option>
                    <option value="Programming">Programming</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Business">Business</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration (weeks)</label>
                    <input
                      type="number"
                      value={newCourse.duration}
                      onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="12"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Max Students</label>
                    <input
                      type="number"
                      value={newCourse.maxStudents}
                      onChange={(e) => setNewCourse({ ...newCourse, maxStudents: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="100"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={createCourse}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Course
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
