import React from 'react';

import { NavLink } from "react-router-dom";
import '../CreateEdit/CreateEdit.css'; 
import edit_01 from '../../images/edit_01.png';
import remove_01 from '../../images/remove_01.png';


const EditQuestionSetButton = (props)=> {

    
    return (
        <div className="box" id="lightred_box">

            <button type="button" className="editButton pen"><img alt="Delete" className={"buttonImage"} onClick={props.showDelete} src={remove_01}/></button>
            <NavLink exact to ={"/edit/"+props.id}>
                <button type="button" className="editButton pen"><img alt="Edit" className={"buttonImage"} src={edit_01} /></button>
            </NavLink>
            {/* <NavLink exact to={"/" + this.props.name} className="pen"><img alt="Go!" src={arrow} style={{ height: "25px" }} /></NavLink>
            <NavLink exact to="/unchecked" className="pen"><img alt="Unanswered" src={unanswered_01} style={{ height: "25px" }} /></NavLink>
            <NavLink to={{pathname: "/chart", state: {questions: this.props.questions, name: this.props.name}}} className="pen"><img alt="Data" src={chart} style={{ height: "25px" }} /></NavLink> */}
            <div>{props.name}</div>
        </div>
    );
    
}

export default EditQuestionSetButton;