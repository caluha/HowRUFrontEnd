import React from 'react';
import './LoginPage.css';
import Register from './Register/Register';
import Login from './Login/Login.js';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";


class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state= {handleSuccessful : false}
        this.handleSuccessfulAuth =this.handleSuccessfulAuth.bind(this)
    }

    handleSuccessfulAuth(data) {
        this.props.handleLogin(data);
        this.setState({handleSuccessful:true})
    }

    render() {
        if(this.state.handleSuccessful) {
            return <Redirect to = "/base" />
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="card card-signin my-5">
                        <div className="card-body">
                            <h3 className="card-title text-center">HowRU</h3>

                            <Login handleSuccessfulAuth={this.handleSuccessfulAuth}/>
                            
                            <button class="btn btn-lg btn-new btn-block text-uppercase" type="submit"> NEW USER</button>
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default RegisterPage;