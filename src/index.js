import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import initFirebase from './initFirebase';

initFirebase();

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();