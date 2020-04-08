import React from 'react';
import chart from '../../images/chart.png';
import arrow from '../../images/arrow.png';
import unanswered_01 from '../../images/unanswered_01.png';
import answered_01 from '../../images/answered_01.png';
import { NavLink } from "react-router-dom";


class QuestionSetButton extends React.Component {

    render() {
        if(this.props.answered){
            return (
                <div className="box" id="lightred_box">
                    <NavLink exact to={"/" + this.props.name} className="pen"><img alt="Go!" src={arrow} style={{ height: "25px" }} /></NavLink>
                    <div className="pen"><img alt="Answered" src={answered_01} style={{ height: "25px" }} /></div>
                    <NavLink to={{pathname: "/chart", state: {questions: this.props.questions, name: this.props.name}}} className="pen"><img alt="Data" src={chart} style={{ height: "25px" }} /></NavLink>
                    <div>{this.props.name}</div>
                </div>
            );
        } else {
            return (
                <div className="box" id="lightred_box">
                    <NavLink exact to={"/" + this.props.name} className="pen"><img alt="Go!" src={arrow} style={{ height: "25px" }} /></NavLink>
                    <div className="pen"><img alt="Unanswered" src={unanswered_01} style={{ height: "25px" }} /></div>
                    <NavLink to={{pathname: "/chart", state: {questions: this.props.questions, name: this.props.name}}} className="pen"><img alt="Data" src={chart} style={{ height: "25px" }} /></NavLink>
                    <div>{this.props.name}</div>
                </div>
            );
        }
        
    }
}

export default QuestionSetButton;