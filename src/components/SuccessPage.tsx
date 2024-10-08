import React, { useState } from "react";
import "../App.css";

export function SuccessPage() {
  const name = localStorage.getItem("name");
  return (
    <div className="success-page">
      <div className="modal">
        <h1 className="title">Congratulations!</h1>
        <div className="description">
          <p>Form completed successfully. Easy peasy, right? </p>
          <p>{name}, you are human after all.</p>
          Thank you for confirming you're not a robot.
          See you around!
        </div>
        <button
          className="return-home-button"
          onClick={() => (window.location.href = "/")}
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}
