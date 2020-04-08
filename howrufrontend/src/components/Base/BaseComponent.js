import React from 'react';
import { Switch, Route, Link } from "react-router-dom";
import { withRouter } from 'react-router'

import QuestionSet from '../QuestionSet/QuestionSet';
import coffee2 from '../../images/coffee2.jpg';
import Navbar from './Navbar';
import QuestionSetButton from './QuestionSetButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateQuestionSet from '../CreateEdit/CreateQuestionSet';
import LoginPage from '../Login/LoginPage'
import RegistrationPage from '../Registration/RegistrationPage';
import EditQuestionSetsList from '../EditQuestionSet/EditQuestionSetsList';
import EditQuestionSet from '../EditQuestionSet/EditQuestionSet';
import PresentationBase from '../presentation/PresentationBase';



class Base extends React.Component {

    constructor(props) {
        super(props);
        this.historyUpdater=this.historyUpdater.bind(this); 

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
            questionSet: [],
            loadedData:false,
        }
        this.handleLogin = this.handleLogin.bind(this);
        this.getAnsweredStates();
    }

    getAllQuestionSets = () => {

        if (this.state.loginData.loggedIn) {
            // let url = "http://localhost:8080/questionset/user/" + this.state.loginData.user;
            let url = "http://howru.live:8080/questionset/user/" + this.state.loginData.user; 
            fetch(url)
                .then(result => result.json())
                .then(result => {
                    this.setState({ questionSet: result })

                })
        }
    }

    getAnsweredStates = () => {
        //THIS SOMETIMES RESULTS IN answeredCheck BEING UNDEFINDED AND CRASHES THE PROGRAM.
        if (this.state.loginData.loggedIn) {
            // let url = "http://localhost:8080/questionsetanswered/user/" + this.state.loginData.user;
            let url = "http://howru.live:8080/questionsetanswered/user/" + this.state.loginData.user; 
            fetch(url)
                .then(result => result.json())
                .then(result => {
                    this.setState({ answeredCheck: result })
                })
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

    async historyUpdater(location, action){
        await this.sleep(500); 
        this.getAllQuestionSets(); 
        this.getAnsweredStates();
    }

    componentDidMount(){

        

        this.unlisten = this.props.history.listen(this.historyUpdater);

        let myStorage = window.localStorage;
        if (myStorage.getItem("loggedIn") === "true") {
            let loginData = {
                loggedIn: true,
                user: myStorage.getItem("user"),
            }
            this.setState({ loginData: loginData }, 
                ()=> {  this.getAllQuestionSets(); 
                        this.getAnsweredStates(); } );
            
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
                this.setState({ loginData: loginData }, 
                    ()=> {  this.getAllQuestionSets(); 
                            this.getAnsweredStates(); });
            }

            
        }
    }

    componentWillUnmount() {
        this.unlisten();
    }

    handleLogin(data) {

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

    borderColors=[
        "#F7767A",
        "#00963D",
        "#DD3146",
        "#76b9f7",
    ]

    questionSetFactory = (questionSets) => {
    
        if (questionSets.length > 0) {
            let answeredMap = new Map(Object.entries(this.state.answeredCheck));
            return questionSets.map((e, index) => {
                let theId = ''+ e.id;
                return <QuestionSetButton questions={e.questions} key={e.id} 
                        borderColor={this.borderColors[index%this.borderColors.length]}
                        id={e.id} name={e.name} answered={answeredMap.get(theId)}/>
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
                        
                            <Switch>
                                <Route exact path="/registration">
                                    <RegistrationPage />
                                </Route>

                                <Route exact path="/">
                                    <LoginPage handleLogin={this.handleLogin} />
                                </Route>
                            </Switch>
                        
                    </div>
                </div>
            );
        }

        return (
            <div style={{ height: "100%" }}>
                <div className="mainpage">
                    
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
                        {/* <Route path="/chart" component={Graph}> */}
                        <Route path="/chart" component={PresentationBase}>
                        </Route>

                        <Route path={"/edit/:id"} render={(props) => <EditQuestionSet {...props} user={this.state.loginData.user} /> } >
                        </Route>
                        {routeFactory(this.state.questionSet, this.state.loginData.user)}
                    </Switch>
                    

                </div>
            </div>
        );
    }
}



function routeFactory(questionSets, user) {
    if (questionSets.length > 0) {
        return questionSets.map((e) =>
            <Route key={e.id} path={"/" + e.name}>
                <QuestionSet id={e.id} questionSet={e} user={user} />
            </Route>)
    } else {
        return null;
    }
}

export default withRouter(Base);

