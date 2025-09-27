'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  Plus,
  Users,
  BookOpen,
  GraduationCap,
  TrendingUp,
  Calendar,
  Bell,
  Settings,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  UserPlus,
  FileText,
  Target,
  Brain,
  Play,
  Download,
  Share,
  Star,
  Clock,
  Award,
  BarChart3,
  PieChart,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  X
} from 'lucide-react';

export default function InstituteDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showCreateCourseModal, setShowCreateCourseModal] = useState(false);
  const [instituteData, setInstituteData] = useState<any>(null);

  useEffect(() => {
    // Load institute data from localStorage
    const savedData = localStorage.getItem('instituteData');
    if (savedData) {
      setInstituteData(JSON.parse(savedData));
    }
  }, []);

  // Dummy data
  const stats = {
    totalStudents: 1247,
    totalTeachers: 89,
    activeCourses: 23,
    completedAssignments: 156,
    studentGrowth: 12.5,
    teacherGrowth: 8.2,
    courseGrowth: 15.3,
    assignmentGrowth: -2.1
  };

  const recentActivity = [
    {
      id: 1,
      type: 'student_joined',
      message: 'Sarah Johnson joined Machine Learning Course',
      time: '2 hours ago',
      icon: UserPlus,
      color: 'text-green-600 bg-green-100'
    },
    {
      id: 2,
      type: 'assignment_submitted',
      message: '45 students submitted Python Programming Assignment',
      time: '4 hours ago',
      icon: FileText,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      id: 3,
      type: 'course_created',
      message: 'Dr. Smith created new course: Data Science Fundamentals',
      time: '1 day ago',
      icon: BookOpen,
      color: 'text-purple-600 bg-purple-100'
    },
    {
      id: 4,
      type: 'quiz_generated',
      message: 'AI generated 20 new quiz questions for Statistics course',
      time: '2 days ago',
      icon: Brain,
      color: 'text-orange-600 bg-orange-100'
    }
  ];

  const courses = [
    {
      id: 1,
      title: 'Machine Learning Fundamentals',
      teacher: 'Dr. Sarah Chen',
      students: 145,
      assignments: 8,
      status: 'active',
      createdDate: '2024-01-15',
      lastActivity: '2 hours ago',
      description: 'Comprehensive introduction to machine learning concepts and algorithms'
    },
    {
      id: 2,
      title: 'Python Programming',
      teacher: 'Prof. Michael Rodriguez',
      students: 203,
      assignments: 12,
      status: 'active',
      createdDate: '2024-01-10',
      lastActivity: '4 hours ago',
      description: 'Complete Python programming course from basics to advanced topics'
    },
    {
      id: 3,
      title: 'Data Science Essentials',
      teacher: 'Dr. Emily Watson',
      students: 98,
      assignments: 6,
      status: 'active',
      createdDate: '2024-01-20',
      lastActivity: '1 day ago',
      description: 'Essential data science tools and techniques for beginners'
    },
    {
      id: 4,
      title: 'Statistics and Probability',
      teacher: 'Prof. David Kim',
      students: 167,
      assignments: 10,
      status: 'active',
      createdDate: '2024-01-08',
      lastActivity: '3 days ago',
      description: 'Mathematical foundations for data science and machine learning'
    }
  ];

  const teachers = [
    {
      id: 1,
      name: 'Dr. Sarah Chen',
      email: 'sarah.chen@institute.com',
      courses: 3,
      students: 245,
      joinDate: '2023-08-15',
      status: 'active',
      avatar: 'SC',
      subjects: ['Machine Learning', 'AI', 'Deep Learning']
    },
    {
      id: 2,
      name: 'Prof. Michael Rodriguez',
      email: 'michael.rodriguez@institute.com',
      courses: 2,
      students: 203,
      joinDate: '2023-09-01',
      status: 'active',
      avatar: 'MR',
      subjects: ['Python', 'Programming', 'Software Engineering']
    },
    {
      id: 3,
      name: 'Dr. Emily Watson',
      email: 'emily.watson@institute.com',
      courses: 2,
      students: 156,
      joinDate: '2023-10-10',
      status: 'active',
      avatar: 'EW',
      subjects: ['Data Science', 'Statistics', 'Analytics']
    }
  ];

  const getGrowthIcon = (growth: number) => {
    return growth > 0 ? (
      <ArrowUpRight className="w-4 h-4 text-green-600" />
    ) : (
      <ArrowDownRight className="w-4 h-4 text-red-600" />
    );
  };

  const getGrowthColor = (growth: number) => {
    return growth > 0 ? 'text-green-600' : 'text-red-600';
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'courses', name: 'Courses', icon: BookOpen },
    { id: 'teachers', name: 'Teachers', icon: GraduationCap },
    { id: 'students', name: 'Students', icon: Users },
    { id: 'analytics', name: 'Analytics', icon: TrendingUp }
  ];

  return (
    <DashboardLayout userType="institute">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {instituteData?.instituteName || 'Institute Dashboard'}
              </h1>
              <p className="text-gray-600 mt-2">Manage your educational institution</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Bell className="w-4 h-4" />
                <span>Notifications</span>
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

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Students</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalStudents}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  {getGrowthIcon(stats.studentGrowth)}
                  <span className={`ml-1 text-sm font-medium ${getGrowthColor(stats.studentGrowth)}`}>
                    {Math.abs(stats.studentGrowth)}%
                  </span>
                  <span className="ml-1 text-sm text-gray-500">from last month</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Teachers</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalTeachers}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  {getGrowthIcon(stats.teacherGrowth)}
                  <span className={`ml-1 text-sm font-medium ${getGrowthColor(stats.teacherGrowth)}`}>
                    {Math.abs(stats.teacherGrowth)}%
                  </span>
                  <span className="ml-1 text-sm text-gray-500">from last month</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Courses</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.activeCourses}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  {getGrowthIcon(stats.courseGrowth)}
                  <span className={`ml-1 text-sm font-medium ${getGrowthColor(stats.courseGrowth)}`}>
                    {Math.abs(stats.courseGrowth)}%
                  </span>
                  <span className="ml-1 text-sm text-gray-500">from last month</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Assignments</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.completedAssignments}</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  {getGrowthIcon(stats.assignmentGrowth)}
                  <span className={`ml-1 text-sm font-medium ${getGrowthColor(stats.assignmentGrowth)}`}>
                    {Math.abs(stats.assignmentGrowth)}%
                  </span>
                  <span className="ml-1 text-sm text-gray-500">from last month</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <div key={activity.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className={`w-10 h-10 ${activity.color} rounded-lg flex items-center justify-center`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{activity.message}</p>
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="space-y-6">
            {/* Courses Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Courses</h2>
                <p className="text-gray-600 mt-1">Manage all your institute courses</p>
              </div>
              <button 
                onClick={() => setShowCreateCourseModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Create Course</span>
              </button>
            </div>

            {/* Search and Filter */}
            <div className="flex items-center space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="relative">
                <select className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>All Courses</option>
                  <option>Active</option>
                  <option>Completed</option>
                  <option>Draft</option>
                </select>
                <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div key={course.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">{course.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{course.description}</p>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Teacher:</span>
                      <span className="font-medium">{course.teacher}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Students:</span>
                      <span className="font-medium">{course.students}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Assignments:</span>
                      <span className="font-medium">{course.assignments}</span>
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
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {course.status}
                    </span>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'teachers' && (
          <div className="space-y-6">
            {/* Teachers Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Teachers</h2>
                <p className="text-gray-600 mt-1">Manage your teaching staff</p>
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4" />
                <span>Add Teacher</span>
              </button>
            </div>

            {/* Teachers List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Courses</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {teachers.map((teacher) => (
                      <tr key={teacher.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                              <span className="text-sm font-medium text-blue-600">{teacher.avatar}</span>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{teacher.name}</div>
                              <div className="text-sm text-gray-500">{teacher.subjects.join(', ')}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{teacher.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{teacher.courses}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{teacher.students}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{teacher.joinDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            teacher.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {teacher.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">View</button>
                            <button className="text-green-600 hover:text-green-900">Edit</button>
                            <button className="text-red-600 hover:text-red-900">Remove</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'students' && (
          <div className="space-y-6">
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Students Management</h3>
              <p className="text-gray-600">Student management features coming soon</p>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="text-center py-12">
              <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics Dashboard</h3>
              <p className="text-gray-600">Advanced analytics and reporting coming soon</p>
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">Instructor</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>Select Instructor</option>
                        <option>Dr. Sarah Chen</option>
                        <option>Prof. Michael Rodriguez</option>
                        <option>Dr. Emily Watson</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Duration (weeks)</label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="12"
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
      </div>
    </DashboardLayout>
  );
}
