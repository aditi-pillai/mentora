'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  HelpCircle, 
  Clock, 
  Award, 
  Play, 
  BookOpen, 
  TrendingUp,
  CheckCircle,
  XCircle,
  ArrowRight,
  Star,
  Filter
} from 'lucide-react';

export default function QuizzesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isTakingQuiz, setIsTakingQuiz] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState<any>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const categories = [
    { id: 'all', label: 'All Quizzes', count: 12 },
    { id: 'ai', label: 'AI & ML', count: 4 },
    { id: 'programming', label: 'Programming', count: 3 },
    { id: 'math', label: 'Mathematics', count: 2 },
    { id: 'science', label: 'Science', count: 3 },
  ];

  const quizzes = [
    {
      id: 1,
      title: 'Machine Learning Fundamentals',
      description: 'Test your understanding of basic ML concepts and algorithms',
      category: 'ai',
      questionCount: 15,
      duration: '20 min',
      difficulty: 'Beginner',
      attempts: 3,
      bestScore: 85,
      isCompleted: false,
      isStarred: true,
      questions: [
        {
          question: "What is supervised learning?",
          options: [
            "Learning without any guidance",
            "Learning with input-output pairs",
            "Learning through trial and error",
            "Learning from unlabeled data"
          ],
          correct: 1
        },
        {
          question: "Which algorithm is used for classification?",
          options: [
            "Linear Regression",
            "K-Means Clustering",
            "Decision Tree",
            "Principal Component Analysis"
          ],
          correct: 2
        }
      ]
    },
    {
      id: 2,
      title: 'Python Data Structures',
      description: 'Evaluate your knowledge of Python lists, dictionaries, and tuples',
      category: 'programming',
      questionCount: 12,
      duration: '15 min',
      difficulty: 'Intermediate',
      attempts: 1,
      bestScore: 92,
      isCompleted: true,
      isStarred: false,
      questions: []
    },
    {
      id: 3,
      title: 'Statistics and Probability',
      description: 'Mathematical foundations for data science and analytics',
      category: 'math',
      questionCount: 20,
      duration: '30 min',
      difficulty: 'Advanced',
      attempts: 0,
      bestScore: 0,
      isCompleted: false,
      isStarred: true,
      questions: []
    },
    {
      id: 4,
      title: 'Deep Learning Basics',
      description: 'Introduction to neural networks and deep learning concepts',
      category: 'ai',
      questionCount: 18,
      duration: '25 min',
      difficulty: 'Intermediate',
      attempts: 2,
      bestScore: 78,
      isCompleted: false,
      isStarred: false,
      questions: []
    }
  ];

  const filteredQuizzes = selectedCategory === 'all' 
    ? quizzes 
    : quizzes.filter(quiz => quiz.category === selectedCategory);

  const startQuiz = (quiz: any) => {
    setCurrentQuiz(quiz);
    setIsTakingQuiz(true);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
  };

  const submitAnswer = () => {
    if (selectedAnswer !== null && currentQuiz) {
      const question = currentQuiz.questions[currentQuestion];
      if (parseInt(selectedAnswer) === question.correct) {
        setScore(score + 1);
      }
    }
  };

  const nextQuestion = () => {
    submitAnswer();
    if (currentQuestion < currentQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      // Quiz completed
      setIsTakingQuiz(false);
      setCurrentQuiz(null);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'Advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (isTakingQuiz && currentQuiz) {
    const question = currentQuiz.questions[currentQuestion];
    const progress = ((currentQuestion + 1) / currentQuiz.questions.length) * 100;

    return (
      <DashboardLayout userType="student">
        <div className="p-6 max-w-4xl mx-auto">
          {/* Quiz Header */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{currentQuiz.title}</h1>
                <p className="text-gray-600">Question {currentQuestion + 1} of {currentQuiz.questions.length}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Clock className="w-5 h-5" />
                  <span>Time remaining: 15:32</span>
                </div>
                <button
                  onClick={() => setIsTakingQuiz(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">{question.question}</h2>
            
            <div className="space-y-3">
              {question.options.map((option: string, index: number) => (
                <label
                  key={index}
                  className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedAnswer === index.toString()
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="answer"
                    value={index}
                    checked={selectedAnswer === index.toString()}
                    onChange={(e) => setSelectedAnswer(e.target.value)}
                    className="sr-only"
                  />
                  <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                    selectedAnswer === index.toString()
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedAnswer === index.toString() && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span className="text-gray-900">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => setIsTakingQuiz(false)}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Exit Quiz
            </button>
            <button
              onClick={nextQuestion}
              disabled={selectedAnswer === null}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <span>{currentQuestion === currentQuiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userType="student">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Practice Quizzes</h1>
          <p className="text-gray-600">Test your knowledge and track your progress</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Quizzes</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <HelpCircle className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Score</p>
                <p className="text-2xl font-bold text-gray-900">85%</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Study Time</p>
                <p className="text-2xl font-bold text-gray-900">2.5h</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-gray-400" />
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category.label} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Quiz Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuizzes.map(quiz => (
            <div key={quiz.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <HelpCircle className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(quiz.difficulty)}`}>
                      {quiz.difficulty}
                    </span>
                  </div>
                </div>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <Star className={`w-4 h-4 ${quiz.isStarred ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
                </button>
              </div>

              <h3 className="font-semibold text-gray-900 mb-2">{quiz.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{quiz.description}</p>

              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                <span className="flex items-center space-x-1">
                  <HelpCircle className="w-4 h-4" />
                  <span>{quiz.questionCount} questions</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{quiz.duration}</span>
                </span>
              </div>

              {quiz.isCompleted && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-green-800">Best Score</span>
                    <span className="text-lg font-bold text-green-900">{quiz.bestScore}%</span>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  {quiz.attempts > 0 ? `${quiz.attempts} attempts` : 'Not attempted'}
                </div>
                <button
                  onClick={() => startQuiz(quiz)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Play className="w-4 h-4" />
                  <span>{quiz.isCompleted ? 'Retake' : 'Start Quiz'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
