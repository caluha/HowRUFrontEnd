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
import coffe from './images/coffe.jpg';
import edit_01 from './images/edit_01.png';
import answered_01 from './images/answered_01.png';
import unanswered_01 from './images/unanswered_01.png';
import Navbar from './components/Navbar';
import {NavLink} from "react-router-dom";


class Base extends React.Component {
   

    render() {
        
        return (
            <div style={{ height: "100%" }}>
                <div className="mainpage">
                    <Router>
                    <Navbar />   
                        <Switch>
                            <Route exact path="/">
                                <img src={coffe} style={{ width: "350px" }} />
                                <div className="box" id="lightred_box">
                                <NavLink exact to="/unchecked"><a className="pen"><img src={unanswered_01} style={{height:"25px"}} /></a></NavLink>
                                <NavLink exact to="/"><a className="pen"><img src={edit_01} style={{height:"25px"}} /></a></NavLink>
                                    <NavLink exact to="/migraine">Migraine</NavLink>
                                </div>
                                <div className="box" id="lightred_box">
                                <NavLink exact to="/check"><a className="pen"><img src={answered_01} style={{height:"25px"}} /></a></NavLink>
                                <NavLink exact to="/"><a className="pen"><img src={edit_01} style={{height:"25px"}} /></a></NavLink>
                                    <NavLink exact to="/feelz">Feelz</NavLink>
                                </div>
                                <div className="box" id="red_box">
                                <NavLink exact to="/check"><a className="pen"><img src={answered_01} style={{height:"25px"}} /></a></NavLink>
                                <NavLink exact to="/"><a className="pen"><img src={edit_01} style={{height:"25px"}} /></a></NavLink>
                                    Journal
                                </div>
                                <div className="box" id="lightred_box">
                                <NavLink exact to="/check"><a className="pen"><img src={answered_01} style={{height:"25px"}} /></a></NavLink>
                                <NavLink exact to="/"><a className="pen"><img src={edit_01} style={{height:"25px"}} /></a></NavLink>
                                    Create own
                                </div>
                                <div className="box" id="green_box">
                                <NavLink exact to="/unchecked"><a className="pen"><img src={unanswered_01} style={{height:"25px"}} /></a></NavLink>
                                <NavLink exact to="/"><a className="pen"><img src={edit_01} style={{height:"25px"}} /></a></NavLink>
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

