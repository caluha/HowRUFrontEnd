import React from 'react';
import defaultResponses from './defaultResponses';
import CreateRangeResponse from './CreateRangeResponse';
import CreateTextResponse from './CreateTextResponse';
import CreateRadioCheckboxResponses from './CreateRadioCheckboxResponses'; 
import remove_01 from '../../images/remove_01.png';

class CreateQuestionForm extends React.Component{

    constructor(props){
        super(props);

        this.updateType=this.updateType.bind(this); 
        this.saveResponse=this.saveResponse.bind(this);

        console.log(props.question);

        this.state = {
                question: (props.question ? props.question: 
                {
                    id: this.props.questionId,
                    question: "",
                    type: "RANGE",
                    responses: [
                        defaultResponses.RangeResponse
                    ]
                }),
                errors:{
                    question:'',
                    responses:''
                }
            
        }
    }

    updateType(event){
        let newQuestion= this.state.question;
        

        newQuestion.type = event.target.value;
        switch(event.target.value){
            case "RANGE": 
                newQuestion.responses = [defaultResponses.RangeResponse];
            break;
            case "TEXT": 
                newQuestion.responses = [defaultResponses.TextResponse];
            break;
            case "RADIO": 
                newQuestion.responses = [
                    defaultResponses.RadioResponse1,
                    defaultResponses.RadioResponse2,
                    defaultResponses.RadioResponse3];
            break;
            case "CHECKBOX": 
                newQuestion.responses = [
                defaultResponses.CheckboxResponse1,
                defaultResponses.CheckboxResponse2,
                defaultResponses.CheckboxResponse3];
            break;

            default:
                newQuestion.type="RANGE";
                newQuestion.responses = [defaultResponses.RangeResponse];
            
        }
        this.setState({question:newQuestion});
        
        event.preventDefault(); 
    }

    saveResponse(responses ){
        let newQuestion= this.state.question;
        newQuestion.responses=responses;
        this.setState({question:newQuestion});
    }

    updateQuestionText = (event) => {
        let newQuestion= this.state.question;
        newQuestion.question=event.target.value;
        this.setState({question : newQuestion })

        event.preventDefault(); 
    }

    handleSubmit = (event) => {
        
        this.props.saveQuestion(this.state.question)
        event.preventDefault(); 
    }

    render(){
        let rangeResp = <CreateRangeResponse response = {this.state.question.responses[0]} saveResponse={ this.saveResponse} />;
        let textResp = <CreateTextResponse response = {this.state.question.responses[0]}  saveResponse={ this.saveResponse} />;
        let radioCheckboxResp = <CreateRadioCheckboxResponses responses = {this.state.question.responses}  saveResponse={ this.saveResponse} />;


        return(
            <div className="questionFormModalBackground">
                <div className="questionFormModal">
                    <div className="questionFormTopArea">
                        <button style={{float:"right"}}
                        type="button" className="editButton"><img alt="Edit" className={"buttonImage"} onClick={this.props.closeForm} src={remove_01}/></button>
                    </div>

                    <h4 className="questionFormHeadline">New Question</h4>
                    
                    <form onSubmit={this.handleSubmit} noValidate >
                        <textarea className="input-group questionArea" type="textarea" onChange={this.updateQuestionText} 
                                rows="3"
                                value={this.state.question.question}
                                placeholder="Question" noValidate></textarea>
                        
                        <div className="row">
                            <div className="col">
                                <label htmlFor="questionType">Type</label>
                            </div>
                                
                            <div className="col">
                                <select className="input-group" name="questionType" value={this.state.question.type} onChange={this.updateType}>
                                    <option value="RANGE">Range</option>
                                    <option value="TEXT">Text</option>
                                    <option value="RADIO">Radio buttons</option>
                                    <option value="CHECKBOX">Checkboxes</option>
                                </select>
                            </div>
                        </div>



                        {this.state.question.type === "RANGE" ? rangeResp :
                            this.state.question.type === "TEXT" ? textResp : 
                            this.state.question.type === "RADIO" || this.state.question.type === "CHECKBOX"  ? radioCheckboxResp : <p>Loading</p> }
                        
                        <button className="btn btn-primary">Save</button>
                    </form>
                </div>
            
            </div>
        )
    }
}


export default CreateQuestionForm;