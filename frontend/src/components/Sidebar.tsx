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
    ];

    if (userType === 'student') {
      return [
        ...baseItems,
        { name: 'Courses', href: `/dashboard/${userType}/courses`, icon: BookOpen },
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
        { name: 'My Courses', href: `/dashboard/${userType}/courses`, icon: BookOpen },
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
    <div
      className={`h-full transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}
      style={{
        background: 'var(--color-base-200)',
        borderRight: '1px solid color-mix(in oklch, var(--color-base-100) 30%, transparent)'
      }}
    >
      {/* Header */}
      <div className="p-4" style={{ borderBottom: '1px solid color-mix(in oklch, var(--color-base-100) 30%, transparent)' }}>
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}>
                <Brain className="w-5 h-5" style={{ color: 'var(--color-accent-content)' }} />
              </div>
              <span className="text-xl font-bold" style={{ color: 'var(--color-base-content)' }}>Mentora</span>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg transition-colors"
            style={{ color: 'var(--color-base-content)', background: 'transparent' }}
          >
            {isCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4" style={{ borderBottom: '1px solid color-mix(in oklch, var(--color-base-100) 30%, transparent)' }}>
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}>
            <UserIcon className="w-5 h-5" style={{ color: 'var(--color-accent-content)' }} />
          </div>
          {!isCollapsed && (
            <div>
              <div className="font-semibold" style={{ color: 'var(--color-base-content)' }}>Demo User</div>
              <div className="text-sm" style={{ color: 'color-mix(in oklch, var(--color-base-content) 65%, transparent)' }}>{getUserTypeDisplay()}</div>
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
                  className={`flex items-center px-3 py-2 rounded-lg transition-all ${isCollapsed ? 'justify-center' : ''}`}
                  style={{
                    color: isActive ? 'var(--color-primary-content)' : 'color-mix(in oklch, var(--color-base-content) 80%, transparent)',
                    background: isActive ? 'color-mix(in oklch, var(--color-base-100) 30%, transparent)' : 'transparent',
                    borderRight: isActive ? '2px solid var(--color-primary)' : '2px solid transparent',
                    border: isActive ? '1px solid color-mix(in oklch, var(--color-primary) 35%, transparent)' : '1px solid transparent'
                  }}
                  title={isCollapsed ? item.name : undefined}
                >
                  <item.icon className={`w-5 h-5 ${isCollapsed ? '' : 'mr-3'}`} />
                  {!isCollapsed && (
                    <>
                      <span className="font-medium" style={{ color: 'inherit' }}>{item.name}</span>
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
      <div className="p-4 space-y-2" style={{ borderTop: '1px solid color-mix(in oklch, var(--color-base-100) 30%, transparent)' }}>
        <Link
          href={`/dashboard/${userType}/settings`}
          className={`flex items-center px-3 py-2 rounded-lg transition-colors ${isCollapsed ? 'justify-center' : ''}`}
          style={{
            color: pathname === `/dashboard/${userType}/settings` ? 'var(--color-primary-content)' : 'color-mix(in oklch, var(--color-base-content) 80%, transparent)',
            background: pathname === `/dashboard/${userType}/settings` ? 'color-mix(in oklch, var(--color-base-100) 30%, transparent)' : 'transparent',
            borderRight: pathname === `/dashboard/${userType}/settings` ? '2px solid var(--color-primary)' : '2px solid transparent',
            border: pathname === `/dashboard/${userType}/settings` ? '1px solid color-mix(in oklch, var(--color-primary) 35%, transparent)' : '1px solid transparent'
          }}
          title={isCollapsed ? 'Settings' : undefined}
        >
          <Settings className={`w-5 h-5 ${isCollapsed ? '' : 'mr-3'}`} />
          {!isCollapsed && <span>Settings</span>}
        </Link>
        
        <Link
          href="/"
          className={`flex items-center px-3 py-2 rounded-lg transition-colors ${isCollapsed ? 'justify-center' : ''}`}
          style={{ color: 'color-mix(in oklch, var(--color-base-content) 80%, transparent)' }}
          title={isCollapsed ? 'Logout' : undefined}
        >
          <LogOut className={`w-5 h-5 ${isCollapsed ? '' : 'mr-3'}`} />
          {!isCollapsed && <span>Logout</span>}
        </Link>
      </div>
    </div>
  );
}
