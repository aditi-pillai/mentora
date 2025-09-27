'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  GraduationCap,
  Search,
  Plus,
  BookOpen,
  FileText,
  Link,
  Download,
  Eye,
  Edit,
  Trash2,
  Star,
  Share,
  Filter,
  Calendar,
  User,
  Tag,
  MoreVertical,
  Brain,
  Target,
  Zap,
  Globe,
  Database,
  BarChart3
} from 'lucide-react';

export default function ResearchToolsPage() {
  const [activeTab, setActiveTab] = useState('papers');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddResourceModal, setShowAddResourceModal] = useState(false);

  // Mock research data
  const researchPapers = [
    {
      id: 1,
      title: 'Attention Is All You Need',
      authors: ['Vaswani, A.', 'Shazeer, N.', 'Parmar, N.'],
      journal: 'NeurIPS 2017',
      year: 2017,
      abstract: 'The dominant sequence transduction models are based on complex recurrent or convolutional neural networks...',
      keywords: ['Transformer', 'Attention', 'NLP', 'Deep Learning'],
      citations: 28450,
      url: 'https://arxiv.org/abs/1706.03762',
      status: 'saved',
      addedDate: '2024-01-20',
      notes: 'Foundational paper for modern NLP. Essential for understanding BERT, GPT models.'
    },
    {
      id: 2,
      title: 'BERT: Pre-training of Deep Bidirectional Transformers',
      authors: ['Devlin, J.', 'Chang, M.', 'Lee, K.'],
      journal: 'NAACL 2019',
      year: 2019,
      abstract: 'We introduce a new language representation model called BERT...',
      keywords: ['BERT', 'Transformer', 'Pre-training', 'NLP'],
      citations: 15230,
      url: 'https://arxiv.org/abs/1810.04805',
      status: 'saved',
      addedDate: '2024-01-18',
      notes: 'Revolutionary paper that changed NLP. Good for teaching bidirectional context.'
    }
  ];

  const datasets = [
    {
      id: 1,
      name: 'ImageNet',
      description: 'Large-scale image database for visual recognition research',
      size: '150GB',
      samples: '14M images',
      categories: 1000,
      license: 'Research Use',
      url: 'https://image-net.org/',
      addedDate: '2024-01-15',
      status: 'saved'
    },
    {
      id: 2,
      name: 'COCO Dataset',
      description: 'Common Objects in Context dataset for object detection and segmentation',
      size: '25GB',
      samples: '330K images',
      categories: 80,
      license: 'CC BY 4.0',
      url: 'https://cocodataset.org/',
      addedDate: '2024-01-12',
      status: 'saved'
    }
  ];

  const tools = [
    {
      id: 1,
      name: 'TensorBoard',
      description: 'Visualization toolkit for machine learning experiments',
      category: 'Visualization',
      url: 'https://tensorflow.org/tensorboard',
      addedDate: '2024-01-10',
      status: 'saved'
    },
    {
      id: 2,
      name: 'Weights & Biases',
      description: 'Experiment tracking and model management platform',
      category: 'MLOps',
      url: 'https://wandb.ai/',
      addedDate: '2024-01-08',
      status: 'saved'
    }
  ];

  const tabs = [
    { id: 'papers', name: 'Research Papers', icon: BookOpen },
    { id: 'datasets', name: 'Datasets', icon: Database },
    { id: 'tools', name: 'Tools', icon: Brain },
    { id: 'bookmarks', name: 'Bookmarks', icon: Star }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <DashboardLayout userType="teacher">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Research Tools</h1>
              <p className="text-gray-600 mt-2">Manage your research resources and stay updated with latest developments</p>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setShowAddResourceModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Resource</span>
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

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search research resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {activeTab === 'papers' && (
            <div className="space-y-6">
              {researchPapers.map((paper) => (
                <div key={paper.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{paper.title}</h3>
                      <p className="text-gray-600 mb-2">
                        {paper.authors.join(', ')} • {paper.journal} ({paper.year})
                      </p>
                      <p className="text-gray-700 mb-4 line-clamp-2">{paper.abstract}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {paper.keywords.map((keyword, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        {paper.status}
                      </span>
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-gray-900">{paper.citations.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Citations</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-gray-900">{paper.year}</div>
                      <div className="text-sm text-gray-600">Published</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-gray-900">{formatDate(paper.addedDate)}</div>
                      <div className="text-sm text-gray-600">Added</div>
                    </div>
                  </div>

                  {paper.notes && (
                    <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm text-gray-700">
                        <strong>Notes:</strong> {paper.notes}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-3">
                      <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <Eye className="w-4 h-4" />
                        <span>View Paper</span>
                      </button>
                      <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <Star className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <Share className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'datasets' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {datasets.map((dataset) => (
                <div key={dataset.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{dataset.name}</h3>
                      <p className="text-gray-600 mb-4">{dataset.description}</p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      {dataset.status}
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Size:</span>
                      <span className="font-medium">{dataset.size}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Samples:</span>
                      <span className="font-medium">{dataset.samples}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Categories:</span>
                      <span className="font-medium">{dataset.categories}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">License:</span>
                      <span className="font-medium">{dataset.license}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Added:</span>
                      <span className="font-medium">{formatDate(dataset.addedDate)}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <Eye className="w-4 h-4" />
                      <span>View Dataset</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'tools' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool) => (
                <div key={tool.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{tool.name}</h3>
                      <p className="text-gray-600 mb-2">{tool.description}</p>
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
                        {tool.category}
                      </span>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      {tool.status}
                    </span>
                  </div>

                  <div className="text-sm text-gray-600 mb-4">
                    Added: {formatDate(tool.addedDate)}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <Globe className="w-4 h-4" />
                      <span>Visit</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      <Star className="w-4 h-4" />
                      <span>Bookmark</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'bookmarks' && (
            <div className="text-center py-12">
              <Star className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Bookmarks Yet</h3>
              <p className="text-gray-600">Bookmark your favorite research resources to access them quickly</p>
            </div>
          )}
        </div>

        {/* Add Resource Modal */}
        {showAddResourceModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Add Research Resource</h2>
                <button 
                  onClick={() => setShowAddResourceModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Resource Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="paper">Research Paper</option>
                    <option value="dataset">Dataset</option>
                    <option value="tool">Tool</option>
                    <option value="book">Book</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title/Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter title or name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">URL</label>
                  <input
                    type="url"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter URL"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Enter description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter tags separated by commas"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
                <button 
                  onClick={() => setShowAddResourceModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Add Resource
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
