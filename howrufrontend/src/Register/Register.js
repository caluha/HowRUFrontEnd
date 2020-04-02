import React, { Component } from 'react';

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
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

    handleSubmit(event) {
        // const { userName, password, password_confirmation } =this.state;

        // //calling api
        //     .post(
        //         "http://localhost:3000/registration",
        //         {
        //             user: {
        //                 userName: userName,
        //                 password: password,
        //                 password_confirmation: password_confirmation
        //             }
        //         },
        //         { withCredentials: true }
        //     )
        // .then(response => {
        //     if(response.data.status === "created") {
        //         this.props.handleSuccsesfulAuth(response.data);
        //     }
        // })
        // .catch(error => {
        //     console.log("Registration error", error);
        // })
        console.log("form submitted"); 
        event.preventDefault();
    }


    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" 
                    name="userName" 
                    placeholder="User Name" 
                    value={this.state.userName} 
                    onChange={this.handleChange} 
                    required />

                    <input type="password" 
                    name="password" 
                    placeholder="Password" 
                    value={this.state.password} 
                    onChange={this.handleChange} 
                    required />

                    <input type="password" 
                    name="password_conformation" 
                    placeholder="Password conformation" 
                    value={this.state.password_confirmation} 
                    onChange={this.handleChange} 
                    required />

                    <button type="submit">Register</button>

                </form>
            </div>
        );
    }
}