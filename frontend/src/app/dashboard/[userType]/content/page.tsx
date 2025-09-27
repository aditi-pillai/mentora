'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  FileText, 
  Video, 
  Link as LinkIcon, 
  FileImage,
  Download,
  Eye,
  Star,
  MoreVertical,
  Calendar,
  Tag
} from 'lucide-react';

export default function ContentLibraryPage() {
  const params = useParams();
  const userType = params.userType as 'student' | 'teacher' | 'institute';
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Content', count: 28 },
    { id: 'pdf', label: 'PDFs', count: 12 },
    { id: 'video', label: 'Videos', count: 8 },
    { id: 'links', label: 'Links', count: 5 },
    { id: 'images', label: 'Images', count: 3 },
  ];

  const contentItems = [
    {
      id: 1,
      title: 'Machine Learning Fundamentals',
      type: 'pdf',
      size: '2.4 MB',
      uploadDate: '2024-01-15',
      tags: ['AI', 'ML', 'Basics'],
      description: 'Comprehensive guide to machine learning concepts and algorithms',
      isStarred: true,
      views: 156,
      downloads: 23
    },
    {
      id: 2,
      title: 'Deep Learning with Neural Networks',
      type: 'video',
      size: '45.2 MB',
      uploadDate: '2024-01-14',
      tags: ['Deep Learning', 'Neural Networks'],
      description: 'Complete tutorial on building and training neural networks',
      isStarred: false,
      views: 89,
      downloads: 12
    },
    {
      id: 3,
      title: 'Python Data Science Tutorial',
      type: 'link',
      size: 'N/A',
      uploadDate: '2024-01-13',
      tags: ['Python', 'Data Science'],
      description: 'YouTube tutorial covering pandas, numpy, and matplotlib',
      isStarred: true,
      views: 234,
      downloads: 0
    },
    {
      id: 4,
      title: 'Statistics and Probability',
      type: 'pdf',
      size: '1.8 MB',
      uploadDate: '2024-01-12',
      tags: ['Statistics', 'Math'],
      description: 'Essential statistical concepts for data analysis',
      isStarred: false,
      views: 78,
      downloads: 15
    },
    {
      id: 5,
      title: 'Data Visualization Examples',
      type: 'image',
      size: '3.2 MB',
      uploadDate: '2024-01-11',
      tags: ['Visualization', 'Charts'],
      description: 'Collection of effective data visualization techniques',
      isStarred: false,
      views: 45,
      downloads: 8
    },
    {
      id: 6,
      title: 'Advanced AI Research Papers',
      type: 'pdf',
      size: '4.1 MB',
      uploadDate: '2024-01-10',
      tags: ['Research', 'AI', 'Papers'],
      description: 'Latest research papers on artificial intelligence',
      isStarred: true,
      views: 67,
      downloads: 19
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf': return FileText;
      case 'video': return Video;
      case 'link': return LinkIcon;
      case 'image': return FileImage;
      default: return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'pdf': return 'text-red-600 bg-red-100';
      case 'video': return 'text-purple-600 bg-purple-100';
      case 'link': return 'text-blue-600 bg-blue-100';
      case 'image': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredContent = contentItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || item.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <DashboardLayout userType={userType}>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Content Library</h1>
          <p className="text-gray-600">Organize and access all your study materials</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search content..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Category Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.label} ({category.count})
                    </option>
                  ))}
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid/List */}
        {filteredContent.length === 0 ? (
          <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-200 text-center">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No content found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Upload Content
            </button>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'space-y-4'
          }>
            {filteredContent.map((item) => {
              const TypeIcon = getTypeIcon(item.type);
              const typeColor = getTypeColor(item.type);
              
              return viewMode === 'grid' ? (
                <div key={item.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-2 rounded-lg ${typeColor}`}>
                      <TypeIcon className="w-6 h-6" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Star className={`w-4 h-4 ${item.isStarred ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>

                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{item.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                    {item.tags.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{item.tags.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{item.size}</span>
                    <span>{item.uploadDate}</span>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{item.views}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Download className="w-4 h-4" />
                        <span>{item.downloads}</span>
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <a
                        href={`/dashboard/${userType}/content/${item.id}`}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </a>
                      <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${typeColor}`}>
                      <TypeIcon className="w-6 h-6" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{item.uploadDate}</span>
                            </span>
                            <span>{item.size}</span>
                            <span className="flex items-center space-x-1">
                              <Eye className="w-4 h-4" />
                              <span>{item.views} views</span>
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 ml-4">
                          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                            <Star className={`w-4 h-4 ${item.isStarred ? 'text-yellow-500 fill-current' : ''}`} />
                          </button>
                          <a
                            href={`/dashboard/${userType}/content/${item.id}`}
                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </a>
                          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                            <Download className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
