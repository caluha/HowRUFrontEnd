import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import './index.css';
import QuestionSet from './QuestionSet';
import coffee2 from './images/coffee2.jpg';
import edit_01 from './images/edit_01.png';
import answered_01 from './images/answered_01.png';
import arrow from './images/arrow.png';
import unanswered_01 from './images/unanswered_01.png';
import {NavLink} from "react-router-dom";
import Navbar from './components/Navbar';
import mockQuestionSet from './mockQuestionSet';
import QuestionSetButton from './QuestionSetButton';


class Base extends React.Component {


    render() {

        return (
            <div style={{ height: "100%" }}>
                <div className="mainpage">
                    <Router>
                        <Navbar />
                        <Switch>
                            <Route exact path="/">
                                <img src={coffee2} style={{ width: "350px" }} />
                                <div>
                                    {questionSetFactory()}
                                </div>
                            </Route>
                            {routeFactory()}
                        </Switch>
                        <div >
                            <Link to="/new"><button className="floating-menu-icon">New Tracker +</button></Link>
                        </div>
                    </Router>



                </div>
            </div>

        );
    }
}

function questionSetFactory(){

    return mockQuestionSet.map((e) => <QuestionSetButton id={e.id} name={e.name}/>)
                              
}

function routeFactory(){
    // return mockQuestionSet.map((e) => <RouteContainer id={e.id} name={e.name}/>)
    return mockQuestionSet.map((e) => <Route path={"/"+ e.name}><QuestionSet/></Route>)
}

export default Base;

