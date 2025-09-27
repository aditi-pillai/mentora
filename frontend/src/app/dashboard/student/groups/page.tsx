'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  Users, 
  Plus, 
  MessageSquare, 
  Calendar, 
  UserPlus, 
  Settings,
  Send,
  Brain,
  Video,
  Mic,
  MicOff,
  Phone,
  PhoneOff
} from 'lucide-react';

export default function StudyGroupsPage() {
  const [activeGroup, setActiveGroup] = useState<any>(null);
  const [newMessage, setNewMessage] = useState('');
  const [isInCall, setIsInCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const studyGroups = [
    {
      id: 1,
      name: 'Machine Learning Study Group',
      description: 'Advanced ML concepts and projects',
      members: 8,
      onlineMembers: 5,
      lastActivity: '2 minutes ago',
      isActive: true,
      avatar: '🧠',
      messages: [
        {
          id: 1,
          user: 'Sarah Chen',
          message: 'Has anyone finished the assignment on neural networks?',
          time: '2:30 PM',
          isAI: false
        },
        {
          id: 2,
          user: 'AI Assistant',
          message: 'I can help you understand neural networks! Would you like me to explain backpropagation?',
          time: '2:31 PM',
          isAI: true
        },
        {
          id: 3,
          user: 'Mike Johnson',
          message: 'Yes! I\'m working on it now. The AI assistant is super helpful.',
          time: '2:32 PM',
          isAI: false
        }
      ]
    },
    {
      id: 2,
      name: 'Data Science Bootcamp',
      description: 'Python, statistics, and data analysis',
      members: 12,
      onlineMembers: 7,
      lastActivity: '1 hour ago',
      isActive: false,
      avatar: '📊',
      messages: []
    },
    {
      id: 3,
      name: 'AI Research Team',
      description: 'Research papers and thesis discussions',
      members: 6,
      onlineMembers: 3,
      lastActivity: '3 hours ago',
      isActive: false,
      avatar: '🔬',
      messages: []
    }
  ];

  const sendMessage = () => {
    if (newMessage.trim() && activeGroup) {
      const message = {
        id: Date.now(),
        user: 'You',
        message: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isAI: false
      };
      
      // In a real app, this would be sent to the backend
      setNewMessage('');
    }
  };

  const askAI = () => {
    if (activeGroup) {
      const aiMessage = {
        id: Date.now(),
        user: 'AI Assistant',
        message: 'I\'m here to help! What would you like to know about your study topic?',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isAI: true
      };
    }
  };

  return (
    <DashboardLayout userType="student">
      <div className="p-6 h-full">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Study Groups</h1>
          <p className="text-gray-600">Collaborate with peers and get AI assistance</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
          {/* Groups List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">My Groups</h2>
                  <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-4 space-y-3">
                {studyGroups.map(group => (
                  <div
                    key={group.id}
                    onClick={() => setActiveGroup(group)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      activeGroup?.id === group.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{group.avatar}</div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">{group.name}</h3>
                        <p className="text-sm text-gray-600 truncate">{group.description}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className={`w-2 h-2 rounded-full ${group.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                          <span className="text-xs text-gray-500">
                            {group.onlineMembers}/{group.members} online
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-gray-200">
                <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2">
                  <UserPlus className="w-4 h-4" />
                  <span>Join Group</span>
                </button>
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            {activeGroup ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex flex-col">
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{activeGroup.avatar}</div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{activeGroup.name}</h3>
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${activeGroup.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                          <span className="text-sm text-gray-500">
                            {activeGroup.onlineMembers} members online
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setIsInCall(!isInCall)}
                        className={`p-2 rounded-lg transition-colors ${
                          isInCall 
                            ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                            : 'bg-green-100 text-green-600 hover:bg-green-200'
                        }`}
                      >
                        {isInCall ? <PhoneOff className="w-5 h-5" /> : <Phone className="w-5 h-5" />}
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <Settings className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                  {activeGroup.messages.map(message => (
                    <div
                      key={message.id}
                      className={`flex ${message.isAI ? 'justify-start' : message.user === 'You' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.isAI
                          ? 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200'
                          : message.user === 'You'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        {message.isAI && (
                          <div className="flex items-center space-x-2 mb-1">
                            <Brain className="w-4 h-4 text-blue-600" />
                            <span className="text-xs font-semibold text-blue-600">AI Assistant</span>
                          </div>
                        )}
                        <p className="text-sm">{message.message}</p>
                        <p className={`text-xs mt-1 ${
                          message.isAI ? 'text-blue-500' : message.user === 'You' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {message.user} • {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Call Controls */}
                {isInCall && (
                  <div className="p-4 border-t border-gray-200 bg-gray-50">
                    <div className="flex items-center justify-center space-x-4">
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className={`p-3 rounded-full transition-colors ${
                          isMuted ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                      </button>
                      <button className="p-3 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors">
                        <Video className="w-5 h-5" />
                      </button>
                      <button className="p-3 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors">
                        <PhoneOff className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={askAI}
                      className="p-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600 rounded-lg hover:from-blue-200 hover:to-purple-200 transition-colors"
                      title="Ask AI Assistant"
                    >
                      <Brain className="w-5 h-5" />
                    </button>
                    
                    <div className="flex-1">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="Type a message..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <button
                      onClick={sendMessage}
                      className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex items-center justify-center">
                <div className="text-center">
                  <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Study Group</h3>
                  <p className="text-gray-600">Choose a group from the sidebar to start collaborating</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
