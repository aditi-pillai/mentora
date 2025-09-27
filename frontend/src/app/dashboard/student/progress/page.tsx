'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  Target,
  Award,
  BookOpen,
  Clock,
  Calendar,
  Star,
  CheckCircle,
  AlertCircle,
  Users,
  Brain,
  FileText,
  Play,
  Eye,
  Download,
  Filter,
  ChevronRight,
  Trophy,
  Zap,
  Activity
} from 'lucide-react';

export default function ProgressPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Mock progress data
  const overallStats = {
    totalCourses: 4,
    completedCourses: 2,
    totalStudyTime: 45.5,
    averageScore: 87.5,
    streak: 12,
    achievements: 8
  };

  const courseProgress = [
    {
      id: 1,
      title: 'Machine Learning Fundamentals',
      progress: 85,
      totalLessons: 20,
      completedLessons: 17,
      averageScore: 92,
      timeSpent: 18.5,
      lastAccessed: '2 hours ago',
      status: 'active',
      thumbnail: '🤖',
      nextLesson: 'Neural Networks Basics',
      upcomingDeadline: '2024-02-15'
    },
    {
      id: 2,
      title: 'Python Programming',
      progress: 100,
      totalLessons: 15,
      completedLessons: 15,
      averageScore: 89,
      timeSpent: 22.0,
      lastAccessed: '1 week ago',
      status: 'completed',
      thumbnail: '🐍',
      nextLesson: 'Course Completed',
      upcomingDeadline: null
    },
    {
      id: 3,
      title: 'Data Structures & Algorithms',
      progress: 60,
      totalLessons: 25,
      completedLessons: 15,
      averageScore: 78,
      timeSpent: 12.5,
      lastAccessed: '3 days ago',
      status: 'active',
      thumbnail: '📊',
      nextLesson: 'Binary Trees',
      upcomingDeadline: '2024-02-20'
    },
    {
      id: 4,
      title: 'Web Development',
      progress: 30,
      totalLessons: 18,
      completedLessons: 5,
      averageScore: 85,
      timeSpent: 8.0,
      lastAccessed: '1 day ago',
      status: 'active',
      thumbnail: '🌐',
      nextLesson: 'CSS Flexbox',
      upcomingDeadline: '2024-03-01'
    }
  ];

  const achievements = [
    {
      id: 1,
      title: 'First Steps',
      description: 'Complete your first lesson',
      icon: '🎯',
      earned: true,
      earnedDate: '2024-01-10',
      points: 10
    },
    {
      id: 2,
      title: 'Study Streak',
      description: 'Study for 7 consecutive days',
      icon: '🔥',
      earned: true,
      earnedDate: '2024-01-20',
      points: 25
    },
    {
      id: 3,
      title: 'Quiz Master',
      description: 'Score 90% or higher on 5 quizzes',
      icon: '🧠',
      earned: true,
      earnedDate: '2024-01-22',
      points: 50
    },
    {
      id: 4,
      title: 'Course Completion',
      description: 'Complete your first course',
      icon: '🏆',
      earned: true,
      earnedDate: '2024-01-15',
      points: 100
    },
    {
      id: 5,
      title: 'Perfect Score',
      description: 'Get 100% on any quiz',
      icon: '⭐',
      earned: false,
      earnedDate: null,
      points: 75
    },
    {
      id: 6,
      title: 'Study Marathon',
      description: 'Study for 5 hours in one day',
      icon: '⚡',
      earned: false,
      earnedDate: null,
      points: 30
    }
  ];

  const studyHistory = [
    { date: '2024-01-24', duration: 2.5, subject: 'Machine Learning', activity: 'Video Lesson' },
    { date: '2024-01-23', duration: 1.5, subject: 'Python', activity: 'Quiz' },
    { date: '2024-01-22', duration: 3.0, subject: 'Data Structures', activity: 'Practice Problems' },
    { date: '2024-01-21', duration: 2.0, subject: 'Web Development', activity: 'Coding Exercise' },
    { date: '2024-01-20', duration: 1.0, subject: 'Machine Learning', activity: 'Reading' }
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'courses', name: 'Courses', icon: BookOpen },
    { id: 'achievements', name: 'Achievements', icon: Award },
    { id: 'analytics', name: 'Analytics', icon: TrendingUp }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
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

  return (
    <DashboardLayout userType="student">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Progress</h1>
              <p className="text-gray-600 mt-2">Track your learning journey and achievements</p>
            </div>
            <div className="flex items-center space-x-3">
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

        {/* Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Courses</p>
                      <p className="text-2xl font-bold text-gray-900">{overallStats.totalCourses}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="text-sm text-green-600 font-medium">
                      +{overallStats.completedCourses} completed
                    </span>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Study Time</p>
                      <p className="text-2xl font-bold text-gray-900">{overallStats.totalStudyTime}h</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="text-sm text-green-600 font-medium">
                      +2.5h this week
                    </span>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Average Score</p>
                      <p className="text-2xl font-bold text-gray-900">{overallStats.averageScore}%</p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Target className="w-6 h-6 text-yellow-600" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="text-sm text-green-600 font-medium">
                      +5% improvement
                    </span>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Study Streak</p>
                      <p className="text-2xl font-bold text-gray-900">{overallStats.streak} days</p>
                    </div>
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <Zap className="w-6 h-6 text-red-600" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="text-sm text-green-600 font-medium">
                      Keep it up!
                    </span>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Study Activity</h3>
                <div className="space-y-4">
                  {studyHistory.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Activity className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{activity.activity}</p>
                          <p className="text-sm text-gray-600">{activity.subject}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{activity.duration}h</p>
                        <p className="text-sm text-gray-600">{formatDate(activity.date)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'courses' && (
            <div className="space-y-6">
              {courseProgress.map((course) => (
                <div key={course.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-start space-x-4">
                      <div className="text-3xl">{course.thumbnail}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">{course.title}</h3>
                        <p className="text-gray-600 mb-2">
                          {course.completedLessons} of {course.totalLessons} lessons completed
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{course.timeSpent}h studied</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Target className="w-4 h-4" />
                            <span className={getScoreColor(course.averageScore)}>
                              {course.averageScore}% average
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>Last: {course.lastAccessed}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        course.status === 'completed' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {course.status}
                      </span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-300 ${getProgressColor(course.progress)}`}
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Next: {course.nextLesson}</p>
                      {course.upcomingDeadline && (
                        <p className="text-sm text-orange-600">
                          Deadline: {formatDate(course.upcomingDeadline)}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center space-x-3">
                      <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <Play className="w-4 h-4" />
                        <span>Continue</span>
                      </button>
                      <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        <Eye className="w-4 h-4" />
                        <span>View Details</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => (
                <div key={achievement.id} className={`rounded-xl p-6 shadow-sm border-2 transition-all ${
                  achievement.earned 
                    ? 'bg-white border-yellow-200 hover:border-yellow-300' 
                    : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex items-start space-x-4">
                    <div className={`text-3xl ${achievement.earned ? '' : 'grayscale opacity-50'}`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                        {achievement.earned && (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-600">
                          {achievement.points} points
                        </span>
                        {achievement.earned && (
                          <span className="text-xs text-gray-500">
                            Earned {formatDate(achievement.earnedDate)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Study Time Trend</h3>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Chart visualization coming soon</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Score Distribution</h3>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Chart visualization coming soon</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Trophy className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-900">Strongest Subject</h4>
                    <p className="text-sm text-gray-600">Machine Learning</p>
                    <p className="text-lg font-bold text-green-600">92%</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <Target className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-900">Focus Area</h4>
                    <p className="text-sm text-gray-600">Data Structures</p>
                    <p className="text-lg font-bold text-yellow-600">78%</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Zap className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-900">Study Streak</h4>
                    <p className="text-sm text-gray-600">Current streak</p>
                    <p className="text-lg font-bold text-blue-600">12 days</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
