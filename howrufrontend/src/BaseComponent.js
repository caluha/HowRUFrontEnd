import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import QuestionSet from './QuestionSet';
import Toolbar from './components/Toolbar/Toolbar';
import SideDrawer from './components/SideDrawer/SideDrawer';
import Backdrop from './components/Backdrop/Backdrop';
import coffe from './coffe.jpg';


class Base extends React.Component {
    state = {
        sideDrawerOpen: false
    };

    drawerToggleClickHandler = () => {
        this.setState((prevState) => {
            return { sideDrawerOpen: !prevState.sideDrawerOpen };
        });
    };

    backdropClickHandler = () => {
        this.setState({sideDrawerOpen: false})
    } 

    render() {
        let sideDrawer;
        let backdrop;

        if(this.state.sideDrawerOpen) {
            sideDrawer = <SideDrawer />;
            backdrop = <Backdrop click={this.backdropClickHandler}/>
        }
        return (
            <div style={{ height: "100%" }}>
                <div className="startmenu">
                    <Router>
                        <Toolbar drawerClickHandler ={this.drawerToggleClickHandler} />
                        {sideDrawer}
                        {backdrop}
                        <img src={coffe} style={{ width: "350px" }} />
                        <div className="box" >
                            <Link to="/migraine">Migraine</Link>
                        </div>
                        <div className="box">

                            <Link to="/feelz">Feelz</Link>
                        </div>
                        <div className="box">
                            Journal
                        </div>
                        <div className="box">
                            Create own
                        </div>
                        <div className="box">
                            Calender
                    </div>

                        <Switch>
                            <Route path="/migraine">
                                <Migraine />
                            </Route>
                            <Route path="/feelz">
                                <Feelz />
                            </Route>
                        </Switch>
                    </Router>
                </div>
            </div>



        );
    }
}

function Migraine() {
    return (
        <QuestionSet />
    )
}

function Feelz() {
    return <QuestionSet />
}

export default Base;

