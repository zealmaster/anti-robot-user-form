import React from 'react';
import '../App.css';

export function SuccessPage() {
  return (
    <div className="success-page">
      <div className="modal">
        <h1 className="title">Congratulations!</h1>
        <p className="description">
          You've successfully completed the verification.
          <br />
          Thank you for confirming you're not a robot!
        </p>
        <button 
          className="return-home-button" 
          onClick={() => window.location.href = '/' /* Example redirect */}
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}
