import React from 'react';
import ReactDOM from 'react-dom';

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';

import App from './components/App.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

ReactDOM.render(
  <App />,
  document.getElementById('chat'),
);
