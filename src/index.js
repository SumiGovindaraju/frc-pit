import React from 'react';
import ReactDOM from 'react-dom';
import './css/bootstrap.min.css';
import './css/fontawesome-all.min.css';
import './css/style.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import initFirebase from './util/initFirebase';

console.log(process.env);
initFirebase();

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();