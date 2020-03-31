import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import QuestionSet from './QuestionSet';
import { ThemeProvider } from 'styled-components';
import Toolbar from './components/Toolbar/Toolbar'



class Base extends React.Component {
    render() {
        return (
                 
                <Router> 
                    <Toolbar />
                    
                    <div className="startmenu">

                        <div className="box" >
                            <Link to="/migraine">Migraine</Link>
                        </div>
                        <div className="box">
                            <Link to="/feelz">Feelz</Link>
                        </div>
                        <div className="box">
                            Journal
                        </div>
                        <div className="box">
                            Create own
                        </div>
                        <div className="box">
                            Calender
                    </div>

                        <Switch>
                            <Route path="/migraine">
                                <Migraine />
                            </Route>
                            <Route path="/feelz">
                                <Feelz />
                            </Route>
                        </Switch>
                    </div>
                </Router>

         

        );
    }
}

function Migraine() {
    return (
        <QuestionSet />
    )
}

function Feelz() {
    return <QuestionSet />
}

export default Base;

