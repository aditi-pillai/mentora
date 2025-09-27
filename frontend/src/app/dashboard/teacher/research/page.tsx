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
  BarChart3,
  X
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
              <h1 className="text-3xl font-bold" style={{ color: 'var(--color-base-content)' }}>Research Tools</h1>
              <p className="mt-2" style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>Manage your research resources and stay updated with latest developments</p>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setShowAddResourceModal(true)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors btn-abyss"
                style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', color: 'var(--color-accent-content)' }}
              >
                <Plus className="w-4 h-4" />
                <span>Add Resource</span>
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="" style={{ borderBottom: '1px solid color-mix(in oklch, var(--color-base-100) 30%, transparent)' }}>
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-3 px-3 font-medium text-sm transition-colors border-abyss rounded-t-lg`}
                    style={{ color: activeTab === tab.id ? 'var(--color-primary)' : 'color-mix(in oklch, var(--color-base-content) 65%, transparent)', background: activeTab === tab.id ? 'color-mix(in oklch, var(--color-primary) 12%, transparent)' : 'transparent' }}
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
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: 'color-mix(in oklch, var(--color-base-content) 60%, transparent)' }} />
            <input
              type="text"
              placeholder="Search research resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg focus:ring-2"
              style={{ border: '1px solid color-mix(in oklch, var(--color-base-100) 35%, transparent)', background: 'color-mix(in oklch, var(--color-base-300) 80%, transparent)', color: 'var(--color-base-content)', outlineColor: 'var(--color-primary)' }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {activeTab === 'papers' && (
            <div className="space-y-6">
              {researchPapers.map((paper) => (
                <div key={paper.id} className="rounded-xl p-6 shadow-sm abyss-card border-abyss hover:scale-[1.01] transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-base-content)' }}>{paper.title}</h3>
                      <p className="mb-2" style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>
                        {paper.authors.join(', ')} • {paper.journal} ({paper.year})
                      </p>
                      <p className="mb-4 line-clamp-2" style={{ color: 'color-mix(in oklch, var(--color-base-content) 80%, transparent)' }}>{paper.abstract}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {paper.keywords.map((keyword, index) => (
                          <span key={index} className="px-2 py-1 rounded text-xs border-abyss" style={{ background: 'color-mix(in oklch, var(--color-primary) 15%, transparent)', color: 'var(--color-primary)' }}>
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 rounded-full text-xs font-medium border-abyss" style={{ color: 'var(--color-success)', background: 'color-mix(in oklch, var(--color-success) 15%, transparent)' }}>
                        {paper.status}
                      </span>
                      <button className="p-1 border-abyss rounded" style={{ color: 'color-mix(in oklch, var(--color-base-content) 60%, transparent)' }}>
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-3 rounded-lg border-abyss" style={{ background: 'color-mix(in oklch, var(--color-base-100) 20%, transparent)' }}>
                      <div className="text-lg font-bold" style={{ color: 'var(--color-base-content)' }}>{paper.citations.toLocaleString()}</div>
                      <div className="text-sm" style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>Citations</div>
                    </div>
                    <div className="text-center p-3 rounded-lg border-abyss" style={{ background: 'color-mix(in oklch, var(--color-base-100) 20%, transparent)' }}>
                      <div className="text-lg font-bold" style={{ color: 'var(--color-base-content)' }}>{paper.year}</div>
                      <div className="text-sm" style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>Published</div>
                    </div>
                    <div className="text-center p-3 rounded-lg border-abyss" style={{ background: 'color-mix(in oklch, var(--color-base-100) 20%, transparent)' }}>
                      <div className="text-lg font-bold" style={{ color: 'var(--color-base-content)' }}>{formatDate(paper.addedDate)}</div>
                      <div className="text-sm" style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>Added</div>
                    </div>
                  </div>

                  {paper.notes && (
                    <div className="mb-4 p-3 rounded-lg border-abyss" style={{ background: 'color-mix(in oklch, var(--color-warning) 10%, transparent)' }}>
                      <p className="text-sm" style={{ color: 'color-mix(in oklch, var(--color-base-content) 80%, transparent)' }}>
                        <strong>Notes:</strong> {paper.notes}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid color-mix(in oklch, var(--color-base-100) 30%, transparent)' }}>
                    <div className="flex items-center space-x-3">
                      <button className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors btn-abyss" style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', color: 'var(--color-accent-content)' }}>
                        <Eye className="w-4 h-4" />
                        <span>View Paper</span>
                      </button>
                      <button className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors btn-abyss-outline">
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 rounded-lg transition-colors border-abyss" style={{ color: 'color-mix(in oklch, var(--color-base-content) 60%, transparent)' }}>
                        <Star className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg transition-colors border-abyss" style={{ color: 'color-mix(in oklch, var(--color-base-content) 60%, transparent)' }}>
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
                <div key={dataset.id} className="rounded-xl p-6 shadow-sm abyss-card border-abyss hover:scale-[1.01] transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-base-content)' }}>{dataset.name}</h3>
                      <p className="mb-4" style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>{dataset.description}</p>
                    </div>
                    <span className="px-2 py-1 rounded-full text-xs font-medium border-abyss" style={{ color: 'var(--color-success)', background: 'color-mix(in oklch, var(--color-success) 15%, transparent)' }}>
                      {dataset.status}
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>Size:</span>
                      <span className="font-medium">{dataset.size}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>Samples:</span>
                      <span className="font-medium">{dataset.samples}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>Categories:</span>
                      <span className="font-medium">{dataset.categories}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>License:</span>
                      <span className="font-medium">{dataset.license}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>Added:</span>
                      <span className="font-medium">{formatDate(dataset.addedDate)}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid color-mix(in oklch, var(--color-base-100) 30%, transparent)' }}>
                    <button className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors btn-abyss" style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', color: 'var(--color-accent-content)' }}>
                      <Eye className="w-4 h-4" />
                      <span>View Dataset</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors btn-abyss-outline">
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
                <div key={tool.id} className="rounded-xl p-6 shadow-sm abyss-card border-abyss hover:scale-[1.01] transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-base-content)' }}>{tool.name}</h3>
                      <p className="mb-2" style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>{tool.description}</p>
                      <span className="px-2 py-1 rounded text-xs border-abyss" style={{ background: 'color-mix(in oklch, var(--color-secondary) 15%, transparent)', color: 'var(--color-secondary)' }}>
                        {tool.category}
                      </span>
                    </div>
                    <span className="px-2 py-1 rounded-full text-xs font-medium border-abyss" style={{ color: 'var(--color-success)', background: 'color-mix(in oklch, var(--color-success) 15%, transparent)' }}>
                      {tool.status}
                    </span>
                  </div>

                  <div className="text-sm mb-4" style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>
                    Added: {formatDate(tool.addedDate)}
                  </div>

                  <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid color-mix(in oklch, var(--color-base-100) 30%, transparent)' }}>
                    <button className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors btn-abyss" style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', color: 'var(--color-accent-content)' }}>
                      <Globe className="w-4 h-4" />
                      <span>Visit</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors btn-abyss-outline">
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
              <Star className="w-16 h-16 mx-auto mb-4" style={{ color: 'color-mix(in oklch, var(--color-base-content) 50%, transparent)' }} />
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-base-content)' }}>No Bookmarks Yet</h3>
              <p style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>Bookmark your favorite research resources to access them quickly</p>
            </div>
          )}
        </div>

        {/* Add Resource Modal */}
        {showAddResourceModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="rounded-xl max-w-md w-full abyss-card border-abyss">
              <div className="flex items-center justify-between p-6" style={{ borderBottom: '1px solid color-mix(in oklch, var(--color-base-100) 30%, transparent)' }}>
                <h2 className="text-xl font-semibold" style={{ color: 'var(--color-base-content)' }}>Add Research Resource</h2>
                <button 
                  onClick={() => setShowAddResourceModal(false)}
                  className="p-2 rounded-lg transition-colors" style={{ color: 'color-mix(in oklch, var(--color-base-content) 60%, transparent)' }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>Resource Type</label>
                  <select className="w-full px-3 py-2 rounded-lg focus:ring-2 border-abyss" style={{ background: 'color-mix(in oklch, var(--color-base-300) 80%, transparent)', color: 'var(--color-base-content)', outlineColor: 'var(--color-primary)' }}>
                    <option value="paper">Research Paper</option>
                    <option value="dataset">Dataset</option>
                    <option value="tool">Tool</option>
                    <option value="book">Book</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>Title/Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 rounded-lg focus:ring-2"
                    style={{ border: '1px solid color-mix(in oklch, var(--color-base-100) 35%, transparent)', background: 'color-mix(in oklch, var(--color-base-300) 80%, transparent)', color: 'var(--color-base-content)', outlineColor: 'var(--color-primary)' }}
                    placeholder="Enter title or name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>URL</label>
                  <input
                    type="url"
                    className="w-full px-3 py-2 rounded-lg focus:ring-2"
                    style={{ border: '1px solid color-mix(in oklch, var(--color-base-100) 35%, transparent)', background: 'color-mix(in oklch, var(--color-base-300) 80%, transparent)', color: 'var(--color-base-content)', outlineColor: 'var(--color-primary)' }}
                    placeholder="Enter URL"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>Description</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 rounded-lg focus:ring-2 resize-none"
                    style={{ border: '1px solid color-mix(in oklch, var(--color-base-100) 35%, transparent)', background: 'color-mix(in oklch, var(--color-base-300) 80%, transparent)', color: 'var(--color-base-content)', outlineColor: 'var(--color-primary)' }}
                    placeholder="Enter description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'color-mix(in oklch, var(--color-base-content) 70%, transparent)' }}>Tags</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 rounded-lg focus:ring-2"
                    style={{ border: '1px solid color-mix(in oklch, var(--color-base-100) 35%, transparent)', background: 'color-mix(in oklch, var(--color-base-300) 80%, transparent)', color: 'var(--color-base-content)', outlineColor: 'var(--color-primary)' }}
                    placeholder="Enter tags separated by commas"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-3 p-6" style={{ borderTop: '1px solid color-mix(in oklch, var(--color-base-100) 30%, transparent)' }}>
                <button 
                  onClick={() => setShowAddResourceModal(false)}
                  className="px-4 py-2 rounded-lg transition-colors btn-abyss-outline"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 rounded-lg transition-colors btn-abyss" style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', color: 'var(--color-accent-content)' }}>
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
