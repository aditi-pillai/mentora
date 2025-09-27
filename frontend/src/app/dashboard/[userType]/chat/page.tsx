'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  Send,
  Brain,
  Upload,
  FileText,
  Video,
  Link as LinkIcon,
  File,
  PlayCircle,
  Plus,
  X,
  MessageSquare,
  BookOpen,
  HelpCircle,
  Image as ImageIcon,
  Globe,
  ChevronDown,
  Star,
  History,
  Settings
} from 'lucide-react';

export default function ChatPage() {
  const params = useParams();
  const userType = params.userType as 'student' | 'teacher' | 'institute';
  
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState('All Files');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [selectedFile, setSelectedFile] = useState<any>(null);

  const quickActions = [
    {
      icon: Brain,
      title: "What is Mentora?",
      description: "Learn about AI-powered learning features",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: BookOpen,
      title: "Create Study Guide",
      description: "Generate personalized study materials",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: HelpCircle,
      title: "Make Study Questions",
      description: "Generate practice questions",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: MessageSquare,
      title: "Compare Concepts",
      description: "Analyze and compare different topics",
      color: "bg-orange-100 text-orange-600"
    }
  ];

  const recentChats = [
    { id: 1, title: "Machine Learning Concepts", lastMessage: "Explain neural networks", time: "2 hours ago" },
    { id: 2, title: "Python Data Structures", lastMessage: "What are dictionaries?", time: "1 day ago" },
    { id: 3, title: "Statistics Help", lastMessage: "Calculate probability", time: "2 days ago" }
  ];

  // Dummy uploaded files
  const dummyFiles = [
    {
      id: 1,
      name: "Machine Learning Fundamentals.pdf",
      type: "pdf",
      size: "2.4 MB",
      uploadDate: "2024-01-15",
      description: "Comprehensive guide to ML concepts and algorithms",
      messages: [
        {
          id: 1,
          type: 'user',
          content: 'Can you summarize the key concepts from this ML document?',
          timestamp: '2:30 PM'
        },
        {
          id: 2,
          type: 'ai',
          content: `Based on the Machine Learning Fundamentals document, here are the key concepts:

## Core ML Concepts:
- **Supervised Learning**: Learning with labeled data to make predictions
- **Unsupervised Learning**: Finding patterns in data without labels  
- **Feature Engineering**: Preparing and selecting relevant data features
- **Model Evaluation**: Techniques to assess model performance

## Main Algorithms Covered:
1. **Linear Regression** - For predicting continuous values
2. **Decision Trees** - For classification and regression
3. **Random Forest** - Ensemble method combining multiple trees
4. **Support Vector Machines** - For classification problems
5. **K-Means Clustering** - For grouping similar data points

The document emphasizes practical applications and includes examples of real-world ML use cases.`,
          timestamp: '2:31 PM'
        }
      ]
    },
    {
      id: 2,
      name: "Python Programming Tutorial.mp4",
      type: "video",
      size: "45.2 MB",
      uploadDate: "2024-01-14",
      description: "Complete Python tutorial for beginners",
      messages: [
        {
          id: 1,
          type: 'user',
          content: 'What are the main topics covered in this Python tutorial?',
          timestamp: '3:15 PM'
        },
        {
          id: 2,
          type: 'ai',
          content: `The Python Programming Tutorial covers these essential topics:

## Python Fundamentals:
- **Variables and Data Types** - Strings, numbers, lists, dictionaries
- **Control Flow** - If statements, loops, and conditional logic
- **Functions** - Creating and using reusable code blocks
- **Object-Oriented Programming** - Classes, objects, and inheritance

## Advanced Concepts:
- **File Handling** - Reading and writing files
- **Error Handling** - Try-catch blocks and exception management
- **Libraries** - NumPy, Pandas, and Matplotlib basics
- **Best Practices** - Code organization and documentation

This tutorial is perfect for beginners and includes practical exercises throughout.`,
          timestamp: '3:16 PM'
        }
      ]
    }
  ];

  // Initialize with dummy files
  useEffect(() => {
    setUploadedFiles(dummyFiles);
  }, []);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsGenerating(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        id: messages.length + 2,
        type: 'ai',
        content: `I'm your AI learning assistant! I can help you with:

🎓 **Study Support**
- Explain complex concepts in simple terms
- Create personalized study guides
- Generate practice questions and quizzes
- Summarize lectures and readings

📚 **Content Analysis**
- Analyze uploaded documents, videos, and links
- Extract key information and insights
- Create mind maps and visual summaries
- Compare different topics and concepts

🧠 **Learning Enhancement**
- Adapt explanations to your learning style
- Track your progress and knowledge gaps
- Suggest study strategies and techniques
- Provide real-time help during study sessions

What would you like to explore today? You can upload materials, ask questions, or try one of the quick actions below!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsGenerating(false);
    }, 2000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const newFile = {
      id: Date.now(),
      name: file.name,
      type: file.type.includes('video') ? 'video' : file.type.includes('pdf') ? 'pdf' : 'document',
      size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
      uploadDate: new Date().toISOString().split('T')[0],
      description: `Uploaded ${file.type.includes('video') ? 'video' : file.type.includes('pdf') ? 'PDF' : 'document'}`,
      messages: [
        {
          id: 1,
          type: 'user',
          content: `I've uploaded ${file.name}. Can you help me understand this content?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
        {
          id: 2,
          type: 'ai',
          content: `I've processed your uploaded file "${file.name}". I can help you with:\n\n- Summarizing key points\n- Answering specific questions\n- Creating study materials\n- Generating quizzes\n\nWhat would you like to know about this content?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]
    };

    // Add file to uploaded files list
    setUploadedFiles(prev => [newFile, ...prev]);
    setShowUploadModal(false);
    
    // Redirect to content viewer with split-screen interface
    setTimeout(() => {
      window.location.href = `/dashboard/${userType}/content/${newFile.id}`;
    }, 500);
  };

  const handleFileSelect = (file: any) => {
    setSelectedFile(file);
    setMessages(file.messages);
  };

  const handleQuickAction = (action: any) => {
    const message = `Help me with: ${action.title}`;
    setNewMessage(message);
    // Auto-send the message
    setTimeout(() => {
      sendMessage();
    }, 100);
  };

  return (
    <DashboardLayout userType={userType}>
      <div className="flex h-full">

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 bg-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold text-gray-900">AI Chat Assistant</h1>
                <p className="text-sm text-gray-500">Ask me anything or upload content to get started</p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload</span>
                </button>
                <button
                  onClick={() => window.open('/dashboard/' + userType + '/content', '_blank')}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  <span>Content Library</span>
                </button>
              </div>
            </div>
          </div>

          {messages.length === 0 ? (
            /* Welcome Screen */
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="max-w-2xl mx-auto text-center">
                {/* Logo */}
                <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Brain className="w-12 h-12 text-white" />
                </div>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  Welcome to Mentora AI
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Your intelligent learning companion. Ask questions, upload materials, and enhance your learning experience.
                </p>

                {/* Upload Options */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <button 
                    onClick={() => setShowUploadModal(true)}
                    className="p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 transition-colors cursor-pointer"
                  >
                    <FileText className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-2">Upload Files</h3>
                    <p className="text-sm text-gray-600">PDF, DOCX, PPTX, Images</p>
                  </button>
                  <button 
                    onClick={() => setShowUploadModal(true)}
                    className="p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 transition-colors cursor-pointer"
                  >
                    <Video className="w-8 h-8 text-red-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-2">YouTube Links</h3>
                    <p className="text-sm text-gray-600">Lecture or video links</p>
                  </button>
                  <button 
                    onClick={() => setShowUploadModal(true)}
                    className="p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 transition-colors cursor-pointer"
                  >
                    <LinkIcon className="w-8 h-8 text-green-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-2">Paste Content</h3>
                    <p className="text-sm text-gray-600">Text or notes</p>
                  </button>
                </div>

                {/* Quick Actions Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickAction(action)}
                      className="p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors text-left"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${action.color}`}>
                          <action.icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{action.title}</div>
                          <div className="text-xs text-gray-500">{action.description}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Chat Messages */
            <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-4xl mx-auto space-y-6">
                {messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-3xl ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-gray-200'
                    } rounded-xl p-4 shadow-sm`}>
                      {message.type === 'ai' && (
                        <div className="flex items-center space-x-2 mb-3">
                          <Brain className="w-5 h-5 text-blue-600" />
                          <span className="font-semibold text-blue-600">AI Assistant</span>
                        </div>
                      )}
                      <div className={`text-sm ${message.type === 'user' ? 'text-white' : 'text-gray-900'}`}>
                        {message.type === 'ai' ? (
                          <div className="prose prose-sm max-w-none prose-headings:text-gray-900 prose-p:text-gray-900 prose-strong:text-gray-900 prose-ul:text-gray-900 prose-ol:text-gray-900 prose-li:text-gray-900 prose-code:text-gray-900 prose-pre:text-gray-900 prose-blockquote:text-gray-900">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {message.content}
                            </ReactMarkdown>
                          </div>
                        ) : (
                          message.content
                        )}
                      </div>
                      <div className={`text-xs mt-2 ${
                        message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isGenerating && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                      <div className="flex items-center space-x-2 mb-2">
                        <Brain className="w-5 h-5 text-blue-600" />
                        <span className="font-semibold text-blue-600">AI Assistant</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="border-t border-gray-200 p-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <ImageIcon className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <Globe className="w-5 h-5" />
                  </button>
                  <div className="flex items-center space-x-1 px-3 py-1 bg-gray-100 rounded-lg">
                    <span className="text-sm text-gray-600">{selectedFiles}</span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Ask Mentora AI anything..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <button
                  onClick={sendMessage}
                  disabled={!newMessage.trim() || isGenerating}
                  className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Upload Content</h3>
                <button 
                  onClick={() => setShowUploadModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    accept=".pdf,.mp4,.mov,.avi,.doc,.docx,.txt,.ppt,.pptx"
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 mb-2">Drag and drop files here</p>
                    <p className="text-sm text-gray-500">or click to browse</p>
                  </label>
                </div>
                
                <div className="space-y-2">
                  <button className="w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left">
                    <div className="flex items-center space-x-3">
                      <Video className="w-5 h-5 text-red-600" />
                      <span>Add YouTube Link</span>
                    </div>
                  </button>
                  <button className="w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left">
                    <div className="flex items-center space-x-3">
                      <LinkIcon className="w-5 h-5 text-green-600" />
                      <span>Paste Text Content</span>
                    </div>
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Upload
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
