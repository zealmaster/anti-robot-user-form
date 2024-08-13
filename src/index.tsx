import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SuccessPage } from './components/SuccessPage';
import { SubmitModal } from './components/submit-modal';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
     <SuccessPage/>
  </React.StrictMode>
);