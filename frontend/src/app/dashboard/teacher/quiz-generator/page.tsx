'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  Plus, 
  Trash2, 
  Edit, 
  Save, 
  Brain, 
  FileText, 
  HelpCircle,
  CheckCircle,
  AlertCircle,
  Download,
  Eye
} from 'lucide-react';

export default function QuizGeneratorPage() {
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [selectedContent, setSelectedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQuiz, setGeneratedQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);

  const contentOptions = [
    { id: 'ml-fundamentals', title: 'Machine Learning Fundamentals', type: 'PDF' },
    { id: 'python-basics', title: 'Python Programming Basics', type: 'Video' },
    { id: 'statistics', title: 'Statistics and Probability', type: 'PDF' },
    { id: 'data-science', title: 'Data Science Introduction', type: 'Link' },
  ];

  const generateQuiz = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockQuiz = {
      title: quizTitle || 'Flashcard-Style MCQ Quiz',
      description: quizDescription || 'Interactive flashcard-style multiple choice questions for better learning',
      questions: [
        {
          id: 1,
          question: "What is the primary goal of supervised learning?",
          type: "flashcard_mcq",
          options: [
            "To learn without any guidance",
            "To predict outcomes based on labeled training data",
            "To cluster similar data points",
            "To reduce dimensionality of data"
          ],
          correctAnswer: 1,
          explanation: "Supervised learning uses labeled training data to learn a mapping from inputs to outputs.",
          flashcard_front: "What is supervised learning?",
          flashcard_back: "A machine learning approach that uses labeled training data to learn patterns and make predictions on new, unseen data.",
          difficulty: "Easy",
          category: "Fundamentals"
        },
        {
          id: 2,
          question: "Which of the following is NOT a type of machine learning?",
          type: "flashcard_mcq",
          options: [
            "Supervised Learning",
            "Unsupervised Learning",
            "Reinforcement Learning",
            "Deterministic Learning"
          ],
          correctAnswer: 3,
          explanation: "Deterministic learning is not a recognized type of machine learning.",
          flashcard_front: "Types of machine learning?",
          flashcard_back: "Supervised, Unsupervised, and Reinforcement Learning are the three main types.",
          difficulty: "Medium",
          category: "Classification"
        },
        {
          id: 3,
          question: "What does the term 'overfitting' mean in machine learning?",
          type: "flashcard_mcq",
          options: [
            "The model performs well on training data but poorly on test data",
            "The model is too simple to capture patterns",
            "The model has too few parameters",
            "The model is perfectly balanced"
          ],
          correctAnswer: 0,
          explanation: "Overfitting occurs when a model learns the training data too well, including noise, and fails to generalize to new data.",
          flashcard_front: "What is overfitting?",
          flashcard_back: "When a model learns training data too well, including noise, resulting in poor performance on new data.",
          difficulty: "Hard",
          category: "Model Evaluation"
        }
      ],
      metadata: {
        difficulty: "Mixed (Easy to Hard)",
        estimatedTime: "15 minutes",
        totalQuestions: 3,
        generatedAt: new Date().toISOString(),
        type: "Flashcard-Style MCQ",
        categories: ["Fundamentals", "Classification", "Model Evaluation"]
      }
    };
    
    setGeneratedQuiz(mockQuiz);
    setQuestions(mockQuiz.questions);
    setIsGenerating(false);
  };

  const saveQuiz = () => {
    // In a real app, this would save the quiz to the teacher's quiz section
    alert('Quiz saved to your Quiz Management section!');
  };

  const addCustomQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      question: "",
      type: "multiple_choice",
      options: ["", "", "", ""],
      correctAnswer: 0,
      explanation: "",
      isCustom: true
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (index: number, field: string, value: any) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
    setQuestions(updatedQuestions);
  };

  const deleteQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  return (
    <DashboardLayout userType="teacher">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Flashcard-Style Quiz Generator</h1>
          <p className="text-gray-600">Create interactive flashcard-style MCQ quizzes using AI or build them manually</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quiz Configuration */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 sticky top-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quiz Settings</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quiz Title
                  </label>
                  <input
                    type="text"
                    value={quizTitle}
                    onChange={(e) => setQuizTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter quiz title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={quizDescription}
                    onChange={(e) => setQuizDescription(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe the quiz content"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Source Content
                  </label>
                  <select
                    value={selectedContent}
                    onChange={(e) => setSelectedContent(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select content to base quiz on</option>
                    {contentOptions.map(option => (
                      <option key={option.id} value={option.id}>
                        {option.title} ({option.type})
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={generateQuiz}
                  disabled={isGenerating || !selectedContent}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Generating Quiz...
                    </>
                  ) : (
                    <>
                      <Brain className="w-5 h-5 mr-2" />
                      Generate with AI
                    </>
                  )}
                </button>

                <div className="border-t border-gray-200 pt-4">
                  <button
                    onClick={addCustomQuestion}
                    className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Custom Question
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Questions Editor */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Questions</h2>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <Eye className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <Download className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={saveQuiz}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Quiz</span>
                  </button>
                </div>
              </div>

              {questions.length === 0 ? (
                <div className="text-center py-12">
                  <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No questions yet</h3>
                  <p className="text-gray-600 mb-4">Generate questions with AI or add them manually</p>
                  <button
                    onClick={addCustomQuestion}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add First Question
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {questions.map((question, index) => (
                    <div key={question.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="font-semibold text-gray-900">Question {index + 1}</h3>
                        <div className="flex items-center space-x-2">
                          {question.isCustom && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                              Custom
                            </span>
                          )}
                          <button
                            onClick={() => deleteQuestion(index)}
                            className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Question Text
                          </label>
                          <textarea
                            value={question.question}
                            onChange={(e) => updateQuestion(index, 'question', e.target.value)}
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your question"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Answer Options
                          </label>
                          <div className="space-y-2">
                            {question.options.map((option: string, optionIndex: number) => (
                              <div key={optionIndex} className="flex items-center space-x-3">
                                <input
                                  type="radio"
                                  name={`correct-${index}`}
                                  checked={question.correctAnswer === optionIndex}
                                  onChange={() => updateQuestion(index, 'correctAnswer', optionIndex)}
                                  className="w-4 h-4 text-blue-600"
                                />
                                <input
                                  type="text"
                                  value={option}
                                  onChange={(e) => {
                                    const newOptions = [...question.options];
                                    newOptions[optionIndex] = e.target.value;
                                    updateQuestion(index, 'options', newOptions);
                                  }}
                                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  placeholder={`Option ${optionIndex + 1}`}
                                />
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Explanation (Optional)
                          </label>
                          <textarea
                            value={question.explanation}
                            onChange={(e) => updateQuestion(index, 'explanation', e.target.value)}
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Explain why this is the correct answer"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {generatedQuiz && (
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-blue-900">Quiz Generated Successfully!</span>
                  </div>
                  <p className="text-sm text-blue-800">
                    Generated {generatedQuiz.questions.length} questions in {generatedQuiz.metadata.difficulty.toLowerCase()} difficulty.
                    Estimated time: {generatedQuiz.metadata.estimatedTime}.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
