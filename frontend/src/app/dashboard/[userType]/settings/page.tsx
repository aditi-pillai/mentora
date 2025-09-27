'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  GraduationCap,
  Calendar,
  Save,
  Edit,
  Check,
  X,
  Link as LinkIcon,
  Search,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Key,
  Bell,
  Shield,
  Globe,
  BookOpen,
  Users,
  Award,
  Settings as SettingsIcon,
  UserCheck,
  Building
} from 'lucide-react';

export default function SettingsPage() {
  const params = useParams();
  const userType = params.userType as 'student' | 'teacher' | 'institute';
  
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [instituteSearch, setInstituteSearch] = useState('');
  const [showInstituteModal, setShowInstituteModal] = useState(false);
  const [connectedInstitute, setConnectedInstitute] = useState<any>(null);

  useEffect(() => {
    // Load connected institute data or set default for demo
    const instituteData = localStorage.getItem('connectedInstitute');
    if (instituteData) {
      setConnectedInstitute(JSON.parse(instituteData));
    } else {
      // Set default institute connection for demo
      const defaultInstitute = userType === 'teacher' ? {
        id: 1,
        name: 'Tech University',
        location: 'San Francisco, CA',
        students: 15000,
        teachers: 1200,
        type: 'University',
        established: '1950',
        website: 'techuniversity.edu'
      } : {
        id: 1,
        name: 'Tech University',
        location: 'San Francisco, CA',
        students: 15000,
        teachers: 1200,
        type: 'University',
        established: '1950',
        website: 'techuniversity.edu'
      };
      setConnectedInstitute(defaultInstitute);
      localStorage.setItem('connectedInstitute', JSON.stringify(defaultInstitute));
    }
  }, [userType]);

  // Mock user data
  const [userData, setUserData] = useState({
    name: 'Dr. Sarah Chen',
    email: 'sarah.chen@university.edu',
    phone: '+1 (555) 123-4567',
    address: '123 University Ave, City, State 12345',
    bio: 'Experienced computer science professor with expertise in machine learning and artificial intelligence.',
    subjects: ['Machine Learning', 'Artificial Intelligence', 'Data Science'],
    experience: '8 years',
    education: 'PhD in Computer Science, Stanford University',
    joinDate: '2023-08-15',
    avatar: 'SC'
  });

  // Mock institutes data
  const institutes = [
    {
      id: 1,
      name: 'Tech University',
      location: 'San Francisco, CA',
      students: 15000,
      teachers: 1200,
      type: 'University',
      established: '1950',
      website: 'techuniversity.edu'
    },
    {
      id: 2,
      name: 'Data Science Academy',
      location: 'New York, NY',
      students: 5000,
      teachers: 350,
      type: 'Academy',
      established: '2010',
      website: 'datascienceacademy.com'
    },
    {
      id: 3,
      name: 'AI Institute',
      location: 'Boston, MA',
      students: 8000,
      teachers: 600,
      type: 'Research Institute',
      established: '2005',
      website: 'aiinstitute.org'
    }
  ];

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'institute', name: 'Institute', icon: Building2 },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'preferences', name: 'Preferences', icon: SettingsIcon }
  ];

  const handleSaveProfile = () => {
    setIsEditing(false);
    // In a real app, this would save to the backend
    console.log('Profile saved:', userData);
  };

  const handleConnectInstitute = (institute: any) => {
    setConnectedInstitute(institute);
    setShowInstituteModal(false);
    // In a real app, this would connect the teacher to the institute
    console.log('Connected to institute:', institute);
  };

  const handleDisconnectInstitute = () => {
    setConnectedInstitute(null);
    // In a real app, this would disconnect from the institute
    console.log('Disconnected from institute');
  };

  const filteredInstitutes = institutes.filter(institute =>
    institute.name.toLowerCase().includes(instituteSearch.toLowerCase()) ||
    institute.location.toLowerCase().includes(instituteSearch.toLowerCase())
  );

  return (
    <DashboardLayout userType={userType}>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      isEditing
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {isEditing ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Save</span>
                      </>
                    ) : (
                      <>
                        <Edit className="w-4 h-4" />
                        <span>Edit</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Profile Picture */}
                  <div className="md:col-span-2 flex items-center space-x-6">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-blue-600">{userData.avatar}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{userData.name}</h3>
                      <p className="text-gray-600">{userData.email}</p>
                      <p className="text-sm text-gray-500">Joined {userData.joinDate}</p>
                    </div>
                  </div>

                  {/* Basic Information */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={userData.name}
                        onChange={(e) => setUserData({...userData, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{userData.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={userData.email}
                        onChange={(e) => setUserData({...userData, email: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{userData.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={userData.phone}
                        onChange={(e) => setUserData({...userData, phone: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{userData.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={userData.experience}
                        onChange={(e) => setUserData({...userData, experience: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{userData.experience}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    {isEditing ? (
                      <textarea
                        rows={3}
                        value={userData.address}
                        onChange={(e) => setUserData({...userData, address: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                    ) : (
                      <p className="text-gray-900">{userData.address}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                    {isEditing ? (
                      <textarea
                        rows={4}
                        value={userData.bio}
                        onChange={(e) => setUserData({...userData, bio: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                    ) : (
                      <p className="text-gray-900">{userData.bio}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Education</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={userData.education}
                        onChange={(e) => setUserData({...userData, education: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{userData.education}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subjects</label>
                    <div className="flex flex-wrap gap-2">
                      {userData.subjects.map((subject, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Institute Tab */}
            {activeTab === 'institute' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Institute Connection</h2>
                  <button
                    onClick={() => setShowInstituteModal(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Connect Institute</span>
                  </button>
                </div>

                {connectedInstitute ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <Building className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-green-900">{connectedInstitute.name}</h3>
                          <p className="text-green-700 mb-2">{connectedInstitute.location}</p>
                          <div className="flex items-center space-x-4 text-sm text-green-600">
                            <span className="flex items-center space-x-1">
                              <Users className="w-4 h-4" />
                              <span>{connectedInstitute.students.toLocaleString()} students</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <GraduationCap className="w-4 h-4" />
                              <span>{connectedInstitute.teachers} teachers</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>Est. {connectedInstitute.established}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                          <UserCheck className="w-4 h-4" />
                        </button>
                        <button
                          onClick={handleDisconnectInstitute}
                          className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Institute Connected</h3>
                    <p className="text-gray-600 mb-6">Connect to an institute to access course management and student collaboration features.</p>
                    <button
                      onClick={() => setShowInstituteModal(true)}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Connect Institute
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Other tabs placeholder */}
            {(activeTab === 'security' || activeTab === 'notifications' || activeTab === 'preferences') && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 capitalize">{activeTab} Settings</h2>
                <div className="text-center py-12">
                  <SettingsIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{activeTab} Settings</h3>
                  <p className="text-gray-600">These settings will be available soon.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Institute Selection Modal */}
        {showInstituteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Connect to Institute</h2>
                <button 
                  onClick={() => setShowInstituteModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6">
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search institutes..."
                      value={instituteSearch}
                      onChange={(e) => setInstituteSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredInstitutes.map((institute) => (
                    <div key={institute.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-sm transition-all">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Building className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{institute.name}</h3>
                            <p className="text-sm text-gray-600">{institute.location}</p>
                            <p className="text-xs text-gray-500">{institute.type} • Est. {institute.established}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{institute.students.toLocaleString()}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <GraduationCap className="w-4 h-4" />
                            <span>{institute.teachers}</span>
                          </span>
                        </div>
                        <a href={`https://${institute.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 text-blue-600 hover:text-blue-800">
                          <Globe className="w-4 h-4" />
                          <span>Website</span>
                        </a>
                      </div>
                      
                      <button
                        onClick={() => handleConnectInstitute(institute)}
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Connect
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
