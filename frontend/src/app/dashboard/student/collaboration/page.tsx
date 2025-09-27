'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  MessageSquare,
  Users,
  Video,
  FileText,
  Calendar,
  Clock,
  User,
  Plus,
  Search,
  Filter,
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  Edit,
  Trash2,
  Star,
  BookOpen,
  Brain,
  Target,
  Award,
  ChevronRight,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Phone,
  PhoneOff
} from 'lucide-react';

export default function CollaborationPage() {
  const [activeTab, setActiveTab] = useState('chats');
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [showCreateChatModal, setShowCreateChatModal] = useState(false);

  // Mock collaboration data
  const chats = [
    {
      id: 1,
      name: 'ML Study Group Chat',
      type: 'group',
      participants: ['Alex Chen', 'Sarah Johnson', 'Mike Davis', 'You'],
      lastMessage: 'Great session today! Let\'s meet again tomorrow.',
      lastMessageTime: '2 hours ago',
      unreadCount: 3,
      isOnline: true,
      avatar: '🤖',
      subject: 'Machine Learning'
    },
    {
      id: 2,
      name: 'Python Project Team',
      type: 'group',
      participants: ['Emma Wilson', 'David Lee', 'You'],
      lastMessage: 'The code review is ready for your feedback.',
      lastMessageTime: '4 hours ago',
      unreadCount: 1,
      isOnline: false,
      avatar: '🐍',
      subject: 'Programming'
    },
    {
      id: 3,
      name: 'Alex Chen',
      type: 'direct',
      participants: ['Alex Chen', 'You'],
      lastMessage: 'Thanks for the study notes!',
      lastMessageTime: '1 day ago',
      unreadCount: 0,
      isOnline: true,
      avatar: '👨‍💻',
      subject: 'Machine Learning'
    }
  ];

  const activeProjects = [
    {
      id: 1,
      title: 'Neural Network Implementation',
      description: 'Building a neural network from scratch using Python',
      team: ['Alex Chen', 'Sarah Johnson', 'You'],
      progress: 75,
      deadline: '2024-02-15',
      status: 'active',
      lastActivity: '2 hours ago'
    },
    {
      id: 2,
      title: 'Data Visualization Dashboard',
      description: 'Creating interactive dashboards for data analysis',
      team: ['Emma Wilson', 'David Lee', 'You'],
      progress: 45,
      deadline: '2024-02-28',
      status: 'active',
      lastActivity: '1 day ago'
    }
  ];

  const studySessions = [
    {
      id: 1,
      title: 'ML Fundamentals Review',
      date: '2024-01-25T18:00:00Z',
      duration: '2 hours',
      participants: 8,
      type: 'video',
      status: 'upcoming',
      subject: 'Machine Learning'
    },
    {
      id: 2,
      title: 'Python Code Review',
      date: '2024-01-23T16:00:00Z',
      duration: '1.5 hours',
      participants: 5,
      type: 'video',
      status: 'completed',
      subject: 'Programming'
    }
  ];

  const tabs = [
    { id: 'chats', name: 'Chats', icon: MessageSquare },
    { id: 'projects', name: 'Projects', icon: FileText },
    { id: 'sessions', name: 'Study Sessions', icon: Video },
    { id: 'contacts', name: 'Contacts', icon: Users }
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
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
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
              <h1 className="text-3xl font-bold text-gray-900">Collaboration</h1>
              <p className="text-gray-600 mt-2">Connect and collaborate with your peers</p>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setShowCreateChatModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>New Chat</span>
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

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - List */}
          <div className="lg:col-span-1">
            {activeTab === 'chats' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-4 border-b border-gray-200">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search chats..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="divide-y divide-gray-200">
                  {chats.map((chat) => (
                    <div
                      key={chat.id}
                      onClick={() => setSelectedChat(chat)}
                      className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                        selectedChat?.id === chat.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="relative">
                          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl">
                            {chat.avatar}
                          </div>
                          {chat.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-gray-900 truncate">{chat.name}</h3>
                            <span className="text-xs text-gray-500">{chat.lastMessageTime}</span>
                          </div>
                          <p className="text-sm text-gray-600 truncate mt-1">{chat.lastMessage}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-blue-600">{chat.subject}</span>
                            {chat.unreadCount > 0 && (
                              <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                                {chat.unreadCount}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="space-y-4">
                {activeProjects.map((project) => (
                  <div key={project.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{project.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                        <div className="flex items-center space-x-2 text-xs text-blue-600">
                          <Users className="w-3 h-3" />
                          <span>{project.team.join(', ')}</span>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Deadline:</span>
                        <span className="font-medium">{formatDate(project.deadline)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Last Activity:</span>
                        <span className="font-medium">{project.lastActivity}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 mt-4">
                      <button className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                        <MessageSquare className="w-4 h-4" />
                        <span>Chat</span>
                      </button>
                      <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                        <FileText className="w-4 h-4" />
                        <span>View</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'sessions' && (
              <div className="space-y-4">
                {studySessions.map((session) => (
                  <div key={session.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{session.title}</h3>
                        <div className="flex items-center space-x-2 text-xs text-blue-600 mb-2">
                          <BookOpen className="w-3 h-3" />
                          <span>{session.subject}</span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(session.date)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{session.duration}</span>
                          </div>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
                        {session.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm mb-4">
                      <span className="text-gray-600">Participants:</span>
                      <span className="font-medium">{session.participants} people</span>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      {session.status === 'upcoming' ? (
                        <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                          <Video className="w-4 h-4" />
                          <span>Join Session</span>
                        </button>
                      ) : (
                        <button className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                          <FileText className="w-4 h-4" />
                          <span>View Recording</span>
                        </button>
                      )}
                      <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        <MessageSquare className="w-4 h-4" />
                        <span>Chat</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'contacts' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-4 border-b border-gray-200">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search contacts..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="divide-y divide-gray-200">
                  {chats.filter(chat => chat.type === 'direct').map((contact) => (
                    <div key={contact.id} className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-lg">
                            {contact.avatar}
                          </div>
                          {contact.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                          <p className="text-sm text-gray-600">{contact.subject}</p>
                        </div>
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                          <MessageSquare className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Panel - Chat/Details */}
          <div className="lg:col-span-2">
            {selectedChat ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-[600px] flex flex-col">
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-lg">
                        {selectedChat.avatar}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{selectedChat.name}</h3>
                        <p className="text-sm text-gray-600">{selectedChat.participants.join(', ')}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <Video className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm">
                      AC
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-100 rounded-lg p-3">
                        <p className="text-sm text-gray-900">Hey everyone! Ready for our study session?</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Alex Chen • 2 hours ago</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 justify-end">
                    <div className="flex-1 max-w-xs">
                      <div className="bg-blue-600 text-white rounded-lg p-3">
                        <p className="text-sm">Yes, I'm ready! Let's start with the neural network concepts.</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 text-right">You • 2 hours ago</p>
                    </div>
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-sm">
                      Y
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-sm">
                      SJ
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-100 rounded-lg p-3">
                        <p className="text-sm text-gray-900">Great session today! Let's meet again tomorrow.</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Sarah Johnson • 1 hour ago</p>
                    </div>
                  </div>
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex items-center space-x-3">
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <Paperclip className="w-4 h-4" />
                    </button>
                    <div className="flex-1">
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <Smile className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-[600px] flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Chat</h3>
                  <p className="text-gray-600">Choose a conversation to start collaborating</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Create Chat Modal */}
        {showCreateChatModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">New Chat</h2>
                <button 
                  onClick={() => setShowCreateChatModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Chat Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Direct Message</option>
                    <option>Group Chat</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Participants</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                      <span className="ml-2 text-sm text-gray-700">Alex Chen</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                      <span className="ml-2 text-sm text-gray-700">Sarah Johnson</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                      <span className="ml-2 text-sm text-gray-700">Mike Davis</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
                <button 
                  onClick={() => setShowCreateChatModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Create Chat
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
