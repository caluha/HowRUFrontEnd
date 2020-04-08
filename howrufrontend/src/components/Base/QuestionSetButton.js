import React from 'react';
import chart from '../../images/chart.png';
import arrow from '../../images/arrow.png';
import unanswered_01 from '../../images/unanswered_01.png';
import answered_01 from '../../images/answered_01.png';
import { NavLink } from "react-router-dom";


const QuestionSetButton = (props) => {

    return (
        <div className="box lightred_box" style={{borderColor:props.borderColor}}>
            <NavLink exact to={"/" + props.name} className="pen"><img alt="Go!" src={arrow} style={{ height: "25px" }} /></NavLink>
            <div className="pen"><img alt="Answered" src={props.answered ? answered_01 : unanswered_01} style={{ height: "25px" }} /></div>
            <NavLink to={{ pathname: "/chart", state: { questions: props.questions, name: props.name } }} className="pen"><img alt="Data" src={chart} style={{ height: "25px" }} /></NavLink>
            <div>{props.name}</div>
        </div>
    );
    
}

export default QuestionSetButton;