import React from 'react';
import './styles/QuizQuestion.css';

function QuizStart({ onStartQuiz }) {
  return (
    <div className="quiz-start-container">
      <h1>Welcome to the Testline Quiz App</h1>
      <div className="quiz-description">
        <p>Test your knowledge!</p>
        <ul>
          <li><strong>10 Questions</strong> to challenge your skills.</li>
          <li><strong>1 Mark</strong> for each correct answer.</li>
          <li><strong>0 Marks</strong> for incorrect answers.</li>
        </ul>
       
      </div>
      <button className="start-quiz-button" onClick={onStartQuiz}>
        Start Quiz
      </button>
    </div>
  );
}

export default QuizStart;