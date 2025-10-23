import React, { useState } from 'react';
import quizData from '../../data/quiz.json';
import './IslamicQuizPage.css';

function IslamicQuizPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [randomQuestions, setRandomQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  const QUESTIONS_PER_QUIZ = 10;

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const startQuiz = (category) => {
    const shuffled = shuffleArray(category.questions);
    const selected = shuffled.slice(0, Math.min(QUESTIONS_PER_QUIZ, category.questions.length));
    
    setSelectedCategory(category);
    setRandomQuestions(selected);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions([]);
  };

  const handleAnswerSelect = (answerIndex) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    const currentQuestion = randomQuestions[currentQuestionIndex];
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      setScore(score + 1);
    }

    setAnsweredQuestions([...answeredQuestions, {
      question: currentQuestion.question,
      selectedAnswer: answerIndex,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect: isCorrect
    }]);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < randomQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
      const percentage = Math.round(((score + (selectedAnswer === randomQuestions[currentQuestionIndex].correctAnswer ? 1 : 0)) / randomQuestions.length) * 100);
      
      const savedStats = JSON.parse(localStorage.getItem('userStats') || '{}');
      savedStats.quizScores = savedStats.quizScores || [];
      savedStats.quizScores.push(percentage);
      localStorage.setItem('userStats', JSON.stringify(savedStats));
    }
  };

  const resetQuiz = () => {
    setSelectedCategory(null);
    setRandomQuestions([]);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions([]);
  };

  if (!selectedCategory) {
    return (
      <div className="quiz-page">
        <div className="container">
          <div className="page-header">
            <h1>🎯 الأسئلة الإسلامية التفاعلية</h1>
            <p className="page-description">
              اختبر معلوماتك الإسلامية في مواضيع متنوعة - أسئلة عشوائية في كل مرة!
            </p>
          </div>

          <div className="categories-grid">
            {quizData.categories.map((category) => (
              <div
                key={category.id}
                className="quiz-category-card"
                onClick={() => startQuiz(category)}
              >
                <div className="category-icon-large">{category.icon}</div>
                <h3>{category.name}</h3>
                <p className="questions-count">
                  {Math.min(QUESTIONS_PER_QUIZ, category.questions.length)} سؤال عشوائي
                </p>
                <p className="total-questions">
                  من أصل {category.questions.length} سؤال متوفر
                </p>
                <button className="start-btn">ابدأ الاختبار</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (showResult) {
    const percentage = Math.round((score / randomQuestions.length) * 100);
    const getMessage = () => {
      if (percentage >= 90) return { text: "ممتاز! أداء رائع 🌟", color: "#4CAF50" };
      if (percentage >= 70) return { text: "جيد جداً! استمر 👍", color: "#2196F3" };
      if (percentage >= 50) return { text: "جيد، لكن يمكنك تحسين أدائك 💪", color: "#FF9800" };
      return { text: "حاول مرة أخرى 📚", color: "#F44336" };
    };
    
    const message = getMessage();

    return (
      <div className="quiz-page">
        <div className="container">
          <div className="result-card">
            <h2>🎉 انتهى الاختبار!</h2>
            <div className="score-circle" style={{ borderColor: message.color }}>
              <div className="score-text">
                <span className="score-number">{score}</span>
                <span className="score-total">/{randomQuestions.length}</span>
              </div>
              <div className="score-percentage" style={{ color: message.color }}>
                {percentage}%
              </div>
            </div>
            <p className="result-message" style={{ color: message.color }}>
              {message.text}
            </p>
            
            <div className="result-stats">
              <div className="stat-item">
                <span className="stat-icon">✅</span>
                <span className="stat-value">{score} إجابة صحيحة</span>
              </div>
              <div className="stat-item">
                <span className="stat-icon">❌</span>
                <span className="stat-value">{randomQuestions.length - score} إجابة خاطئة</span>
              </div>
            </div>
            
            <div className="result-actions">
              <button className="btn-primary" onClick={() => startQuiz(selectedCategory)}>
                🔄 أعد الاختبار (أسئلة جديدة)
              </button>
              <button className="btn-secondary" onClick={resetQuiz}>
                📚 اختر فئة أخرى
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = randomQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / randomQuestions.length) * 100;

  return (
    <div className="quiz-page">
      <div className="container">
        <div className="quiz-header">
          <button className="back-btn" onClick={resetQuiz}>← رجوع</button>
          <h2>{selectedCategory.name}</h2>
          <div className="question-counter">
            {currentQuestionIndex + 1} / {randomQuestions.length}
          </div>
        </div>

        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>

        <div className="question-card">
          <h3 className="question-text">{currentQuestion.question}</h3>
          
          <div className="answers-grid">
            {currentQuestion.options.map((option, index) => {
              let className = "answer-option";
              if (selectedAnswer !== null) {
                if (index === currentQuestion.correctAnswer) {
                  className += " correct";
                } else if (index === selectedAnswer) {
                  className += " wrong";
                }
              }
              
              return (
                <button
                  key={index}
                  className={className}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={selectedAnswer !== null}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {selectedAnswer !== null && (
            <div className="explanation-box">
              <div className={`result-indicator ${selectedAnswer === currentQuestion.correctAnswer ? 'correct' : 'wrong'}`}>
                {selectedAnswer === currentQuestion.correctAnswer ? '✓ إجابة صحيحة!' : '✗ إجابة خاطئة'}
              </div>
              <p className="explanation-text">{currentQuestion.explanation}</p>
              <button className="next-btn" onClick={nextQuestion}>
                {currentQuestionIndex < randomQuestions.length - 1 ? 'السؤال التالي →' : 'عرض النتيجة'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default IslamicQuizPage;
