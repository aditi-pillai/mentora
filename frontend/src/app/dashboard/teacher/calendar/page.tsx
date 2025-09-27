'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  Calendar,
  Plus,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Users,
  BookOpen,
  Video,
  FileText,
  Target,
  Bell,
  Edit,
  Trash2,
  Eye,
  Filter,
  Search,
  MoreVertical,
  X,
  GraduationCap,
  MessageSquare,
  BarChart3
} from 'lucide-react';

export default function TeacherCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month');
  const [showCreateEventModal, setShowCreateEventModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Mock events data for teachers
  const events = [
    {
      id: 1,
      title: 'ML Lecture - Neural Networks',
      type: 'lecture',
      date: '2024-01-25',
      time: '10:00',
      duration: '1.5 hours',
      location: 'Room 101',
      participants: ['ML Class - 15 students'],
      description: 'Introduction to neural networks and backpropagation',
      color: 'blue',
      course: 'Machine Learning Fundamentals'
    },
    {
      id: 2,
      title: 'Python Quiz Grading',
      type: 'grading',
      date: '2024-01-26',
      time: '14:00',
      duration: '2 hours',
      location: 'Office',
      participants: ['You'],
      description: 'Grade Python Programming Quiz submissions',
      color: 'green',
      course: 'Python Programming'
    },
    {
      id: 3,
      title: 'Office Hours',
      type: 'office-hours',
      date: '2024-01-28',
      time: '16:00',
      duration: '1 hour',
      location: 'Office 205',
      participants: ['Students'],
      description: 'Weekly office hours for student consultations',
      color: 'purple',
      course: 'All Courses'
    },
    {
      id: 4,
      title: 'Faculty Meeting',
      type: 'meeting',
      date: '2024-01-30',
      time: '09:00',
      duration: '1 hour',
      location: 'Conference Room A',
      participants: ['Faculty Members'],
      description: 'Monthly faculty meeting and curriculum discussion',
      color: 'orange',
      course: 'Administrative'
    },
    {
      id: 5,
      title: 'Data Structures Assignment Due',
      type: 'deadline',
      date: '2024-02-01',
      time: '23:59',
      duration: 'All day',
      location: 'Online',
      participants: ['DS Class - 18 students'],
      description: 'Binary Tree Implementation Assignment submission deadline',
      color: 'red',
      course: 'Data Structures & Algorithms'
    }
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateString);
  };

  const getEventColor = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'green': return 'bg-green-100 text-green-800 border-green-200';
      case 'red': return 'bg-red-100 text-red-800 border-red-200';
      case 'purple': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'orange': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'lecture': return Video;
      case 'grading': return FileText;
      case 'office-hours': return Users;
      case 'meeting': return MessageSquare;
      case 'deadline': return Target;
      default: return Calendar;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const days = getDaysInMonth(currentDate);
  const today = new Date();
  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString();
  };

  return (
    <DashboardLayout userType="teacher">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
              <p className="text-gray-600 mt-2">Manage your teaching schedule and academic events</p>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={view}
                onChange={(e) => setView(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="month">Month</option>
                <option value="week">Week</option>
                <option value="day">Day</option>
              </select>
              <button 
                onClick={() => setShowCreateEventModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Event</span>
              </button>
            </div>
          </div>

          {/* Calendar Navigation */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-semibold text-gray-900">
                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h2>
              <button
                onClick={() => navigateMonth('next')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              Today
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Days of week header */}
          <div className="grid grid-cols-7 border-b border-gray-200">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-4 text-center font-medium text-gray-700 bg-gray-50">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7">
            {days.map((day, index) => {
              if (!day) {
                return <div key={index} className="h-32 border-r border-b border-gray-200"></div>;
              }

              const dayEvents = getEventsForDate(day);
              const isCurrentDay = isToday(day);

              return (
                <div
                  key={day.toISOString()}
                  className={`h-32 border-r border-b border-gray-200 p-2 cursor-pointer hover:bg-gray-50 transition-colors ${
                    isCurrentDay ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedDate(day)}
                >
                  <div className={`text-sm font-medium mb-1 ${
                    isCurrentDay ? 'text-blue-600' : 'text-gray-900'
                  }`}>
                    {day.getDate()}
                  </div>
                  <div className="space-y-1">
                    {dayEvents.slice(0, 2).map(event => {
                      const EventIcon = getEventIcon(event.type);
                      return (
                        <div
                          key={event.id}
                          className={`text-xs p-1 rounded border-l-2 ${getEventColor(event.color)} truncate`}
                        >
                          <div className="flex items-center space-x-1">
                            <EventIcon className="w-3 h-3" />
                            <span className="truncate">{event.title}</span>
                          </div>
                        </div>
                      );
                    })}
                    {dayEvents.length > 2 && (
                      <div className="text-xs text-gray-500">
                        +{dayEvents.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.slice(0, 6).map(event => {
              const EventIcon = getEventIcon(event.type);
              return (
                <div key={event.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getEventColor(event.color)}`}>
                        <EventIcon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{event.title}</h4>
                        <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
                        <p className="text-xs text-blue-600 mt-1">{event.course}</p>
                      </div>
                    </div>
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(new Date(event.date))}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{event.time} • {event.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>{event.participants.join(', ')}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <button className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      <Eye className="w-4 h-4" />
                      <span>View</span>
                    </button>
                    <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      <Bell className="w-4 h-4" />
                      <span>Remind</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Create Event Modal */}
        {showCreateEventModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Create Event</h2>
                <button 
                  onClick={() => setShowCreateEventModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Title</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter event title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Lecture</option>
                    <option>Office Hours</option>
                    <option>Grading Session</option>
                    <option>Faculty Meeting</option>
                    <option>Deadline</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Machine Learning Fundamentals</option>
                    <option>Python Programming</option>
                    <option>Data Structures & Algorithms</option>
                    <option>Web Development</option>
                    <option>Administrative</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                    <input
                      type="time"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>30 minutes</option>
                    <option>1 hour</option>
                    <option>1.5 hours</option>
                    <option>2 hours</option>
                    <option>All day</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter location"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Enter event description"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
                <button 
                  onClick={() => setShowCreateEventModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Create Event
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
