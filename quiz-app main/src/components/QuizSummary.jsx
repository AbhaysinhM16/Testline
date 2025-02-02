import React from 'react';
import './styles/QuizQuestion.css';

function QuizSummary({ quizData, selectedAnswers, score, totalQuestions, onRestartQuiz }) {
  return (
    <div className="quiz-summary-container">
      <h2>Quiz Completed!</h2>
      <p className="score">
        Your Score: <strong>{score}</strong> out of <strong>{totalQuestions}</strong>
      </p>
      <div className="results">
        {quizData.map((question) => {
          const selectedAnswer = selectedAnswers[question.id];
          
          return (
            <div key={question.id} className="question-result">
              <h4>{question.description}</h4>
              <div className="options">
                {question.options.map((option) => {
                  const isSelected = selectedAnswer === option.id;
                  const isCorrect = option.is_correct;

                  return (
                    <div
                      key={option.id}
                      className={`option ${isSelected ? (isCorrect ? 'correct' : 'incorrect') : ''} ${isCorrect ? 'correct-answer' : ''}`}
                    >
                      {option.description}
                      {isSelected && !isCorrect && (
                        <span className="feedback">✗</span>
                      )}
                      {isCorrect && (
                        <span className="feedback">✓</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <button className="restart-quiz-button" onClick={onRestartQuiz}>
        Restart Quiz
      </button>
    </div>
  );
}

export default QuizSummary;