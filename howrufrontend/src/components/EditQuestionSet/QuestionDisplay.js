import React from 'react';
import '../CreateEdit/CreateEdit.css'; 
import edit_01 from '../../images/edit_01.png';
import remove_01 from '../../images/remove_01.png';

const typeDict = {RANGE:"Slider", 
            TEXT: "Text",
            RADIO: "Choose one",
            CHECKBOX: "Choose many" }

function QuestionDisplay (props){

    let { question, showEdit } = props; 

    return(
        <li className="questionListItem" >
            <div className="row questionListRow">
                <div className="col-10">
                    <span className="questionDisp">{question.question}</span>
                    <br/>
                    <span className="typeDisp">{typeDict[question.type]}</span>
                </div>
                <div className="col-2 button-col">
                    {/* <button type="button" className="editButton" onClick={showEdit} >E</button> */}
                    <button type="button" className="editButton"><img alt="Edit" className={"buttonImage"} onClick={showEdit} src={edit_01} /></button>
                </div>
            </div>
        </li>);
}

export default QuestionDisplay; 