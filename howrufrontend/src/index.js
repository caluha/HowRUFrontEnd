import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Base from '../src/components/Base/BaseComponent';
import { Router} from "react-router-dom";
import history from "./history";


ReactDOM.render(
<Router history={history}>
    <Base/>
</Router>
    , document.getElementById('root'));

serviceWorker.unregister();
