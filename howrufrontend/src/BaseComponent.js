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
import {NavLink} from "react-router-dom";


class Base extends React.Component {
   

    render() {
        
        return (
            <div style={{ height: "100%" }}>
                <div className="startmenu">
                    <Router>
                    <Navbar />   
                        <Switch>
                            <Route exact path="/">
                                <img src={coffe} style={{ width: "350px" }} />
                                <div className="box" id="lightred_box">
                                    <NavLink exact to="/migraine">Migraine</NavLink>
                                </div>
                                <div className="box" id="lightred_box">
                                    <NavLink exact to="/feelz">Feelz</NavLink>
                                </div>
                                <div className="box" id="red_box">
                                    Journal
                                </div>
                                <div className="box" id="lightred_box">
                                    Create own
                                </div>
                                <div className="box" id="green_box">
                                    Calender
                                </div>
                            </Route>
                            <Route path="/migraine">
                                <Migraine />
                            </Route>
                            <Route path="/feelz">
                                <Feelz />
                            </Route>
                        </Switch>
                       
                        <div className="floating-menu-icon">
                            <Link to="/new">New Tracker +</Link>
                        </div>
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

