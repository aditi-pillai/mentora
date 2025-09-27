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
              <h1 className="text-3xl font-bold" style={{ color: 'var(--color-base-content)' }}>Calendar</h1>
              <p className="mt-2" style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>Manage your teaching schedule and academic events</p>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={view}
                onChange={(e) => setView(e.target.value)}
                className="px-3 py-2 rounded-lg focus:ring-2 border-abyss"
                style={{ background: 'color-mix(in oklch, var(--color-base-300) 80%, transparent)', color: 'var(--color-base-content)', outlineColor: 'var(--color-primary)' }}
              >
                <option value="month">Month</option>
                <option value="week">Week</option>
                <option value="day">Day</option>
              </select>
              <button 
                onClick={() => setShowCreateEventModal(true)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors btn-abyss"
                style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', color: 'var(--color-accent-content)' }}
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
                className="p-2 rounded-lg transition-colors border-abyss" style={{ color: 'color-mix(in oklch, var(--color-base-content) 60%, transparent)' }}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-semibold" style={{ color: 'var(--color-base-content)' }}>
                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h2>
              <button
                onClick={() => navigateMonth('next')}
                className="p-2 rounded-lg transition-colors border-abyss" style={{ color: 'color-mix(in oklch, var(--color-base-content) 60%, transparent)' }}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-4 py-2 rounded-lg transition-colors btn-abyss-outline"
            >
              Today
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="rounded-xl shadow-sm abyss-card border-abyss overflow-hidden">
          {/* Days of week header */}
          <div className="grid grid-cols-7" style={{ borderBottom: '1px solid color-mix(in oklch, var(--color-base-100) 30%, transparent)' }}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-4 text-center font-medium" style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)', background: 'color-mix(in oklch, var(--color-base-100) 20%, transparent)' }}>
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7">
            {days.map((day, index) => {
              if (!day) {
                return <div key={index} className="h-32" style={{ borderRight: '1px solid color-mix(in oklch, var(--color-base-100) 30%, transparent)', borderBottom: '1px solid color-mix(in oklch, var(--color-base-100) 30%, transparent)' }}></div>;
              }

              const dayEvents = getEventsForDate(day);
              const isCurrentDay = isToday(day);

              return (
                <div
                  key={day.toISOString()}
                  className="h-32 p-2 cursor-pointer transition-colors"
                  style={{ 
                    borderRight: '1px solid color-mix(in oklch, var(--color-base-100) 30%, transparent)', 
                    borderBottom: '1px solid color-mix(in oklch, var(--color-base-100) 30%, transparent)',
                    background: isCurrentDay ? 'color-mix(in oklch, var(--color-primary) 8%, transparent)' : 'transparent'
                  }}
                  onClick={() => setSelectedDate(day)}
                >
                  <div className="text-sm font-medium mb-1" style={{ color: isCurrentDay ? 'var(--color-primary)' : 'var(--color-base-content)' }}>
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
                      <div className="text-xs" style={{ color: 'color-mix(in oklch, var(--color-base-content) 60%, transparent)' }}>
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
          <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-base-content)' }}>Upcoming Events</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.slice(0, 6).map(event => {
              const EventIcon = getEventIcon(event.type);
              return (
                <div key={event.id} className="rounded-xl p-6 shadow-sm abyss-card border-abyss hover:scale-[1.01] transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getEventColor(event.color)}`}>
                        <EventIcon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1" style={{ color: 'var(--color-base-content)' }}>{event.title}</h4>
                        <p className="text-sm line-clamp-2" style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>{event.description}</p>
                        <p className="text-xs mt-1" style={{ color: 'var(--color-primary)' }}>{event.course}</p>
                      </div>
                    </div>
                    <button className="p-1 border-abyss rounded" style={{ color: 'color-mix(in oklch, var(--color-base-content) 60%, transparent)' }}>
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-sm" style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(new Date(event.date))}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm" style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>
                      <Clock className="w-4 h-4" />
                      <span>{event.time} • {event.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm" style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm" style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>
                      <Users className="w-4 h-4" />
                      <span>{event.participants.join(', ')}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid color-mix(in oklch, var(--color-base-100) 30%, transparent)' }}>
                    <button className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors text-sm btn-abyss" style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', color: 'var(--color-accent-content)' }}>
                      <Eye className="w-4 h-4" />
                      <span>View</span>
                    </button>
                    <button className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors text-sm btn-abyss-outline">
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
            <div className="rounded-xl max-w-md w-full abyss-card border-abyss">
              <div className="flex items-center justify-between p-6" style={{ borderBottom: '1px solid color-mix(in oklch, var(--color-base-100) 30%, transparent)' }}>
                <h2 className="text-xl font-semibold" style={{ color: 'var(--color-base-content)' }}>Create Event</h2>
                <button 
                  onClick={() => setShowCreateEventModal(false)}
                  className="p-2 rounded-lg transition-colors" style={{ color: 'color-mix(in oklch, var(--color-base-content) 60%, transparent)' }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>Event Title</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 rounded-lg focus:ring-2"
                    style={{ border: '1px solid color-mix(in oklch, var(--color-base-100) 35%, transparent)', background: 'color-mix(in oklch, var(--color-base-300) 80%, transparent)', color: 'var(--color-base-content)', outlineColor: 'var(--color-primary)' }}
                    placeholder="Enter event title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>Event Type</label>
                  <select className="w-full px-3 py-2 rounded-lg focus:ring-2 border-abyss" style={{ background: 'color-mix(in oklch, var(--color-base-300) 80%, transparent)', color: 'var(--color-base-content)', outlineColor: 'var(--color-primary)' }}>
                    <option>Lecture</option>
                    <option>Office Hours</option>
                    <option>Grading Session</option>
                    <option>Faculty Meeting</option>
                    <option>Deadline</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>Course</label>
                  <select className="w-full px-3 py-2 rounded-lg focus:ring-2 border-abyss" style={{ background: 'color-mix(in oklch, var(--color-base-300) 80%, transparent)', color: 'var(--color-base-content)', outlineColor: 'var(--color-primary)' }}>
                    <option>Machine Learning Fundamentals</option>
                    <option>Python Programming</option>
                    <option>Data Structures & Algorithms</option>
                    <option>Web Development</option>
                    <option>Administrative</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 rounded-lg focus:ring-2"
                      style={{ border: '1px solid color-mix(in oklch, var(--color-base-100) 35%, transparent)', background: 'color-mix(in oklch, var(--color-base-300) 80%, transparent)', color: 'var(--color-base-content)', outlineColor: 'var(--color-primary)' }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>Time</label>
                    <input
                      type="time"
                      className="w-full px-3 py-2 rounded-lg focus:ring-2"
                      style={{ border: '1px solid color-mix(in oklch, var(--color-base-100) 35%, transparent)', background: 'color-mix(in oklch, var(--color-base-300) 80%, transparent)', color: 'var(--color-base-content)', outlineColor: 'var(--color-primary)' }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>Duration</label>
                  <select className="w-full px-3 py-2 rounded-lg focus:ring-2 border-abyss" style={{ background: 'color-mix(in oklch, var(--color-base-300) 80%, transparent)', color: 'var(--color-base-content)', outlineColor: 'var(--color-primary)' }}>
                    <option>30 minutes</option>
                    <option>1 hour</option>
                    <option>1.5 hours</option>
                    <option>2 hours</option>
                    <option>All day</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>Location</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 rounded-lg focus:ring-2"
                    style={{ border: '1px solid color-mix(in oklch, var(--color-base-100) 35%, transparent)', background: 'color-mix(in oklch, var(--color-base-300) 80%, transparent)', color: 'var(--color-base-content)', outlineColor: 'var(--color-primary)' }}
                    placeholder="Enter location"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>Description</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 rounded-lg focus:ring-2 resize-none"
                    style={{ border: '1px solid color-mix(in oklch, var(--color-base-100) 35%, transparent)', background: 'color-mix(in oklch, var(--color-base-300) 80%, transparent)', color: 'var(--color-base-content)', outlineColor: 'var(--color-primary)' }}
                    placeholder="Enter event description"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-3 p-6" style={{ borderTop: '1px solid color-mix(in oklch, var(--color-base-100) 30%, transparent)' }}>
                <button 
                  onClick={() => setShowCreateEventModal(false)}
                  className="px-4 py-2 rounded-lg transition-colors btn-abyss-outline"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 rounded-lg transition-colors btn-abyss" style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', color: 'var(--color-accent-content)' }}>
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
