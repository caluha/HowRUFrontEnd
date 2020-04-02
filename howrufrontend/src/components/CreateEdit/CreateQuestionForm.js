import React from 'react';

import defaultResponses from './defaultResponses';
import CreateRangeResponse from './CreateRangeResponse';
import CreateTextResponse from './CreateTextResponse';
import CreateRadioResponses from './CreateRadioResponses'; 

class CreateQuestionForm extends React.Component{

    constructor(props){
        super(props);

        this.updateType=this.updateType.bind(this); 

        this.state = {
            
            question: "",
            type: "RANGE",
            responses: [
                defaultResponses.RangeResponse
            ]
            
        }
    }

    updateType(event){

        this.setState({type : event.target.value});
        switch(event.target.value){
            case "RANGE": 
                this.setState({responses: [defaultResponses.RangeResponse]});
            break;
            case "TEXT": 
                this.setState({responses: [defaultResponses.TextResponse]});
            break;
            case "RADIO": 
                this.setState({responses: [
                    defaultResponses.RadioResponse1,
                    defaultResponses.RadioResponse2,
                    defaultResponses.RadioResponse3]});
            break;
            case "CHECKBOX": 
            this.setState({responses: [
                defaultResponses.CheckboxResponse1,
                defaultResponses.CheckboxResponse2,
                defaultResponses.CheckboxResponse3]});
            break;

            default:
                this.setState({
                    type:"RANGE",
                    responses: [defaultResponses.RangeResponse]});
            
        }

        
        event.preventDefault(); 
    }

    saveResponse(responses ){

    }

    updateQuestionText = (event) => {
        this.setState({question : event.target.value})
        event.preventDefault(); 
    }

    render(){
        let rangeResp = <CreateRangeResponse response = {this.state.responses[0]} />;
        let textResp = <CreateTextResponse response = {this.state.responses[0]} />;

        let radioResp = <CreateRadioResponses responses = {this.state.responses} />;



        return(
            <h2> 
                
                <input type="text" onChange={this.updateQuestionText} value={this.state.question}
                 placeholder="Question"></input>
                
                <label htmlFor="questionType">Type</label>
                <select name="questionType" value={this.state.type} onChange={this.updateType}>
                    <option value="RANGE">Range</option>
                    <option value="TEXT">Text</option>
                    <option value="RADIO">Radio buttons</option>
                    <option value="CHECKBOX">Checkboxes</option>

                </select>

                {this.state.type === "RANGE" ? rangeResp :
                    this.state.type === "TEXT" ? textResp : 
                    this.state.type === "RADIO" ? radioResp : <p>Not implemented yet</p> }
                
                <button onClick={() => this.props.saveQuestion(this.state.question)} className="btn btn-primary">Save</button>
            </h2>
        )
    }
}


export default CreateQuestionForm;