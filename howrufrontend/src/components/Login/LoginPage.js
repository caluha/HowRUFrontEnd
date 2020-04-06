import React from 'react';
import './LoginPage.css';
import '../../index.css'
import Login from './Login.js';
import howru_logo from '../../images/howru_logo.png'
import { BrowserRouter as Redirect, Link, } from "react-router-dom";


class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loggedIn: false }
        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this)
    }

    handleSuccessfulAuth(data) {
        this.props.handleLogin(data);
        this.setState({ loggedIn: true })
    }

    render() {
        return (
            <div className="mainpage" >
                <div className="top-bar" >
                <img alt="logo" src={howru_logo} className="img_top" style={{ width: "120px" }} />
                </div>
                <div className="card-body" >
                    <h3 className="card-title text-center">LOG IN</h3>
                    <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
                    <Link to="/registration" className="btn btn-lg btn-new btn-block text-uppercase"> NEW USER</Link>
                </div> 
                <div className="bottom-bar" />
            </div>
        )
    }
}


export default LoginPage;