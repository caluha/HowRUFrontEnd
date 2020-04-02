import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Base from './BaseComponent';
import LoginPage from './LoginPage';

ReactDOM.render(<LoginPage/>, document.getElementById('root'));

serviceWorker.unregister();
