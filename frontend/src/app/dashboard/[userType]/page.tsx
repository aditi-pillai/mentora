'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';

export default function DashboardPage() {
  const params = useParams();
  const userType = params.userType as 'student' | 'teacher' | 'institute';
  const [userEmail, setUserEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      setUserEmail(email);
    }
    // Redirect to chat interface as default
    router.push(`/dashboard/${userType}/chat`);
  }, [userType, router]);

  // Show loading while redirecting
  return (
    <DashboardLayout userType={userType}>
      <div className="p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Redirecting to AI Chat...</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
