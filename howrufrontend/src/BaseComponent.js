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
import coffee2 from './images/coffee2.jpg';
import {NavLink} from "react-router-dom";
import Navbar from './components/Navbar';
import mockQuestionSet from './mockQuestionSet';
import QuestionSetButton from './QuestionSetButton';
import APIConnection from './APIConnection';


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
                            {routeFactory()}
                        </Switch>
                        
                    </Router>

                <div className="grad1" />
                <div>
                    <APIConnection/>
                </div>
                    
                </div>
            </div>

        );
    }
}

function questionSetFactory(){
    return mockQuestionSet.map((e) => <QuestionSetButton key={e.id} id={e.id} name={e.name}/>)                   
}

function routeFactory(){
    return mockQuestionSet.map((e) => <Route key={e.id} path={"/"+ e.name}><QuestionSet/></Route>)
}

export default Base;

