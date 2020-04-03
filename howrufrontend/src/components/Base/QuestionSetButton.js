import React from 'react';
import chart from '../../images/chart.png';
import answered_01 from '../../images/answered_01.png';
import arrow from '../../images/arrow.png';
import unanswered_01 from '../../images/unanswered_01.png';
import {NavLink} from "react-router-dom";


class QuestionSetButton extends React.Component {



    render() {
         return (
            <div className="box" id="lightred_box">
                <NavLink exact to={"/" + this.props.name} className="pen"><img src={arrow} style={{height:"25px"}} /></NavLink>
                <NavLink exact to="/unchecked" className="pen"><img src={unanswered_01} style={{height:"25px"}} /></NavLink>
                <NavLink exact to="/chart" className="pen"><img src={chart} style={{height:"25px"}} /></NavLink>
                <div>{this.props.name}</div>
                <div >
                    <NavLink exact to="/create"><button className="floating-menu-icon">New Tracker +</button></NavLink>
                </div>
            </div>
            ); 
    }
}


export default QuestionSetButton;