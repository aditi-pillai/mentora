'use client';

import { useState } from 'react';
import { 
  Brain, 
  BookOpen, 
  FileText, 
  MessageSquare, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut,
  Menu,
  X,
  Upload,
  HelpCircle,
  Calendar,
  Award,
  GraduationCap,
  Building2,
  User,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  userType: 'student' | 'teacher' | 'institute';
}

export default function Sidebar({ userType }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const getNavigationItems = () => {
    const baseItems = [
      { name: 'AI Chat', href: `/dashboard/${userType}/chat`, icon: MessageSquare },
      { name: 'Content Library', href: `/dashboard/${userType}/content`, icon: BookOpen },
      { name: 'Upload Content', href: `/dashboard/${userType}/upload`, icon: Upload },
    ];

    if (userType === 'student') {
      return [
        ...baseItems,
        { name: 'Study Guides', href: `/dashboard/${userType}/guides`, icon: FileText },
        { name: 'Quizzes', href: `/dashboard/${userType}/quizzes`, icon: HelpCircle },
        { name: 'Study Groups', href: `/dashboard/${userType}/groups`, icon: Users },
        { name: 'Collaboration', href: `/dashboard/${userType}/collaboration`, icon: MessageSquare },
        { name: 'Progress', href: `/dashboard/${userType}/progress`, icon: BarChart3 },
        { name: 'Calendar', href: `/dashboard/${userType}/calendar`, icon: Calendar },
      ];
    } else if (userType === 'teacher') {
      return [
        ...baseItems,
        { name: 'Quizzes', href: `/dashboard/${userType}/quizzes`, icon: HelpCircle },
        { name: 'Quiz Generator', href: `/dashboard/${userType}/quiz-generator`, icon: Brain },
        { name: 'Students', href: `/dashboard/${userType}/students`, icon: User },
        { name: 'Assignments', href: `/dashboard/${userType}/assignments`, icon: FileText },
        { name: 'Analytics', href: `/dashboard/${userType}/analytics`, icon: BarChart3 },
        { name: 'Research Tools', href: `/dashboard/${userType}/research`, icon: GraduationCap },
        { name: 'Calendar', href: `/dashboard/${userType}/calendar`, icon: Calendar },
      ];
    } else {
      return [
        ...baseItems,
        { name: 'Courses', href: `/dashboard/${userType}/courses`, icon: BookOpen },
        { name: 'Teachers', href: `/dashboard/${userType}/teachers`, icon: GraduationCap },
        { name: 'Students', href: `/dashboard/${userType}/students`, icon: User },
        { name: 'Assignments', href: `/dashboard/${userType}/assignments`, icon: FileText },
        { name: 'Analytics', href: `/dashboard/${userType}/analytics`, icon: BarChart3 },
        { name: 'Reports', href: `/dashboard/${userType}/reports`, icon: Award },
      ];
    }
  };

  const getUserIcon = () => {
    switch (userType) {
      case 'student': return User;
      case 'teacher': return GraduationCap;
      case 'institute': return Building2;
      default: return User;
    }
  };

  const getUserTypeDisplay = () => {
    switch (userType) {
      case 'student': return 'Student';
      case 'teacher': return 'Teacher';
      case 'institute': return 'Institute';
      default: return 'User';
    }
  };

  const navigationItems = getNavigationItems();
  const UserIcon = getUserIcon();

  return (
    <div className={`bg-white border-r border-gray-200 h-full transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Mentora</span>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-gray-200">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <UserIcon className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <div className="font-semibold text-gray-900">Demo User</div>
              <div className="text-sm text-gray-500">{getUserTypeDisplay()}</div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  } ${isCollapsed ? 'justify-center' : ''}`}
                  title={isCollapsed ? item.name : undefined}
                >
                  <item.icon className={`w-5 h-5 ${isCollapsed ? '' : 'mr-3'}`} />
                  {!isCollapsed && (
                    <>
                      <span className="font-medium">{item.name}</span>
                      {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                    </>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <Link
          href={`/dashboard/${userType}/settings`}
          className={`flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors ${
            isCollapsed ? 'justify-center' : ''
          }`}
          title={isCollapsed ? 'Settings' : undefined}
        >
          <Settings className={`w-5 h-5 ${isCollapsed ? '' : 'mr-3'}`} />
          {!isCollapsed && <span>Settings</span>}
        </Link>
        
        <Link
          href="/"
          className={`flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors ${
            isCollapsed ? 'justify-center' : ''
          }`}
          title={isCollapsed ? 'Logout' : undefined}
        >
          <LogOut className={`w-5 h-5 ${isCollapsed ? '' : 'mr-3'}`} />
          {!isCollapsed && <span>Logout</span>}
        </Link>
      </div>
    </div>
  );
}
