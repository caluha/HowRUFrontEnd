import React, { Component } from 'react';
import '../LoginPage.css';

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
        myHeaders.append("Authorization", "Basic " + Buffer.from(username + ":" + password).toString('base64'));
        myHeaders.append('Content-Type', 'application/json');
        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify({
                username: username,
                password: password
            }),
            redirect: "follow"
        };
        return await fetch(url, requestOptions)
            .then(r => console.log(r))
            .then(response => response.json())
            .then(result => {
                // console.log(result);
                this.loggedUser = result;
                this.loggedUser.password = password;
                return this.loggedUser;
            })
            .catch(error => console.log("error", error));
    }

    handleSubmit(event) {
        this.login(this.state.userName, this.state.password);
        console.log("login", this.state.userName)

        //         { withCredentials: true }

        console.log("form submitted"); //post to api post(url) sends the array as json, don't forget ", withCredential: true"
        event.preventDefault();
    }


    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} >
                    <div class="form-label-group">
                        <input type="text" name="username" placeholder="User Name" value={this.state.username} onChange={this.handleChange} required />
                        <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required />
                    </div>
                    <button type="submit" class="btn btn-lgin btn-lg btn-block text-uppercase" type="submit">Log in</button>
                </form>
            </div>
        );
    }
}

