import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
   <h1>Hello you  mptherfucker World</h1>
   <div class="box"></div>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
