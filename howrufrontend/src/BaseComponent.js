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
import Toolbar from './components/Toolbar/Toolbar'
import coffe from './coffe.jpg';


class Base extends React.Component {
    render() {
        return (
            <Router>
              
                <div className="startmenu"> 
                   <Toolbar />
                    <img src={coffe} style={{ width: "350px" }} />
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

