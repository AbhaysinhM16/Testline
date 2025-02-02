import React from 'react';
import '/styles/Header.css';

function Header({ currentQuestionIndex, totalQuestions }) {
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="header">
      <h1>Testline Quiz App</h1>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
}

export default Header;