import React from 'react';
import Registration from './Registration';
import '../Login/LoginPage.css'
import '../../index.css'
import Navbar from '../Base/Navbar'
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
                    <Navbar />
                    <div className="card-body">
                        <Link to="/"><h3 className="card-title text-center" style={{color:"black"}}> HowRU</h3></Link>
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