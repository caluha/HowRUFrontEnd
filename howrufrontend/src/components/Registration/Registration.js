import React, { Component } from 'react';
import '../Login/LoginPage.css'


export default class Registration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            userName: "",
            password: "",
            password_confirmation: "",
            message: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    async registration(username, password, email) {
        console.log("before url")
        let url = "http://localhost:8080/user";
        var myHeaders = new Headers();
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
                if (result.enabled) {
                    this.props.handleSuccessful(result)
                }
            })
            .catch(error => console.log("error", error));
    }
         
    handleSubmit(event) {
        const { password, password_confirmation } = this.state;
        if (password !== password_confirmation) {
               alert("nope, not matching passwords")
        } else {
            this.registration(this.state.username, this.state.password, this.state.email);
            event.preventDefault();
        }
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-label-group">
                        <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} required />
                        <input type="text" name="username" placeholder="User Name" value={this.state.username} onChange={this.handleChange} required />
                        <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required />
                        <input type="password"name="password_confirmation" placeholder="Password confirmation" value={this.state.password_confirmation} onChange={this.handleChange} required />
                    </div>
                    <button type="submit" className="btn btn-lgin btn-lg btn-block text-uppercase">Submit</button>

                </form>

            </div>
        );
    }
}
