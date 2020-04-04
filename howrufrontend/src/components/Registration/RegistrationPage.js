import React from 'react';
import Registration from './Registration';
import '../Login/LoginPage.css'
import { BrowserRouter as Redirect} from "react-router-dom";


class RegistrationPage extends React.Component {
    constructor(props) {
        super(props);
        this.state= {handleSuccessful : false}
        this.handleSuccessful =this.handleSuccessful.bind(this)
    }

    handleSuccessful(data) {
        this.setState({handleSuccessful:true})
    }

    render() {
        console.log("före handleSuccsesful")
        if(this.state.handleSuccessful) {
            console.log("före redirect")
            return <Redirect to = "/" />
            
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="card card-signin my-5">
                        <div className="card-body">
                            <h3 className="card-title text-center">HowRU</h3>
                            <Registration handleSuccessful={this.handleSuccessful}/>                      
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default RegistrationPage;