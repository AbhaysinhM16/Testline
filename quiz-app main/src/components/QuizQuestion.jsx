import React from 'react';
import './styles/QuizQuestion.css';

function QuizQuestion({ question, selectedAnswer, onAnswerClick }) {
  if (!question) {
    return <div>Loading question...</div>;
  }

  return (
    <div className="quiz-question">
      <h2>{question.description}</h2>
      <div className="options">
        {question.options.map((option) => {
          const isSelected = selectedAnswer === option.id;
          const isCorrect = option.is_correct;

          return (
            <button
              key={option.id}
              className={`option-button ${isSelected ? 'selected' : ''}`}
              onClick={() => onAnswerClick(question.id, option.id, isCorrect)}
            >
              {option.description}
              {isSelected && (
                <span className="feedback-icon">
                  {isCorrect ? ' ✔️' : ' ❌'}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default QuizQuestion;