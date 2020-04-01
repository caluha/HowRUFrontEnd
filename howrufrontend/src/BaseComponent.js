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
                                <img src={coffe} style={{ width: "350px" }} />
                     
                                <div>
                                    {questionSetFactory()}
                                </div>
                            </Route>
                            <Route path="/migraine test">
                                <Migraine />
                            </Route>
                            <Route path="/feelz test">
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

function questionSetFactory(){

    return mockQuestionSet.map((e) => <QuestionSetButton id={e.id} name={e.name}/>)
                              
}

function routeFactory(){

}

export default Base;

