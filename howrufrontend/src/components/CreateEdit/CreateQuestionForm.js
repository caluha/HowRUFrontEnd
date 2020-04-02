import React from 'react';

import defaultResponses from './defaultResponses';
import CreateRangeResponse from './CreateRangeResponse';


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
        event.preventDefault(); 
    }

    saveResponse(responses ){

    }

    updateQuestionText = (event) => {
        this.setState({question : event.target.value})
        event.preventDefault(); 
    }

    render(){
        let rangeResp = <CreateRangeResponse />;

        return(
            <h2> 
                { this.state.question === "" ? "Question goes here" : this.state.question }
                <input type="text" onChange={this.updateQuestionText} value={this.state.question}
                 placeholder="Question"></input>
                
                <label for="questionType">Type</label>
                <select name="questionType" value={this.state.type} onChange={this.updateType}>
                    <option value="RANGE">Range</option>
                    <option value="TEXT">Text</option>
                    <option value="RADIO">Radio buttons</option>
                    <option value="CHECKBOX">Checkboxes</option>

                </select>

                {this.state.type === "RANGE" ? rangeResp : <p>Not implemented yet</p>}
                
                <button onClick={() => this.props.saveQuestion(this.state.question)} className="btn btn-primary">Save</button>
            </h2>
        )
    }
}


export default CreateQuestionForm;