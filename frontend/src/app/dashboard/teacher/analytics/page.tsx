'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  BookOpen,
  Target,
  Clock,
  Award,
  Activity,
  Eye,
  Download,
  Filter,
  Calendar,
  Star,
  CheckCircle,
  AlertCircle,
  Brain,
  FileText,
  MessageSquare
} from 'lucide-react';

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedCourse, setSelectedCourse] = useState('all');

  // Mock analytics data
  const overviewStats = {
    totalStudents: 45,
    activeStudents: 38,
    totalCourses: 4,
    averageEngagement: 87.5,
    totalAssignments: 12,
    completedAssignments: 156,
    averageScore: 84.2,
    totalStudyTime: 1250.5
  };

  const courseAnalytics = [
    {
      id: 1,
      title: 'Machine Learning Fundamentals',
      students: 15,
      averageScore: 89.5,
      completionRate: 92,
      engagement: 91,
      assignments: 4,
      totalStudyTime: 450.2
    },
    {
      id: 2,
      title: 'Python Programming',
      students: 12,
      averageScore: 87.3,
      completionRate: 88,
      engagement: 85,
      assignments: 3,
      totalStudyTime: 380.5
    },
    {
      id: 3,
      title: 'Data Structures & Algorithms',
      students: 18,
      averageScore: 82.1,
      completionRate: 78,
      engagement: 79,
      assignments: 3,
      totalStudyTime: 320.8
    },
    {
      id: 4,
      title: 'Web Development',
      students: 10,
      averageScore: 85.7,
      completionRate: 85,
      engagement: 88,
      assignments: 2,
      totalStudyTime: 199.0
    }
  ];

  const studentPerformance = [
    { name: 'Alex Chen', score: 95, progress: 100, engagement: 98 },
    { name: 'Sarah Johnson', score: 89, progress: 85, engagement: 92 },
    { name: 'Mike Davis', score: 87, progress: 92, engagement: 89 },
    { name: 'Emma Wilson', score: 76, progress: 65, engagement: 72 },
    { name: 'David Lee', score: 91, progress: 88, engagement: 94 }
  ];

  const engagementTrends = [
    { week: 'Week 1', engagement: 85, submissions: 45 },
    { week: 'Week 2', engagement: 88, submissions: 52 },
    { week: 'Week 3', engagement: 91, submissions: 48 },
    { week: 'Week 4', engagement: 87, submissions: 55 }
  ];

  const courses = [
    'Machine Learning Fundamentals',
    'Python Programming',
    'Data Structures & Algorithms',
    'Web Development'
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getEngagementColor = (engagement: number) => {
    if (engagement >= 90) return 'bg-green-500';
    if (engagement >= 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <DashboardLayout userType="teacher">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
              <p className="text-gray-600 mt-2">Track performance and engagement across your courses</p>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Courses</option>
                {courses.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{overviewStats.totalStudents}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-green-600 font-medium">
                +{overviewStats.activeStudents} active
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Score</p>
                <p className="text-2xl font-bold text-gray-900">{overviewStats.averageScore}%</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-green-600 font-medium">
                +5.2% from last month
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Engagement Rate</p>
                <p className="text-2xl font-bold text-gray-900">{overviewStats.averageEngagement}%</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-green-600 font-medium">
                +3.1% from last month
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Study Time</p>
                <p className="text-2xl font-bold text-gray-900">{overviewStats.totalStudyTime}h</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-green-600 font-medium">
                +125h this month
              </span>
            </div>
          </div>
        </div>

        {/* Course Analytics */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Performance</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {courseAnalytics.map((course) => (
              <div key={course.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{course.title}</h4>
                    <p className="text-sm text-gray-600">{course.students} students enrolled</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-2xl font-bold ${getScoreColor(course.averageScore)}`}>
                      {course.averageScore}%
                    </p>
                    <p className="text-sm text-gray-600">Average Score</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">Completion Rate</span>
                      <span className="font-medium">{course.completionRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.completionRate}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">Engagement</span>
                      <span className="font-medium">{course.engagement}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${getEngagementColor(course.engagement)}`}
                        style={{ width: `${course.engagement}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Assignments:</span>
                      <span className="font-medium ml-1">{course.assignments}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Study Time:</span>
                      <span className="font-medium ml-1">{course.totalStudyTime}h</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Student Performance */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Students</h3>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Average Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Progress
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Engagement
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {studentPerformance.map((student, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">{student.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`text-sm font-medium ${getScoreColor(student.score)}`}>
                          {student.score}%
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${student.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">{student.progress}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-600">{student.engagement}%</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          <Eye className="w-4 h-4 inline" />
                        </button>
                        <button className="text-blue-600 hover:text-blue-900">
                          <MessageSquare className="w-4 h-4 inline" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Engagement Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Engagement Trends</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Chart visualization coming soon</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Assignment Submissions</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Chart visualization coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
