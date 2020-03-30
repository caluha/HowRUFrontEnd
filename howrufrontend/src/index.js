import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Feelz1 from './Feelz1.js';

ReactDOM.render(<Feelz1/>, document.getElementById('root'));

serviceWorker.unregister();
