import React from 'react';
import './LoginPage.css';
import Register from './Register/Register';
import Login from './Login/Login.js';


class LoginPage extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="card card-signin my-5">
                        <div className="card-body">
                            <h3 className="card-title text-center">HowRU</h3>

                            <Login />
                            <button class="btn btn-lg btn-new btn-block text-uppercase" type="submit"> NEW USER</button>
                            {/* <form class="form-signin">
                                <div class="form-label-group">
                                    <input type="text" id="userName" class="form-control" placeholder="User Name" required autofocus />
                                    <label for="userName">User name</label>
                                </div>
                                <div class="form-label-group">
                                    <input type="password" id="inputPassword" class="form-control" placeholder="Password" required />
                                    <label for="inputPassword">Password</label>
                                </div>
                                

                                <div class="custom-control custom-checkbox mb-3">
                                    <input type="checkbox" class="custom-control-input" id="customCheck1" />
                                </div>
                                <button class="btn btn-lgin btn-block text-uppercase" type="submit">Sign in</button>
                                <hr class="my-4" />
                                <button class="btn btn-lg btn-new btn-block text-uppercase" type="submit"><i class="fab fa-google mr-2"></i> NEW USER</button>
                            </form> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default LoginPage;