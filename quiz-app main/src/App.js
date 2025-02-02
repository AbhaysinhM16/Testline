import React, { useState, useEffect } from 'react';
import { fetchQuizData } from './utils/api';
import QuizStart from './components/QuizStart';
import QuizQuestion from './components/QuizQuestion';
import QuizSummary from './components/QuizSummary';
import './App.css';

function App() {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  

  useEffect(() => {
    const loadQuizData = async () => {
      try {
        const data = await fetchQuizData();
        if (!data || !data.questions || data.questions.length === 0) {
          throw new Error('No questions found in the API response.');
        }
        setQuizData(data.questions);
      } catch (error) {
        console.error('Error loading quiz data:', error);
        setError('Failed to load quiz data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadQuizData();
  }, []);

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleAnswerClick = (questionId, optionId, isCorrect) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: optionId,
    });

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleSubmit = () => {
   
    setQuizCompleted(true);
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizCompleted(false);
    setQuizStarted(false);
    setSelectedAnswers({});
    
  };

  if (loading) {
    return <div>Loading quiz data...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!quizData || quizData.length === 0) {
    return <div>No quiz data available.</div>;
  }

  return (
    <div className="app">
      {!quizStarted ? (
        <QuizStart onStartQuiz={handleStartQuiz} />
      ) : !quizCompleted ? (
        <div>
          <h1>Testline Quiz App</h1>
          <h3>
            <b>Question {currentQuestionIndex + 1} of {quizData.length}</b>
          </h3>
          <QuizQuestion
            question={quizData[currentQuestionIndex]}
            selectedAnswer={selectedAnswers[quizData[currentQuestionIndex].id]}
            onAnswerClick={handleAnswerClick}
          />
          <div>
            {currentQuestionIndex > 0 && (
              <button onClick={handlePreviousQuestion}>Previous</button>
            )}
            {currentQuestionIndex < quizData.length - 1 ? (
              <button
                onClick={handleNextQuestion}
                disabled={!selectedAnswers[quizData[currentQuestionIndex].id]}
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!selectedAnswers[quizData[currentQuestionIndex].id]}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      ) : (
        <QuizSummary
          quizData={quizData}
          selectedAnswers={selectedAnswers}
          score={score}
          totalQuestions={quizData.length}
          onRestartQuiz={handleRestartQuiz}
        />
      )}
    </div>
  );
}

export default App;