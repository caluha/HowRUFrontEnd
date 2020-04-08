import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

import QuestionSet from '../QuestionSet/QuestionSet';
import coffee2 from '../../images/coffee2.jpg';
import Navbar from './Navbar';
import QuestionSetButton from './QuestionSetButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateQuestionSet from '../CreateEdit/CreateQuestionSet';
import LoginPage from '../Login/LoginPage'
import RegistrationPage from '../Registration/RegistrationPage';
import Graph from '../presentation/Graph';
import EditQuestionSetsList from '../EditQuestionSet/EditQuestionSetsList';
import EditQuestionSet from '../EditQuestionSet/EditQuestionSet';



class Base extends React.Component {

    constructor(props) {
        super(props);

        // console.log("Constructor ran");

        let myStorage = window.localStorage;
        let loginData = {
            loggedIn: false,
            user: ""
        }
        if (myStorage.getItem("loggedIn") === "true") {
            loginData = {
                loggedIn: true,
                user: myStorage.getItem("user"),
            }
        }

        this.state = {
            loginData: loginData,
            questionSet: []
        }
        this.handleLogin = this.handleLogin.bind(this);
        this.getAnsweredStates();
    }

    getAllQuestionSets = () => {

        if (this.state.loginData.loggedIn) {
            // console.log(this.state.loginData)
            // let url = "http://localhost:8080/questionset/user/" + this.state.loginData.user;
            let url = "http://ec2-13-53-42-207.eu-north-1.compute.amazonaws.com:8080/questionset/user/" + this.state.loginData.user; 
            console.log(url);
            fetch(url)
                .then(result => result.json())
                .then(result => {
                    this.setState({ questionSet: result })

                    // console.log(result)
                })
        }
    }

    getAnsweredStates = () => {
        //THIS SOMETIMES RESULTS IN answeredCheck BEING UNDEFINDED AND CRASHES THE PROGRAM.
        if (this.state.loginData.loggedIn) {
            // let url = "http://localhost:8080/questionsetanswered/user/" + this.state.loginData.user;
            let url = "http://ec2-13-53-42-207.eu-north-1.compute.amazonaws.com:8080/questionsetanswered/user/" + this.state.loginData.user; 
            console.log(url);
            fetch(url)
                .then(result => result.json())
                .then(result => {
                    this.setState({ answeredCheck: result })
                    console.log(result)
                })
        }
    }

    componentDidMount(){
        let myStorage = window.localStorage;
        if (myStorage.getItem("loggedIn") === "true") {
            let loginData = {
                loggedIn: true,
                user: myStorage.getItem("user"),
            }
            this.setState({ loginData: loginData }, this.getAllQuestionSets);
            
            console.log(this.state.answeredCheck);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        let myStorage = window.localStorage;
        if (myStorage.getItem("loggedIn") === "true") {
            if (myStorage.getItem("user") != this.state.loginData.user) {
                let loginData = {
                    loggedIn: true,
                    user: myStorage.getItem("user"),
                }
                this.setState({ loginData: loginData }, this.getAllQuestionSets);
            }
        }
    }

    handleLogin(data) {

        console.log(data);
        let myStorage = window.localStorage;

        myStorage.setItem("user", data.username);
        myStorage.setItem("loggedIn", data.loggedIn);

        this.forceUpdate();
        //
    }

    logOut = () => {
        let myStorage = window.localStorage;
        myStorage.setItem("user", "");
        myStorage.setItem("loggedIn", "false");

        this.setState({
            loginData: {
                loggedIn: false,
                user: ""
            },
            questionSet: []
        })

    }

    questionSetFactory = (questionSets) => {
    
        if (questionSets.length > 0) {
            let answeredMap = new Map(Object.entries(this.state.answeredCheck));
            return questionSets.map((e) => {
                let theId = ''+ e.id;
                return <QuestionSetButton questions={e.questions} key={e.id} id={e.id} name={e.name} answered={answeredMap.get(theId)}/>
            })
        } else {
            return <p>Create some question sets?</p>
        }
    }


    render() {

        if (!this.state.loginData.loggedIn) {
            return (
                <div style={{ height: "100%" }}>
                    <div className="mainpage">
                        <Router>
                            <Switch>
                                <Route exact path="/registration">
                                    <RegistrationPage />
                                </Route>

                                <Route exact path="/">
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
                        <Navbar user={this.state.loginData.user} logout={this.logOut} />
                        <Switch>
                            <Route exact path="/">
                                <img alt="Cup of coffee" src={coffee2} style={{ width: "360px" }} />
                                <div>
                                    {this.questionSetFactory(this.state.questionSet, this.state.loginData.user)}
                                   
                                        <div>
                                            <Link to="/create"><button className="floating-menu-icon">New Tracker +</button></Link>
                                        </div>
                                  
                                </div>
                            </Route>
                            <Route exact path="/create">
                                <CreateQuestionSet user={this.state.loginData.user} />
                            </Route>
                            <Route exact path="/edit">
                                <EditQuestionSetsList user={this.state.loginData.user} questionSets={this.state.questionSet}/>
                            </Route>
                            <Route path="/chart" component={Graph}>
                            </Route>

                            <Route path={"/edit/:id"} render={(props) => <EditQuestionSet {...props} user={this.state.loginData.user} /> } >
                            </Route>
                            {routeFactory(this.state.questionSet, this.state.loginData.user)}
                        </Switch>
                    </Router>

                </div>
            </div>
        );
    }
}



function routeFactory(questionSets, user) {
    // console.log(user);
    if (questionSets.length > 0) {
        return questionSets.map((e) =>
            <Route key={e.id} path={"/" + e.name}>
                <QuestionSet id={e.id} questionSet={e} user={user} />
            </Route>)
    } else {
        return null;
    }
}

export default Base;

