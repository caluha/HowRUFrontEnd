import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams,
    useHistory
} from "react-router-dom";
import QuestionSet from '../QuestionSet/QuestionSet';
import coffee2 from '../../images/coffee2.jpg';
import { NavLink } from "react-router-dom";
import Navbar from './Navbar';
import mockQuestionSet from '../../json/mockQuestionSet.json';
import QuestionSetButton from './QuestionSetButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateQuestionSet from '../CreateEdit/CreateQuestionSet';
import LoginPage from '../../LoginPage'
import RegisterPage from '../../Register/RegisterPage';




class Base extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loginData: {},
            questionSet: []
        }
        this.handleLogin = this.handleLogin.bind(this);
    }

    getAllQuestionSets = () => {
        let url = "http://localhost:8080/questionset";
        fetch(url)
            .then(result => result.json() )
            .then(result => {
                this.setState({questionSet: result})
                // console.log(result)
            })
    }

    componentDidMount() {
        this.getAllQuestionSets();
    }

    handleLogin(data) {
        this.setState({loginData:data})
    }

    render() {
       


        return (
            <div style={{ height: "100%" }}>
                <div className="mainpage">
                    <Router>
                        <Navbar />
                        <Switch>
                            <Route exact path="/base">
                                <img src={coffee2} style={{ width: "360px" }} />
                                <div>
                                    {questionSetFactory(this.state.questionSet)}
                                </div>
                            </Route>
                            <Route exact path="/new">
                               <CreateQuestionSet />
                            </Route>
                            <Route exact path="/login">
                               <LoginPage handleLogin={this.handleLogin} />
                            </Route>
                            <Route exact path="/register">
                               <RegisterPage />
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
    return questionSets.map((e) => <QuestionSetButton key={e.id} id={e.id} name={e.name} />)
}

function routeFactory(questionSets) {
    return questionSets.map((e) => <Route key={e.id} path={"/" + e.name}><QuestionSet id={e.id} questionSet={e}/></Route>)
}

export default Base;

