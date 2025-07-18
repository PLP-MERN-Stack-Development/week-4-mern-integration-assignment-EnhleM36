import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { BlogProvider } from './context/blogContext';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <BlogProvider>
      <Router>
        <App />
      </Router>
    </BlogProvider>
  </React.StrictMode>,
  document.getElementById('root')
);