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
import '../LoginPage.css';
import Base from '../components/Base/BaseComponent';
import RegistratePage from './RegistratePage';



export default class Registrate extends Component {
    constructor(props) {
        super(props); 

        this.state = {
            email:"",
            userName: "",
            password: "",
            password_confirmation: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    async login(email, username, password) {
        let url = "http://localhost:8080/create";
        var myHeaders = new Headers();
        // myHeaders.append("Authorization", "Basic " + Buffer.from(username + ":" + password).toString('base64'));
        myHeaders.append('Content-Type', 'application/json');
        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify({
                email: email,
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
     
        console.log("form submitted"); 
        event.preventDefault();
    }


    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                <div class="form-label-group">
                    <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} required />
                    <input type="text" name="userName" placeholder="User Name" value={this.state.userName} onChange={this.handleChange} required />
                    <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required />
                    <input type="password" name="password_conformation" placeholder="Password conformation" value={this.state.password_validation} onChange={this.handleChange} required />
                </div>
                <button type="submit" class="btn btn-lgin btn-lg btn-block text-uppercase" type="submit">Submit</button>

                </form>
            </div>
        );
    }
}