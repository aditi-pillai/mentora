'use client';

import { ReactNode } from 'react';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
  userType: 'student' | 'teacher' | 'institute';
}

export default function DashboardLayout({ children, userType }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userType={userType} />
      <main className="flex-1 overflow-auto">
        <div className="h-full">
          {children}
        </div>
      </main>
    </div>
  );
}
