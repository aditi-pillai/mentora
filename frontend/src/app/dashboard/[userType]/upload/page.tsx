'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  Upload, 
  FileText, 
  Video, 
  Link as LinkIcon, 
  FileImage, 
  CheckCircle,
  X,
  Plus,
  Brain
} from 'lucide-react';

export default function UploadPage() {
  const params = useParams();
  const userType = params.userType as 'student' | 'teacher' | 'institute';
  
  const [uploadType, setUploadType] = useState<'pdf' | 'video' | 'link' | 'image'>('pdf');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<Array<{
    id: string;
    name: string;
    type: string;
    size: string;
    status: 'uploading' | 'processing' | 'completed' | 'error';
  }>>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const fileId = Math.random().toString(36).substr(2, 9);
      const newFile = {
        id: fileId,
        name: file.name,
        type: file.type,
        size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
        status: 'uploading' as const
      };

      setUploadedFiles(prev => [...prev, newFile]);

      // Simulate upload process
      setTimeout(() => {
        setUploadedFiles(prev => 
          prev.map(f => f.id === fileId ? { ...f, status: 'processing' } : f)
        );
      }, 2000);

      setTimeout(() => {
        setUploadedFiles(prev => 
          prev.map(f => f.id === fileId ? { ...f, status: 'completed' } : f)
        );
      }, 5000);
    });
  };

  const handleYouTubeLink = () => {
    const url = prompt('Enter YouTube URL:');
    if (url) {
      const fileId = Math.random().toString(36).substr(2, 9);
      const newFile = {
        id: fileId,
        name: `YouTube Video: ${url.split('v=')[1] || 'Unknown'}`,
        type: 'video/youtube',
        size: 'N/A',
        status: 'uploading' as const
      };

      setUploadedFiles(prev => [...prev, newFile]);

      setTimeout(() => {
        setUploadedFiles(prev => 
          prev.map(f => f.id === fileId ? { ...f, status: 'completed' } : f)
        );
      }, 3000);
    }
  };

  const getUploadTypeConfig = () => {
    switch (uploadType) {
      case 'pdf':
        return {
          title: 'Upload PDF Documents',
          description: 'Upload textbooks, research papers, lecture notes, and other PDF documents',
          icon: FileText,
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          accept: '.pdf',
          multiple: true
        };
      case 'video':
        return {
          title: 'Upload Video Files',
          description: 'Upload lecture recordings, tutorials, and educational videos',
          icon: Video,
          color: 'text-purple-600',
          bgColor: 'bg-purple-50',
          accept: 'video/*',
          multiple: true
        };
      case 'link':
        return {
          title: 'Add Web Links',
          description: 'Add YouTube videos, articles, and online resources',
          icon: LinkIcon,
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          accept: '',
          multiple: false
        };
      case 'image':
        return {
          title: 'Upload Images',
          description: 'Upload diagrams, charts, slides, and visual content',
          icon: FileImage,
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          accept: 'image/*',
          multiple: true
        };
    }
  };

  const config = getUploadTypeConfig();

  return (
    <DashboardLayout userType={userType}>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Content</h1>
          <p className="text-gray-600">Add study materials, lectures, and resources to your library</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload Options */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              {/* Upload Type Selector */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { id: 'pdf', label: 'PDF', icon: FileText },
                  { id: 'video', label: 'Video', icon: Video },
                  { id: 'link', label: 'Links', icon: LinkIcon },
                  { id: 'image', label: 'Images', icon: FileImage }
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setUploadType(type.id as any)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      uploadType === type.id
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-600'
                    }`}
                  >
                    <type.icon className="w-6 h-6 mx-auto mb-2" />
                    <span className="text-sm font-medium">{type.label}</span>
                  </button>
                ))}
              </div>

              {/* Upload Area */}
              <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                uploadType === 'link' ? 'border-gray-300' : 'border-gray-300 hover:border-gray-400'
              }`}>
                <div className={`w-16 h-16 ${config.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <config.icon className={`w-8 h-8 ${config.color}`} />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{config.title}</h3>
                <p className="text-gray-600 mb-6">{config.description}</p>

                {uploadType === 'link' ? (
                  <button
                    onClick={handleYouTubeLink}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Add YouTube Link
                  </button>
                ) : (
                  <div>
                    <input
                      type="file"
                      accept={config.accept}
                      multiple={config.multiple}
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer inline-block"
                    >
                      Choose Files
                    </label>
                    <p className="text-sm text-gray-500 mt-2">
                      {config.multiple ? 'Select multiple files' : 'Select a file'}
                    </p>
                  </div>
                )}
              </div>

              {/* AI Processing Info */}
              <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <Brain className="w-5 h-5 text-blue-600" />
                  <div>
                    <h4 className="font-semibold text-gray-900">AI Processing</h4>
                    <p className="text-sm text-gray-600">
                      Your content will be automatically processed to extract key information, 
                      generate summaries, and create searchable knowledge.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Upload History */}
          <div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Uploads</h2>
              
              {uploadedFiles.length === 0 ? (
                <div className="text-center py-8">
                  <Upload className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No files uploaded yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {uploadedFiles.map((file) => (
                    <div key={file.id} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200">
                      <div className="flex-shrink-0">
                        {file.status === 'completed' ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : file.status === 'error' ? (
                          <X className="w-5 h-5 text-red-500" />
                        ) : (
                          <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                        <p className="text-xs text-gray-500">{file.size}</p>
                      </div>
                      <div className="text-xs text-gray-500">
                        {file.status === 'uploading' && 'Uploading...'}
                        {file.status === 'processing' && 'Processing...'}
                        {file.status === 'completed' && 'Ready'}
                        {file.status === 'error' && 'Error'}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Tips */}
            <div className="mt-6 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">Quick Tips</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start space-x-2">
                  <Plus className="w-4 h-4 text-blue-500 mt-0.5" />
                  <span>Upload related files together for better AI processing</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Plus className="w-4 h-4 text-blue-500 mt-0.5" />
                  <span>Use descriptive filenames for easier organization</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Plus className="w-4 h-4 text-blue-500 mt-0.5" />
                  <span>YouTube links are automatically transcribed and analyzed</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
