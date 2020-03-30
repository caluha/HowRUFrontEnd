import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Feelz1 from './Feelz1.js';
import Routertest from './routertest.js';
import Base from './BaseComponent';

ReactDOM.render(<Base/>, document.getElementById('root'));

serviceWorker.unregister();
