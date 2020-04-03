import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import './LoginPage.css';
import Base from '../Base/BaseComponent';
import LoginPage from './LoginPage';


export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    async login(username, password) {
        let url = "http://localhost:8080/login";
        var myHeaders = new Headers();
        // myHeaders.append("Authorization", "Basic " + Buffer.from(username + ":" + password).toString('base64'));
        myHeaders.append('Content-Type', 'application/json');
        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify({
                username: username,
                password: password
            }),
        };
        return await fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                this.loggedUser = result; 
                console.log("login",result);
                if (result.loggedIn === "true") {
                    this.props.handleSuccessfulAuth(result)
                }
               // return this.loggedUser;
               
            })
         
            .catch(error => console.log("error", error));
            
    }

    handleSubmit(event) {
        this.login(this.state.username, this.state.password);        
        event.preventDefault();
    }


    render() {
        return (
            <div>
                {/* <Router>
                    <Switch>
                        <Route exact path="/login"> */}
                            <form onSubmit={this.handleSubmit} >
                                <div class="form-label-group">
                                    <input type="text" name="username" placeholder="User Name" value={this.state.username} onChange={this.handleChange} required />
                                    <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required />
                                </div>
                                <button type="submit" class="btn btn-lgin btn-lg btn-block text-uppercase" type="submit"> Log in</button>
                            </form>
                           
                        {/* </Route>                        
                    </Switch>
                </Router> */}
            </div>
        );
    }
}

