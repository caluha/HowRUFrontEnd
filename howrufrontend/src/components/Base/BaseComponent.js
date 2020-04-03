import React from 'react';
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import QuestionSet from '../QuestionSet/QuestionSet';
import coffee2 from '../../images/coffee2.jpg';
import Navbar from './Navbar';
import QuestionSetButton from './QuestionSetButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateQuestionSet from '../CreateEdit/CreateQuestionSet';
import LoginPage from '../Login/LoginPage'
import RegistrationPage from '../Registration/RegistrationPage';
import ChartsPage from '../presentation/graphTest';

class Base extends React.Component {

    constructor(props) {
        super(props);
        let myStorage = window.localStorage;
        let loginData = {
            loggedIn:false,
            user:""
        }
        if(myStorage.getItem("loggedIn")==="true"){
            loginData={
                loggedIn:true,
                user:myStorage.getItem("user"),
            }
        }

        this.state = {
            loginData:loginData ,
            questionSet: []
        }
        this.handleLogin = this.handleLogin.bind(this);
    }

    getAllQuestionSets = () => {

        if(this.state.loginData.loggedIn){
            console.log(this.state.loginData)
            let url = "http://localhost:8080/questionset/user/"+this.state.loginData.user;
            console.log(url);
            fetch(url)
                .then(result => result.json() )
                .then(result => {
                    this.setState({questionSet: result})

                    console.log(result)
                })
        }
    }

    componentDidMount() {
        this.getAllQuestionSets();
    }

    handleLogin(data) {

        console.log(data); 
        let myStorage = window.localStorage;

        myStorage.setItem("user", data.username);
        myStorage.setItem("loggedIn", data.loggedIn);

        this.setState({loginData:data})
    }

    logOut = () => {
        let myStorage = window.localStorage;
        myStorage.setItem("user","");
        myStorage.setItem("loggedIn", "false");

        this.setState({loginData:{
                                loggedIn:false,
                                user:""}
                            })
    }
    

    render() {
        
        if(!this.state.loginData.loggedIn){
            console.log(this.state.loginData);
            return(
                <div style={{ height: "100%" }}>
                    <div className="mainpage">
                        <Router>
                            <Switch>
                                <Route exact path="/registrate">
                                    <RegistrationPage />
                                </Route>

                                <Route path="/">
                                    <LoginPage handleLogin={this.handleLogin} />
                                </Route>
                            </Switch>
                        </Router>
                    </div>
                </div>
            );
        }
        
        return (
            <div style={{ height: "100%" }}>
                <div className="mainpage">
                    <Router>
                        <Navbar />
                        <Switch>
                            <Route exact path="/">
                                <img src={coffee2} style={{ width: "360px" }} />
                                <div>
                                    {questionSetFactory(this.state.questionSet)}
                                </div>
                            </Route>
                            <Route exact path="/create">
                               <CreateQuestionSet />
                            </Route>
                        
                            <Route exact path='/chart'>
                                <ChartsPage/>
                            </Route>
                            {routeFactory(this.state.questionSet)}
                        </Switch>
                    </Router>
                   
                </div>
            </div>

        );
    }
}

function questionSetFactory(questionSets) {
    if(questionSets.length>0){
        return questionSets.map((e) => <QuestionSetButton key={e.id} id={e.id} name={e.name} />)
    } else {
        return <p>Create some question sets?</p>
    }
}

function routeFactory(questionSets) {
    if(questionSets.length>0){
        return questionSets.map((e) => 
            <Route key={e.id} path={"/" + e.name}>
                <QuestionSet id={e.id} questionSet={e}/>
            </Route>)
    } else {
        return null;
    }
}

export default Base;

