'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  Users,
  Plus,
  Search,
  Filter,
  Calendar,
  Clock,
  User,
  MessageSquare,
  BookOpen,
  Target,
  Star,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  UserPlus,
  Settings,
  Video,
  FileText,
  Brain
} from 'lucide-react';

export default function StudyGroupsPage() {
  const [activeTab, setActiveTab] = useState('my-groups');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);

  // Mock study groups data
  const myGroups = [
    {
      id: 1,
      name: 'Machine Learning Study Group',
      description: 'Weekly study sessions for ML fundamentals and projects',
      members: 8,
      maxMembers: 12,
      subject: 'Machine Learning',
      nextMeeting: '2024-01-25T18:00:00Z',
      frequency: 'Weekly',
      status: 'active',
      thumbnail: '🤖',
      createdBy: 'Alex Chen',
      lastActivity: '2 hours ago',
      upcomingTopics: ['Neural Networks', 'Deep Learning Basics', 'TensorFlow']
    },
    {
      id: 2,
      name: 'Python Programming Circle',
      description: 'Collaborative coding and problem-solving sessions',
      members: 6,
      maxMembers: 10,
      subject: 'Programming',
      nextMeeting: '2024-01-23T16:00:00Z',
      frequency: 'Bi-weekly',
      status: 'active',
      thumbnail: '🐍',
      createdBy: 'Sarah Johnson',
      lastActivity: '1 day ago',
      upcomingTopics: ['Data Structures', 'Algorithms', 'Web Development']
    }
  ];

  const availableGroups = [
    {
      id: 3,
      name: 'Data Science Enthusiasts',
      description: 'Exploring data analysis, visualization, and machine learning',
      members: 15,
      maxMembers: 20,
      subject: 'Data Science',
      nextMeeting: '2024-01-26T19:00:00Z',
      frequency: 'Weekly',
      status: 'open',
      thumbnail: '📊',
      createdBy: 'Dr. Michael Rodriguez',
      lastActivity: '3 hours ago',
      upcomingTopics: ['Pandas', 'Matplotlib', 'Statistical Analysis']
    },
    {
      id: 4,
      name: 'AI Research Group',
      description: 'Advanced discussions on AI research papers and implementations',
      members: 12,
      maxMembers: 15,
      subject: 'Artificial Intelligence',
      nextMeeting: '2024-01-24T17:00:00Z',
      frequency: 'Weekly',
      status: 'open',
      thumbnail: '🧠',
      createdBy: 'Prof. Emily Watson',
      lastActivity: '5 hours ago',
      upcomingTopics: ['Transformer Models', 'Computer Vision', 'NLP']
    }
  ];

  const tabs = [
    { id: 'my-groups', name: 'My Groups', icon: Users },
    { id: 'available', name: 'Available Groups', icon: Plus },
    { id: 'archived', name: 'Archived', icon: BookOpen }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'full': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
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
              <h1 className="text-3xl font-bold text-gray-900">Study Groups</h1>
              <p className="text-gray-600 mt-2">Join study groups and collaborate with peers</p>
            </div>
            <button 
              onClick={() => setShowCreateGroupModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Create Group</span>
            </button>
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
                placeholder="Search study groups..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>All Subjects</option>
                <option>Machine Learning</option>
                <option>Programming</option>
                <option>Data Science</option>
                <option>Artificial Intelligence</option>
              </select>
              <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {activeTab === 'my-groups' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myGroups.map((group) => (
                <div key={group.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-3">
                      <div className="text-3xl">{group.thumbnail}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{group.name}</h3>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{group.description}</p>
                        <div className="flex items-center space-x-2 text-xs text-blue-600">
                          <BookOpen className="w-3 h-3" />
                          <span>{group.subject}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(group.status)}`}>
                        {group.status}
                      </span>
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Members:</span>
                      <span className="font-medium">{group.members}/{group.maxMembers}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Next Meeting:</span>
                      <span className="font-medium">{formatDate(group.nextMeeting)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Frequency:</span>
                      <span className="font-medium">{group.frequency}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Created by:</span>
                      <span className="font-medium">{group.createdBy}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Upcoming Topics:</p>
                    <div className="flex flex-wrap gap-1">
                      {group.upcomingTopics.slice(0, 2).map((topic, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          {topic}
                        </span>
                      ))}
                      {group.upcomingTopics.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          +{group.upcomingTopics.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <MessageSquare className="w-4 h-4" />
                      <span>Join Meeting</span>
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

          {activeTab === 'available' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableGroups.map((group) => (
                <div key={group.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-3">
                      <div className="text-3xl">{group.thumbnail}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{group.name}</h3>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{group.description}</p>
                        <div className="flex items-center space-x-2 text-xs text-blue-600">
                          <BookOpen className="w-3 h-3" />
                          <span>{group.subject}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(group.status)}`}>
                        {group.status}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Members:</span>
                      <span className="font-medium">{group.members}/{group.maxMembers}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Next Meeting:</span>
                      <span className="font-medium">{formatDate(group.nextMeeting)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Frequency:</span>
                      <span className="font-medium">{group.frequency}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Created by:</span>
                      <span className="font-medium">{group.createdBy}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Upcoming Topics:</p>
                    <div className="flex flex-wrap gap-1">
                      {group.upcomingTopics.slice(0, 2).map((topic, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          {topic}
                        </span>
                      ))}
                      {group.upcomingTopics.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          +{group.upcomingTopics.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      <UserPlus className="w-4 h-4" />
                      <span>Join Group</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      <Eye className="w-4 h-4" />
                      <span>View Details</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'archived' && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Archived Groups</h3>
              <p className="text-gray-600">Archived study groups will appear here</p>
            </div>
          )}
        </div>

        {/* Create Group Modal */}
        {showCreateGroupModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Create Study Group</h2>
                <button 
                  onClick={() => setShowCreateGroupModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Group Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter group name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Describe your study group"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>Machine Learning</option>
                        <option>Programming</option>
                        <option>Data Science</option>
                        <option>Artificial Intelligence</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Max Members</label>
                      <input
                        type="number"
                        min="2"
                        max="20"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="10"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Frequency</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>Weekly</option>
                        <option>Bi-weekly</option>
                        <option>Monthly</option>
                        <option>As needed</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Time</label>
                      <input
                        type="datetime-local"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
                <button 
                  onClick={() => setShowCreateGroupModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Create Group
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}