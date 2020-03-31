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
import coffe from './coffe.jpg';
import Navbar from './components/Navbar';


class Base extends React.Component {


    render() {

        return (
            <div style={{ height: "100%" }}>
                <div className="startmenu">
                    <Router>
                        <Navbar />
                        <img src={coffe} style={{ width: "375px" }} />
                        <div className="box" id="green_box" >
                            <Link to="/migraine">Migraine</Link>
                            <button id="pen"> x </button>
                        </div>
                        <div className="box" id="red_box">
                            <Link to="/feelz">Feelz</Link>
                        </div>
                        <div className="box" id="lightred_box">
                            Journal
                        </div>
                        <div className="box" id="green_box">
                            Create own
                        </div>
                        <div className="box" id="lightred_box">
                            Calender
                        </div>
                        <div className="floating-menu-icon">
                        <Link to="/new">New Tracker +</Link>
                        </div>


                        <Switch>
                            <Route path="/migraine">
                                <Migraine />
                            </Route>
                            <Route path="/feelz">
                                <Feelz />
                            </Route>
                        </Switch>
                    </Router>
                </div>
            </div>



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

