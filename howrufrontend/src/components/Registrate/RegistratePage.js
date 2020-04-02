import React from 'react';
import Registrate from './Registrate';
import '../Login/LoginPage.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";


class RegistratePage extends React.Component {
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

                            <Registrate handleSuccessfulAuth={this.handleSuccessfulAuth}/>
                                                        
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default RegistratePage;