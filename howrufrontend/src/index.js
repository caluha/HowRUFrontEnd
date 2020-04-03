import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Base from '../src/components/Base/BaseComponent';
import ChartsPage from '../src/components/presentation/graphTest'

ReactDOM.render(<Base/>, document.getElementById('root'));

serviceWorker.unregister();
