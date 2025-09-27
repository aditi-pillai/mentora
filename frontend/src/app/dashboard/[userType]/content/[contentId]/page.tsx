'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
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
    },
    {
      id: 3,
      type: 'user',
      content: 'What are the main types of machine learning algorithms mentioned?',
      timestamp: new Date(Date.now() - 300000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
    {
      id: 4,
      type: 'ai',
      content: `Based on the document, here are the main types of machine learning algorithms:

## 1. **Supervised Learning Algorithms**
- **Linear Regression**: Used for predicting continuous values
- **Decision Trees**: Great for both classification and regression
- **Random Forest**: Ensemble method combining multiple decision trees
- **Support Vector Machines (SVM)**: Effective for classification problems
- **Naive Bayes**: Probabilistic classifier based on Bayes' theorem

## 2. **Unsupervised Learning Algorithms**
- **K-Means Clustering**: Groups similar data points together
- **Hierarchical Clustering**: Creates tree-like clusters
- **Principal Component Analysis (PCA)**: Reduces dimensionality
- **DBSCAN**: Density-based clustering algorithm

## 3. **Reinforcement Learning**
- **Q-Learning**: Learns optimal action-selection policy
- **Deep Q-Networks (DQN)**: Combines Q-learning with deep neural networks

Each algorithm has specific use cases and strengths depending on your data and problem type.`,
      timestamp: new Date(Date.now() - 280000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
    {
      id: 5,
      type: 'user',
      content: 'Can you explain overfitting in simple terms?',
      timestamp: new Date(Date.now() - 240000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
    {
      id: 6,
      type: 'ai',
      content: `Absolutely! Let me explain overfitting with a simple analogy:

## What is Overfitting? 🎯

Imagine you're studying for an exam by memorizing specific questions and answers from practice tests. You become so good at those exact questions that you get them 100% right. But when the real exam comes with slightly different questions, you struggle because you only memorized the specific examples, not the underlying concepts.

## In Machine Learning Terms:
- **Training Data**: The practice questions you memorized
- **Test Data**: The real exam with new questions
- **Overfitting**: When your model learns the training data too well, including noise and outliers

## Signs of Overfitting:
- ✅ Model performs perfectly on training data
- ❌ Model performs poorly on new, unseen data
- 📈 Training accuracy keeps increasing
- 📉 Test accuracy starts decreasing

## How to Prevent Overfitting:
- Use **cross-validation** to test on multiple data splits
- Apply **regularization** techniques
- Use **dropout** in neural networks
- Collect **more diverse training data**
- Stop training when validation performance plateaus

Think of it as the difference between understanding concepts vs. just memorizing facts!`,
      timestamp: new Date(Date.now() - 220000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
    {
      id: 7,
      type: 'user',
      content: 'What are the key differences between supervised and unsupervised learning?',
      timestamp: new Date(Date.now() - 180000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
    {
      id: 8,
      type: 'ai',
      content: `Great question! Here's a clear comparison:

## Supervised Learning 📚

**What it is**: Learning with a "teacher" - you provide both input data and the correct answers.

**Key Characteristics**:
- Uses **labeled data** (input + correct output)
- Goal is to **predict** or **classify** new data
- Examples: Email spam detection, price prediction, image classification

**Common Algorithms**:
- Linear/Logistic Regression
- Decision Trees
- Random Forest
- Neural Networks

## Unsupervised Learning 🔍

**What it is**: Learning without a "teacher" - you only provide input data, no correct answers.

**Key Characteristics**:
- Uses **unlabeled data** (input only)
- Goal is to **find patterns** or **group similar data**
- Examples: Customer segmentation, anomaly detection, data compression

**Common Algorithms**:
- K-Means Clustering
- Hierarchical Clustering
- PCA (Principal Component Analysis)
- Association Rules

## Quick Comparison:
| Aspect | Supervised | Unsupervised |
|--------|------------|--------------|
| Data | Labeled | Unlabeled |
| Goal | Predict/Classify | Find patterns |
| Evaluation | Easy (compare predictions) | Subjective |
| Applications | Prediction tasks | Discovery tasks |

**Analogy**: Supervised = learning with answer keys, Unsupervised = exploring without a map!`,
      timestamp: new Date(Date.now() - 160000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPPTModal, setShowPPTModal] = useState(false);
  const [generatedPPT, setGeneratedPPT] = useState<any>(null);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [generatedQuiz, setGeneratedQuiz] = useState<any>(null);
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [showQuizAnswer, setShowQuizAnswer] = useState(false);
  const [showRevisionModal, setShowRevisionModal] = useState(false);
  const [generatedRevision, setGeneratedRevision] = useState<any>(null);
  const [showMindMapModal, setShowMindMapModal] = useState(false);

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

  const generateQuiz = () => {
    const quiz = {
      title: `${contentData.title} - Interactive Quiz`,
      questions: [
        {
          id: 1,
          question: "What is the primary goal of supervised learning?",
          options: [
            "To learn without any guidance",
            "To predict outcomes based on labeled training data",
            "To discover hidden patterns in data",
            "To optimize reward functions"
          ],
          correct: 1,
          explanation: "Supervised learning uses labeled training data to learn a mapping from inputs to outputs, enabling prediction on new data.",
          flashcard_front: "What is supervised learning?",
          flashcard_back: "A machine learning approach that uses labeled training data to learn patterns and make predictions on new, unseen data."
        },
        {
          id: 2,
          question: "Which algorithm is commonly used for classification problems?",
          options: [
            "Linear Regression",
            "K-Means Clustering",
            "Decision Trees",
            "Principal Component Analysis"
          ],
          correct: 2,
          explanation: "Decision Trees are widely used for classification problems as they can handle both numerical and categorical data.",
          flashcard_front: "Best algorithm for classification?",
          flashcard_back: "Decision Trees - they can handle both numerical and categorical data and provide interpretable results."
        },
        {
          id: 3,
          question: "What does 'overfitting' mean in machine learning?",
          options: [
            "The model performs poorly on training data",
            "The model learns training data too well, including noise",
            "The model has too few parameters",
            "The model takes too long to train"
          ],
          correct: 1,
          explanation: "Overfitting occurs when a model learns the training data too well, including noise and outliers, leading to poor generalization.",
          flashcard_front: "Define overfitting",
          flashcard_back: "When a model learns training data too well, including noise, resulting in poor performance on new data."
        },
        {
          id: 4,
          question: "Which of the following is NOT a type of machine learning?",
          options: [
            "Supervised Learning",
            "Unsupervised Learning",
            "Reinforcement Learning",
            "Deterministic Learning"
          ],
          correct: 3,
          explanation: "Deterministic learning is not a recognized type of machine learning. The three main types are supervised, unsupervised, and reinforcement learning.",
          flashcard_front: "Types of machine learning?",
          flashcard_back: "Supervised, Unsupervised, and Reinforcement Learning are the three main types."
        },
        {
          id: 5,
          question: "What is the purpose of cross-validation?",
          options: [
            "To increase training speed",
            "To assess model performance on unseen data",
            "To reduce model complexity",
            "To increase model accuracy"
          ],
          correct: 1,
          explanation: "Cross-validation is used to assess how well a model will generalize to unseen data by testing it on multiple data splits.",
          flashcard_front: "Purpose of cross-validation?",
          flashcard_back: "To assess model performance on unseen data and prevent overfitting by testing on multiple data splits."
        }
      ]
    };
    
    setGeneratedQuiz(quiz);
    setCurrentQuizQuestion(0);
    setShowQuizAnswer(false);
    setShowQuizModal(true);
  };

  const generateRevisionNotes = () => {
    const revision = {
      title: `${contentData.title} - Revision Notes`,
      sections: [
        {
          title: "1. Introduction to Machine Learning",
          content: [
            "Machine learning is a subset of artificial intelligence that enables computers to learn without being explicitly programmed.",
            "Three main types: Supervised, Unsupervised, and Reinforcement Learning",
            "Applications include image recognition, natural language processing, and predictive analytics"
          ]
        },
        {
          title: "2. Supervised Learning",
          content: [
            "Uses labeled training data to learn input-output mappings",
            "Goal: Predict outputs for new, unseen inputs",
            "Two main tasks: Classification (discrete outputs) and Regression (continuous outputs)",
            "Common algorithms: Linear Regression, Decision Trees, Random Forest, SVM"
          ]
        },
        {
          title: "3. Unsupervised Learning",
          content: [
            "Finds patterns in data without labeled examples",
            "Goal: Discover hidden structures or groupings",
            "Main tasks: Clustering, Dimensionality Reduction, Association Rules",
            "Common algorithms: K-Means, PCA, Hierarchical Clustering"
          ]
        },
        {
          title: "4. Model Evaluation",
          content: [
            "Overfitting: Model performs well on training data but poorly on test data",
            "Cross-validation: Technique to assess model performance on unseen data",
            "Metrics: Accuracy, Precision, Recall, F1-Score for classification",
            "Prevention: Regularization, Dropout, Early Stopping"
          ]
        },
        {
          title: "5. Key Takeaways",
          content: [
            "Choose the right algorithm based on your data and problem type",
            "Always validate your model on unseen data",
            "Prevent overfitting through proper regularization",
            "Feature engineering is crucial for model performance"
          ]
        }
      ]
    };
    
    setGeneratedRevision(revision);
    setShowRevisionModal(true);
  };

  const generateMindMap = () => {
    setShowMindMapModal(true);
  };

  const handleGenerate = (toolId: string) => {
    if (toolId === 'ppt') {
      generatePPT();
    } else if (toolId === 'quiz') {
      generateQuiz();
    } else if (toolId === 'notes') {
      generateRevisionNotes();
    } else if (toolId === 'mindmap') {
      generateMindMap();
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
        features: ['Organized sections', 'Key highlights', 'Study checklists', 'Export options']
      },
      {
        id: 'mindmap',
        title: 'Mind Map',
        description: 'Create interactive mind maps for visual learning',
        icon: '🧠',
        features: ['Interactive nodes', 'Expandable branches', 'Visual connections', 'Export as image']
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
              <div className="h-full bg-gray-100 flex flex-col">
                {/* PDF Toolbar - Chrome-like */}
                <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <button className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    <div className="w-px h-4 bg-gray-300 mx-2"></div>
                    <button className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">Page 1 of 4</span>
                    <button className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </button>
                    <button className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8v1a3 3 0 003 3h10a3 3 0 003-3V8m-9 4l3-3m0 0l3 3m-3-3v12" />
                      </svg>
                    </button>
                    <button className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                    <button className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* PDF Content Area */}
                <div className="flex-1 overflow-y-auto bg-gray-200 p-4">
                  <div className="max-w-full mx-auto">
                    {/* PDF Page 1 */}
                    <div className="bg-white shadow-lg mb-4" style={{ aspectRatio: '8.5/11' }}>
                      <div className="p-8 h-full">
                        <div className="text-center mb-6">
                          <h1 className="text-2xl font-bold text-gray-900 mb-2">Machine Learning Fundamentals</h1>
                          <p className="text-gray-600">A Comprehensive Guide</p>
                        </div>
                        <div className="space-y-4 text-sm leading-relaxed">
                          <p className="text-gray-800">
                            Machine Learning (ML) is a subset of artificial intelligence (AI) that enables computers 
                            to learn and make decisions from data without being explicitly programmed for every task.
                          </p>
                          <p className="text-gray-800">
                            This document covers the essential concepts, algorithms, and practical applications 
                            that form the foundation of machine learning.
                          </p>
                          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                            <h3 className="font-semibold text-blue-900 mb-2">Learning Objectives</h3>
                            <ul className="text-blue-800 space-y-1">
                              <li>• Understand the core concepts of machine learning</li>
                              <li>• Learn about different types of ML algorithms</li>
                              <li>• Explore real-world applications and use cases</li>
                              <li>• Master model evaluation and validation techniques</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* PDF Page 2 */}
                    <div className="bg-white shadow-lg mb-4" style={{ aspectRatio: '8.5/11' }}>
                      <div className="p-8 h-full">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Chapter 1: Introduction to Machine Learning</h2>
                        <div className="space-y-4 text-sm leading-relaxed">
                          <p className="text-gray-800">
                            Machine learning algorithms build mathematical models based on training data to make 
                            predictions or decisions without being explicitly programmed to perform the task.
                          </p>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-gray-900 mb-2">Key Characteristics</h3>
                            <ul className="text-gray-700 space-y-1">
                              <li>• <strong>Data-driven:</strong> Relies on large amounts of data</li>
                              <li>• <strong>Adaptive:</strong> Improves performance over time</li>
                              <li>• <strong>Predictive:</strong> Makes predictions on new data</li>
                              <li>• <strong>Automated:</strong> Reduces human intervention</li>
                            </ul>
                          </div>
                          <p className="text-gray-800">
                            The field has grown rapidly due to increased computational power, availability of 
                            large datasets, and advances in algorithms.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* PDF Page 3 */}
                    <div className="bg-white shadow-lg mb-4" style={{ aspectRatio: '8.5/11' }}>
                      <div className="p-8 h-full">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Chapter 2: Types of Machine Learning</h2>
                        <div className="space-y-6 text-sm leading-relaxed">
                          <div className="border-l-4 border-green-400 pl-4">
                            <h3 className="font-semibold text-green-900 mb-2">Supervised Learning</h3>
                            <p className="text-gray-800">
                              Learning with labeled training data. The algorithm learns a mapping from inputs to outputs.
                            </p>
                            <ul className="text-gray-700 mt-2 space-y-1">
                              <li>• Classification: Predicting categories</li>
                              <li>• Regression: Predicting continuous values</li>
                            </ul>
                          </div>
                          <div className="border-l-4 border-blue-400 pl-4">
                            <h3 className="font-semibold text-blue-900 mb-2">Unsupervised Learning</h3>
                            <p className="text-gray-800">
                              Finding patterns in data without labeled examples.
                            </p>
                            <ul className="text-gray-700 mt-2 space-y-1">
                              <li>• Clustering: Grouping similar data points</li>
                              <li>• Dimensionality Reduction: Reducing data complexity</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* PDF Page 4 */}
                    <div className="bg-white shadow-lg mb-4" style={{ aspectRatio: '8.5/11' }}>
                      <div className="p-8 h-full">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Chapter 3: Model Evaluation</h2>
                        <div className="space-y-4 text-sm leading-relaxed">
                          <p className="text-gray-800">
                            Proper evaluation is crucial for understanding model performance and ensuring 
                            reliable predictions on new data.
                          </p>
                          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                            <h3 className="font-semibold text-yellow-900 mb-2">Common Evaluation Metrics</h3>
                            <div className="grid grid-cols-2 gap-4 text-yellow-800">
                              <div>
                                <strong>Classification:</strong>
                                <ul className="mt-1 space-y-1">
                                  <li>• Accuracy</li>
                                  <li>• Precision</li>
                                  <li>• Recall</li>
                                  <li>• F1-Score</li>
                                </ul>
                              </div>
                              <div>
                                <strong>Regression:</strong>
                                <ul className="mt-1 space-y-1">
                                  <li>• Mean Squared Error</li>
                                  <li>• Mean Absolute Error</li>
                                  <li>• R² Score</li>
                                  <li>• Root Mean Square Error</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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

      {/* Quiz Modal */}
      {showQuizModal && generatedQuiz && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{generatedQuiz.title}</h2>
                <p className="text-sm text-gray-500 mt-1">Question {currentQuizQuestion + 1} of {generatedQuiz.questions.length}</p>
              </div>
              <button 
                onClick={() => setShowQuizModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quiz Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {!showQuizAnswer ? (
                /* Question Side */
                <div className="space-y-6">
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {generatedQuiz.questions[currentQuizQuestion].flashcard_front}
                    </h3>
                    <div className="space-y-3">
                      {generatedQuiz.questions[currentQuizQuestion].options.map((option: string, index: number) => (
                        <button
                          key={index}
                          className="w-full p-3 text-left bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                        >
                          <span className="font-medium text-gray-900">{option}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Answer Side */
                <div className="space-y-6">
                  <div className="bg-green-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Answer</h3>
                    <div className="bg-white rounded-lg p-4 mb-4">
                      <p className="font-medium text-gray-900 mb-2">
                        {generatedQuiz.questions[currentQuizQuestion].flashcard_back}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-700">
                        <strong>Explanation:</strong> {generatedQuiz.questions[currentQuizQuestion].explanation}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200">
              <div className="flex items-center space-x-4">
                {currentQuizQuestion > 0 && (
                  <button
                    onClick={() => {
                      setCurrentQuizQuestion(currentQuizQuestion - 1);
                      setShowQuizAnswer(false);
                    }}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Previous
                  </button>
                )}
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowQuizAnswer(!showQuizAnswer)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {showQuizAnswer ? 'Show Question' : 'Show Answer'}
                </button>
                
                {currentQuizQuestion < generatedQuiz.questions.length - 1 ? (
                  <button
                    onClick={() => {
                      setCurrentQuizQuestion(currentQuizQuestion + 1);
                      setShowQuizAnswer(false);
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={() => setShowQuizModal(false)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Finish
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Revision Notes Modal */}
      {showRevisionModal && generatedRevision && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{generatedRevision.title}</h2>
                <p className="text-sm text-gray-500 mt-1">Generated revision notes</p>
              </div>
              <div className="flex items-center space-x-3">
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                  Download PDF
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                  Save Notes
                </button>
                <button 
                  onClick={() => setShowRevisionModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {generatedRevision.sections.map((section: any, index: number) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{section.title}</h3>
                    <div className="space-y-3">
                      {section.content.map((item: string, itemIndex: number) => (
                        <div key={itemIndex} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-700 text-sm leading-relaxed">{item}</p>
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

      {/* Mind Map Modal */}
      {showMindMapModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Machine Learning Mind Map</h2>
                <p className="text-sm text-gray-500 mt-1">Interactive visual representation of key concepts</p>
              </div>
              <div className="flex items-center space-x-3">
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                  Export Image
                </button>
                <button 
                  onClick={() => setShowMindMapModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Mind Map Content */}
            <div className="flex-1 overflow-hidden p-6">
              <div className="h-full bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🧠</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Interactive Mind Map</h3>
                  <p className="text-gray-600 mb-4">Visual representation of Machine Learning concepts</p>
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 max-w-md">
                    <p className="text-sm text-gray-700">
                      In a real implementation, this would show an interactive mind map with expandable nodes 
                      showing the relationships between different ML concepts like supervised learning, 
                      unsupervised learning, algorithms, and applications.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
