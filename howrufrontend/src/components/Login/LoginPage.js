import React from 'react';
import './LoginPage.css';
import Registrate from '../Registrate/Registrate';
import Login from './Login.js';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";


class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state= {loggedIn : false}
        this.handleSuccessfulAuth =this.handleSuccessfulAuth.bind(this)
    }

    handleSuccessfulAuth(data) {
        this.props.handleLogin(data);
        this.setState({loggedIn : true})
    }

    render() {
        if(this.state.loggedIn) {
            return <Redirect to = "/" />;
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="card card-signin my-5">
                        <div className="card-body">
                            <h3 className="card-title text-center">HowRU</h3>

                            <Login handleSuccessfulAuth={this.handleSuccessfulAuth}/>
                            
                            <Link to="/registrate" className="btn btn-lg btn-new btn-block text-uppercase"> NEW USER</Link>
                           
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default LoginPage;