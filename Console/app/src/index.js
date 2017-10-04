// React Components
import React from 'react';
import ReactDOM from 'react-dom';

// Application Components
import App from './App.js';

// Worker
import registerServiceWorker from './registerServiceWorker';

// Create Application
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
