import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import QuestionSet from '../QuestionSet/QuestionSet';
import coffee2 from '../../images/coffee2.jpg';
import { NavLink } from "react-router-dom";
import Navbar from '../Navbar';
import mockQuestionSet from '../../json/mockQuestionSet.json';
import QuestionSetButton from './QuestionSetButton';

import CreateQuestionSet from '../CreateEdit/CreateQuestionSet';




class Base extends React.Component {


    render() {
        return (
            <div style={{ height: "100%" }}>
                <div className="mainpage">
                    <Router>
                        <Navbar />
                        <Switch>
                            <Route exact path="/">
                                <img src={coffee2} style={{ width: "360px" }} />
                                <div>
                                    {questionSetFactory()}
                                </div>
                            </Route>
                            <Route exact path="/create">
                               <CreateQuestionSet />
                            </Route>
                            {routeFactory()}
                        </Switch>
                    </Router>
                   
                </div>
            </div>

        );
    }
}

function questionSetFactory() {
    return mockQuestionSet.map((e) => <QuestionSetButton key={e.id} id={e.id} name={e.name} />)
}

function routeFactory() {
    return mockQuestionSet.map((e) => <Route key={e.id} path={"/" + e.name}><QuestionSet /></Route>)
}

export default Base;
