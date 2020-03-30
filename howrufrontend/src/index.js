import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
   <h1>All Dem Feelz</h1>
   <div class="box">Text 1</div>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
