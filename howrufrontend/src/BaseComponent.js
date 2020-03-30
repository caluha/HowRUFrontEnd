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



class Base extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Router>
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

            </React.Fragment>
        );
    }
}

function Migraine() {
    return (
        <QuestionSet />
    )
}

function Feelz() {
    return <h2>Feelz</h2>
}



export default Base;

