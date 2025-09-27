'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  ArrowLeft,
  Send,
  Brain,
  BookOpen,
  HelpCircle,
  MessageSquare,
  MoreVertical,
  Star,
  Trash2,
  Download,
  Share,
  Edit,
  ChevronRight,
  Plus,
  FileText,
  Video,
  Link as LinkIcon,
  X
} from 'lucide-react';

export default function ContentChatPage() {
  const params = useParams();
  const userType = params.userType as 'student' | 'teacher' | 'institute';
  const contentId = params.contentId as string;
  
  const [activeTab, setActiveTab] = useState<'chat' | 'knowledge-space' | 'content-generator'>('chat');
  
  // Mock content data - in real app, this would come from API based on contentId
  const contentData = {
    id: contentId,
    title: contentId === '1' ? 'Machine Learning Fundamentals' : 
           contentId === '2' ? 'Python Programming Tutorial' : 
           `Uploaded File ${contentId}`,
    type: contentId === '1' ? 'pdf' : 
          contentId === '2' ? 'video' : 
          'pdf',
    size: contentId === '1' ? '2.4 MB' : 
          contentId === '2' ? '45.2 MB' : 
          '2.1 MB',
    uploadDate: contentId === '1' ? '2024-01-15' : 
                contentId === '2' ? '2024-01-14' : 
                new Date().toISOString().split('T')[0],
    description: contentId === '1' ? 'Comprehensive guide to machine learning concepts and algorithms' :
                contentId === '2' ? 'Complete Python tutorial for beginners' :
                'Recently uploaded file',
    tags: contentId === '1' ? ['Machine Learning', 'AI', 'Algorithms', 'Data Science'] :
          contentId === '2' ? ['Programming', 'Python', 'Tutorial', 'Beginners'] :
          ['Uploaded', 'Recent']
  };

  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'user',
      content: `I've uploaded ${contentData.title}. Can you help me understand this content?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
    {
      id: 2,
      type: 'ai',
      content: `I've processed your uploaded file "${contentData.title}". I can help you with:

## What I can do with this content:
- **Summarize key points** from the ${contentData.type.toUpperCase()}
- **Answer specific questions** about the material
- **Create study materials** like notes and flashcards
- **Generate practice questions** and quizzes
- **Explain complex concepts** in simpler terms

## Quick Actions Available:
- Use the **Knowledge Space** tab to see structured content analysis
- Use the **Content Generator** to create presentations, quizzes, and notes
- Ask me any specific questions about the content

What would you like to know about this ${contentData.type.toUpperCase()} file?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPPTModal, setShowPPTModal] = useState(false);
  const [generatedPPT, setGeneratedPPT] = useState<any>(null);

  const generatePPT = () => {
    // Simulate PPT generation
    const ppt = {
      title: `${contentData.title} - Presentation`,
      slides: [
        {
          id: 1,
          title: "Introduction",
          content: [
            "Welcome to the presentation on Machine Learning Fundamentals",
            "Today we'll cover:",
            "• What is Machine Learning?",
            "• Types of ML algorithms",
            "• Real-world applications",
            "• Future trends"
          ]
        },
        {
          id: 2,
          title: "What is Machine Learning?",
          content: [
            "Machine Learning is a subset of AI",
            "Enables computers to learn without explicit programming",
            "Uses algorithms to identify patterns in data",
            "Makes predictions or decisions based on data"
          ]
        },
        {
          id: 3,
          title: "Types of Machine Learning",
          content: [
            "Supervised Learning:",
            "• Uses labeled training data",
            "• Examples: Linear Regression, Decision Trees",
            "",
            "Unsupervised Learning:",
            "• Finds patterns in unlabeled data",
            "• Examples: Clustering, Dimensionality Reduction"
          ]
        },
        {
          id: 4,
          title: "Real-World Applications",
          content: [
            "Healthcare: Medical diagnosis and drug discovery",
            "Finance: Fraud detection and algorithmic trading",
            "Technology: Recommendation systems and search engines",
            "Transportation: Autonomous vehicles and route optimization"
          ]
        },
        {
          id: 5,
          title: "Future Trends",
          content: [
            "AutoML: Automated machine learning",
            "Edge AI: ML on mobile and IoT devices",
            "Explainable AI: Making ML decisions transparent",
            "Quantum Machine Learning: Using quantum computing"
          ]
        }
      ]
    };
    
    setGeneratedPPT(ppt);
    setShowPPTModal(true);
  };

  const handleGenerate = (toolId: string) => {
    if (toolId === 'ppt') {
      generatePPT();
    } else {
      // Handle other tools
      console.log(`Generating ${toolId}`);
    }
  };

  const knowledgeSpaceData = {
    title: 'Machine Learning Knowledge Space',
    overview: 'Structured knowledge extraction from uploaded content with key concepts, definitions, and relationships.',
    sections: [
      {
        id: 1,
        title: '1. Introduction to Machine Learning',
        keyPoints: [
          'Machine learning is a subset of artificial intelligence that enables computers to learn without being explicitly programmed',
          'ML algorithms build mathematical models based on training data to make predictions or decisions',
          'Three main types: Supervised, Unsupervised, and Reinforcement Learning'
        ],
        definitions: [
          { term: 'Machine Learning', definition: 'A method of data analysis that automates analytical model building' },
          { term: 'Algorithm', definition: 'A set of rules or instructions given to an AI system to help it learn' },
          { term: 'Training Data', definition: 'The dataset used to train the machine learning algorithm' }
        ],
        concepts: ['Pattern Recognition', 'Statistical Learning', 'Predictive Modeling'],
        importance: 'Foundation for understanding advanced AI concepts and applications'
      },
      {
        id: 2,
        title: '2. Supervised Learning Algorithms',
        keyPoints: [
          'Uses labeled training data to learn a mapping from inputs to outputs',
          'Goal is to predict the correct output for new, unseen data',
          'Includes both classification and regression problems'
        ],
        definitions: [
          { term: 'Classification', definition: 'Predicting discrete categories or classes' },
          { term: 'Regression', definition: 'Predicting continuous numerical values' },
          { term: 'Labeled Data', definition: 'Training data that includes both input features and desired outputs' }
        ],
        concepts: ['Linear Regression', 'Decision Trees', 'Random Forest', 'SVM', 'Naive Bayes'],
        importance: 'Most commonly used approach for practical machine learning applications'
      },
      {
        id: 3,
        title: '3. Model Evaluation and Validation',
        keyPoints: [
          'Essential for assessing model performance and generalization ability',
          'Prevents overfitting and ensures model reliability',
          'Uses various metrics depending on the problem type'
        ],
        definitions: [
          { term: 'Overfitting', definition: 'When a model learns training data too well, including noise' },
          { term: 'Cross-validation', definition: 'Technique to assess model performance on unseen data' },
          { term: 'Accuracy', definition: 'Proportion of correct predictions out of total predictions' }
        ],
        concepts: ['Hold-out Validation', 'K-Fold Cross-validation', 'Confusion Matrix', 'ROC Curve'],
        importance: 'Critical for building reliable and trustworthy ML systems'
      }
    ]
  };

  const contentGeneratorData = {
    title: 'Content Generator',
    description: 'Generate various learning materials from your content',
    tools: [
      {
        id: 'ppt',
        title: 'PowerPoint Presentations',
        description: 'Create slides with key concepts, diagrams, and summaries',
        icon: '📊',
        features: ['Auto-generated slides', 'Visual diagrams', 'Speaker notes', 'Export to PPTX']
      },
      {
        id: 'quiz',
        title: 'Interactive Quizzes',
        description: 'Generate multiple choice, true/false, and essay questions',
        icon: '❓',
        features: ['Multiple question types', 'Difficulty levels', 'Answer explanations', 'Auto-grading']
      },
      {
        id: 'notes',
        title: 'Revision Notes',
        description: 'Generate structured notes with key points and summaries',
        icon: '📝',
        features: ['Organized sections', 'Key highlights', 'Mind maps', 'Study checklists']
      }
    ]
  };

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
        content: `Based on the content "${contentData.title}", here's my response to your question: "${newMessage}"

This is a simulated AI response that would analyze the uploaded content and provide relevant information based on your question. In a real implementation, this would be powered by advanced AI models that can understand and process the content you've uploaded.

The AI can help you with:
- Summarizing specific sections
- Explaining complex concepts
- Generating practice questions
- Creating study guides
- Answering specific questions about the material`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsGenerating(false);
    }, 2000);
  };

  const generateQuiz = () => {
    // In a real app, this would generate a quiz from the content
    alert('Quiz generation feature would be implemented here!');
  };

  const createStudyGuide = () => {
    // In a real app, this would create a study guide from the content
    alert('Study guide generation feature would be implemented here!');
  };

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'pdf': return FileText;
      case 'video': return Video;
      case 'link': return LinkIcon;
      default: return FileText;
    }
  };

  const ContentIcon = getContentIcon(contentData.type);

  return (
    <DashboardLayout userType={userType}>
      <div className="flex h-full">
        {/* Left Panel - File Viewer (40%) */}
        <div className="w-2/5 bg-white border-r border-gray-200 flex flex-col">
          {/* File Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <ContentIcon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h1 className="font-semibold text-gray-900">{contentData.title}</h1>
                  <p className="text-sm text-gray-500">{contentData.type.toUpperCase()} • {contentData.size}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <Download className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <Share className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* File Content */}
          <div className="flex-1 overflow-hidden">
            {contentData.type === 'pdf' && (
              <div className="h-full bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">PDF Viewer</h3>
                  <p className="text-gray-600 mb-4">PDF content would be displayed here</p>
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 max-w-sm">
                    <p className="text-sm text-gray-700">
                      In a real implementation, this would show the actual PDF content using a PDF viewer library like react-pdf or pdf.js
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {contentData.type === 'video' && (
              <div className="h-full bg-black flex items-center justify-center">
                <div className="text-center text-white">
                  <Video className="w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Video Player</h3>
                  <p className="text-gray-300 mb-4">Video content would be displayed here</p>
                  <div className="bg-gray-800 rounded-lg p-4 max-w-sm">
                    <p className="text-sm text-gray-300">
                      Video player would be embedded here with controls for play, pause, seek, etc.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {contentData.type === 'link' && (
              <div className="h-full bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                  <LinkIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Web Content</h3>
                  <p className="text-gray-600 mb-4">Web content would be displayed here</p>
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 max-w-sm">
                    <p className="text-sm text-gray-700">
                      Web content or iframe would be embedded here to show the linked page content
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - AI Interface (60%) */}
        <div className="w-3/5 flex flex-col">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <ContentIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h1 className="text-lg font-semibold text-gray-900">{contentData.title}</h1>
                    <p className="text-sm text-gray-500">{contentData.type.toUpperCase()} • {contentData.size}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <Star className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <Share className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <Download className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center space-x-1 mt-4">
              <button
                onClick={() => setActiveTab('chat')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'chat'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <MessageSquare className="w-4 h-4 inline mr-2" />
                AI Chat
              </button>
              <button
                onClick={() => setActiveTab('knowledge-space')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'knowledge-space'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <BookOpen className="w-4 h-4 inline mr-2" />
                Knowledge Space
              </button>
              <button
                onClick={() => setActiveTab('content-generator')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'content-generator'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <HelpCircle className="w-4 h-4 inline mr-2" />
                Content Generator
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-hidden">
            {activeTab === 'chat' && (
              <div className="h-full flex flex-col">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map(message => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-3xl ${
                        message.type === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border border-gray-200'
                      } rounded-lg p-4`}>
                        {message.type === 'ai' && (
                          <div className="flex items-center space-x-2 mb-2">
                            <Brain className="w-4 h-4 text-blue-600" />
                            <span className="text-sm font-semibold text-blue-600">AI Assistant</span>
                          </div>
                        )}
                        <div className={`text-sm ${message.type === 'user' ? 'text-white' : 'text-gray-900'}`}>
                          {message.content}
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
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center space-x-2">
                          <Brain className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-semibold text-blue-600">AI Assistant</span>
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Message Input */}
                <div className="border-t border-gray-200 p-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="Ask anything about this content..."
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
                  
                  {/* Quick Actions */}
                  <div className="flex items-center space-x-2 mt-3">
                    <button
                      onClick={createStudyGuide}
                      className="flex items-center space-x-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Create Study Guide</span>
                    </button>
                    <button
                      onClick={generateQuiz}
                      className="flex items-center space-x-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                    >
                      <HelpCircle className="w-4 h-4" />
                      <span>Generate Quiz</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'knowledge-space' && (
              <div className="h-full overflow-y-auto p-6">
                <div className="max-w-5xl mx-auto">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{knowledgeSpaceData.title}</h2>
                      <p className="text-gray-600 mt-1">{knowledgeSpaceData.overview}</p>
                    </div>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <Edit className="w-4 h-4" />
                      <span>Regenerate</span>
                    </button>
                  </div>

                  <div className="space-y-6">
                    {knowledgeSpaceData.sections.map(section => (
                      <div key={section.id} className="bg-white border border-gray-200 rounded-xl p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">{section.title}</h3>
                        
                        {/* Key Points */}
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                            Key Points
                          </h4>
                          <ul className="space-y-2">
                            {section.keyPoints.map((point, index) => (
                              <li key={index} className="flex items-start space-x-3">
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                                <span className="text-gray-700">{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Definitions */}
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                            Key Definitions
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {section.definitions.map((def, index) => (
                              <div key={index} className="bg-gray-50 rounded-lg p-3">
                                <dt className="font-medium text-gray-900">{def.term}</dt>
                                <dd className="text-sm text-gray-600 mt-1">{def.definition}</dd>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Related Concepts */}
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                            Related Concepts
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {section.concepts.map((concept, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                              >
                                {concept}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Importance */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h4 className="font-semibold text-blue-900 mb-2">Why This Matters:</h4>
                          <p className="text-blue-800 text-sm">{section.importance}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'content-generator' && (
              <div className="h-full overflow-y-auto p-6">
                <div className="max-w-6xl mx-auto">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">{contentGeneratorData.title}</h2>
                    <p className="text-gray-600 mt-1">{contentGeneratorData.description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {contentGeneratorData.tools.map((tool) => (
                      <div key={tool.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-start space-x-4 mb-4">
                          <div className="text-4xl">{tool.icon}</div>
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{tool.title}</h3>
                            <p className="text-gray-600 text-sm">{tool.description}</p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <h4 className="font-medium text-gray-900 mb-2">Features:</h4>
                          <ul className="space-y-1">
                            {tool.features.map((feature, index) => (
                              <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-500">
                            {tool.id === 'ppt' && 'Generate slides from content'}
                            {tool.id === 'quiz' && 'Create interactive assessments'}
                            {tool.id === 'flashcards' && 'Build memory cards'}
                            {tool.id === 'notes' && 'Structured study materials'}
                          </div>
                          <button 
                            onClick={() => handleGenerate(tool.id)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                          >
                            Generate
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Quick Actions */}
                  <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <button 
                        onClick={generatePPT}
                        className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors text-center"
                      >
                        <div className="text-2xl mb-2">📊</div>
                        <div className="text-sm font-medium text-gray-900">Generate PPT</div>
                      </button>
                      <button className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors text-center">
                        <div className="text-2xl mb-2">❓</div>
                        <div className="text-sm font-medium text-gray-900">Create Quiz</div>
                      </button>
                      <button className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors text-center">
                        <div className="text-2xl mb-2">🃏</div>
                        <div className="text-sm font-medium text-gray-900">Make Flashcards</div>
                      </button>
                      <button className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors text-center">
                        <div className="text-2xl mb-2">📝</div>
                        <div className="text-sm font-medium text-gray-900">Revision Notes</div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PPT Modal */}
      {showPPTModal && generatedPPT && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{generatedPPT.title}</h2>
                <p className="text-sm text-gray-500 mt-1">Generated from your content</p>
              </div>
              <div className="flex items-center space-x-3">
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                  Download PPTX
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                  Save to Library
                </button>
                <button 
                  onClick={() => setShowPPTModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content - Slides Preview */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {generatedPPT.slides.map((slide: any, index: number) => (
                  <div key={slide.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">{slide.title}</h3>
                      <span className="text-sm text-gray-500">Slide {index + 1}</span>
                    </div>
                    <div className="space-y-2">
                      {slide.content.map((item: string, itemIndex: number) => (
                        <div key={itemIndex} className="text-gray-700">
                          {item === "" ? <br /> : (
                            <div className={item.startsWith('•') ? 'ml-4' : ''}>
                              {item}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
