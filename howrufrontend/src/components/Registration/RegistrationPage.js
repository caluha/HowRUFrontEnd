import React from 'react';
import Registration from './Registration';
import '../Login/LoginPage.css'
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
        console.log(this.state.handleSuccessful);

        if (this.state.handleSuccessful) {
            return <Redirect to="/" />;
        } else {
            return (
                <div className="container">
                    <div className="row">
                        <div className="card card-signin my-5">
                            <div className="card-body">
                            <Link to="/" className="card-title text-center"> HowRU</Link>
                                <Registration handleSuccessful={this.handleSuccessful} />
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}


export default RegistrationPage;