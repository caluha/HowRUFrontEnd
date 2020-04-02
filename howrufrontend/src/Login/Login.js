import React, { Component } from 'react';
import '../LoginPage.css';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: "",
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

    handleSubmit(event) {
        // const { userName, password } =this.state;

        // //calling api
        //     .post(
        //         "http://localhost:3000/loggedin",
        //         {
        //             user: {
        //                 userName: userName,
        //                 password: password
        //             }
        //         },
        //         { withCredentials: true }
        //     )
        // .then(response => {
        //     if(response.data.logged_in) {
        //         this.props.handleSuccsesfulAuth(response.data);
        //     }
        // })
        // .catch(error => {
        //     console.log("Registration error", error);
        // })
        console.log("form submitted"); //post to api post(url) sends the array as json, don't forget ", withCredential: true"
        event.preventDefault();
    }

    // handleSuccesfulAuth(data) {
    //     this.props.handleLogin(data);
    //     this.props.history.push("/");
    // }


    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} >
                    <div class="form-label-group">
                        <input type="text" name="userName" placeholder="User Name" value={this.state.userName} onChange={this.handleChange} required />
                        <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required />
                    </div>
                    <button type="submit" class="btn btn-lgin btn-lg btn-block text-uppercase" type="submit">Login</button>
                </form>
            </div>
        );
    }
}

