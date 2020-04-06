import React from 'react';
import Registration from './Registration';
import '../Login/LoginPage.css'
import '../../index.css'
import howru_logo from '../../images/howru_logo.png'
import { BrowserRouter as Redirect, Link } from "react-router-dom";


class RegistrationPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { handleSuccessful: false }
        this.handleSuccessful = this.handleSuccessful.bind(this)
    }

    handleSuccessful(data) {
        this.setState({ handleSuccessful: true })
    }

    render() {
        if (this.state.handleSuccessful) {
            return <Redirect to="/" />;
        } else {
            return (
                <div className="mainPage">
                    <div className="top-bar" >
                        <img alt="logo" src={howru_logo} className="img_top" style={{ width: "120px" }} />
                    </div>
                    <div className="card-body">
                       <h3 className="card-title text-center" style={{ color: "black" }}>Create Account</h3>
                        <Registration handleSuccessful={this.handleSuccessful} />

                        <Link to="/" className="btn btn-lg btn-new btn-block text-uppercase"> Cancel </Link>
                    </div>
                    <div className="bottom-bar" />
                </div>
            )
        }
    }
}


export default RegistrationPage;