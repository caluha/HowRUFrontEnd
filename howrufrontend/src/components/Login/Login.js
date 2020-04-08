import React, { Component } from 'react';
import './LoginPage.css';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            errorMessage:""
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
        // let url = "http://localhost:8080/login";
        let url = "http://howru.live:8080/login"
        var myHeaders = new Headers();
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
                console.log("login", result);
                if (result.loggedIn === "true") {
                    this.props.handleSuccessfulAuth(result)
                }else {
                    this.setState({message: "Wrong Username or Password"})
                }
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
                <form onSubmit={this.handleSubmit} >
                    <div className="form-label-group">
                        <input type="text" name="username" placeholder="User Name" value={this.state.username} onChange={this.handleChange} required />
                        <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required />
                        <div><h5 className="error">{this.state.message}</h5></div>
                    </div>
                    <button type="submit" className="btn btn-lgin btn-lg btn-block text-uppercase">Log in</button>
                </form>
            </div>
        );
    }
}

