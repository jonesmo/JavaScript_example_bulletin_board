import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './Board';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(<Board count={0}/>, document.getElementById('root'));
registerServiceWorker();
