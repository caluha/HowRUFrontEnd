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
import '../Login/LoginPage.css'
import Base from '../Base/BaseComponent';
import RegistratePage from './RegistratePage';



export default class Registrate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            userName: "",
            password: "",
            
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    async registrate(username, password, email) {
        let url = "http://localhost:8080/user";
        var myHeaders = new Headers();
        // myHeaders.append("Authorization", "Basic " + Buffer.from(username + ":" + password).toString('base64'));
        myHeaders.append('Content-Type', 'application/json');
        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify({
                username: username,
                password: password,
                email: email
            }),
        };
        return await fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                this.loggedUser = result;
                console.log("login", result);
                if (result.loggedIn === "true") {
                    this.props.handleSuccessfulAuth(result)
                }
            })
            .catch(error => console.log("error", error));
    }


    handleSubmit(event) {

        this.registrate(this.state.username, this.state.password, this.state.email);
        console.log("form submitted");
        event.preventDefault();
    }

    passwordconformation() {
        console.log("Its something")
        // if(this.state.password.value=== this.state.password_confirmation.value) {
        //     return true
        // } else {
        //     return "Passwords does not match"
        // }
    }


    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact path="/registrate">
                            <form onSubmit={this.handleSubmit}>
                                <div class="form-label-group">
                                    <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} required />
                                    <input type="text" name="username" placeholder="User Name" value={this.state.username} onChange={this.handleChange} required />
                                    <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required />
                                    <input type="password" name="password_confirmation" placeholder="Password confirmation" value={this.state.password_confirmation} onChange={this.handleChange} required />
                                </div>
                                <button type="submit" class="btn btn-lgin btn-lg btn-block text-uppercase" type="submit" onSubmit={this.passwordconformation()}>Submit</button>

                            </form>
                        </Route>
                    </Switch>
                </Router>

            </div >
        );
    }
}