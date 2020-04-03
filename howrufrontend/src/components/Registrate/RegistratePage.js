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
        this.handleSuccessful =this.handleSuccessful.bind(this)
    }

    handleSuccessful(data) {
        console.log("does not compute")
        this.props.enadbled(data);
        this.setState({handleSuccessful:true})
    }

    render() {
        console.log("före redirect")
        if(this.state.handleSuccessful) {
            return <Redirect to = "/login" />
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="card card-signin my-5">
                        <div className="card-body">
                            <h3 className="card-title text-center">HowRU</h3>

                            <Registrate handleSuccessful={this.handleSuccessful}/>
                                                        
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default RegistratePage;