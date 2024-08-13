import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import { SuccessPage } from './components/SuccessPage'; // Use named import here

const MainRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/success" element={<SuccessPage />} /> {/* Corrected import */}
      </Routes>
    </Router>
  );
};

export default MainRouter;
