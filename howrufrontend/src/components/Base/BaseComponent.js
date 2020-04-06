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
import ChartsPage from '../presentation/graphTest';

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
    }

    getAllQuestionSets = () => {

        if (this.state.loginData.loggedIn) {
            // console.log(this.state.loginData)
            let url = "http://localhost:8080/questionset/user/" + this.state.loginData.user;
            console.log(url);
            fetch(url)
                .then(result => result.json())
                .then(result => {
                    this.setState({ questionSet: result })

                    // console.log(result)
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
                                    {questionSetFactory(this.state.questionSet, this.state.loginData.user)}
                                    <div className="bottom-bar">
                                        <div>
                                            <Link to="/create"><button className="floating-menu-icon">New Tracker +</button></Link>
                                        </div>
                                    </div>
                                </div>
                            </Route>
                            <Route exact path="/create">
                                <CreateQuestionSet user={this.state.loginData.user} />
                            </Route>
                            <Route path="/chart" component={ChartsPage}>
                            </Route>
                            {routeFactory(this.state.questionSet, this.state.loginData.user)}
                        </Switch>
                    </Router>

                </div>
            </div>

        );
    }
}

function questionSetFactory(questionSets) {
    if (questionSets.length > 0) {
        return questionSets.map((e) => <QuestionSetButton questions={e.questions} key={e.id} id={e.id} name={e.name} />)
    } else {
        return <p>Create some question sets?</p>
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

