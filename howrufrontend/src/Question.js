import React from 'react';
import Response from './Response';
import './QuestionSet.css'

class Question extends React.Component {

    constructor(props) {
        super(props);
        this.updateAnswer = this.updateAnswer.bind(this);
        switch(this.props.type) {
            case "TEXT":
                this.state = {
                    responses: [{
                        optionId: this.props.responses[0].id,
                        username: "Adam",
                        text: "",
                        value: null
                    }]
                }
                break;
            case "RANGE":
                this.state = {
                    responses: [{optionId: this.props.responses[0].id,
                                username: "Adam",
                                text: null,
                                value: (this.props.responses[0].min + this.props.responses[0].min) / 2
                 }]
                }
                break;
            case "RADIO":
                this.state = {
                    responses: []
                }
                break;
            case "CHECKBOX":
                this.state = {
                    
                }
                break;
            default:
                break;
        }
    }

    

    addResponses() {
        // if (this.props.responses.length > 0) {
        //     return this.props.responses.map((e) => <Response type={this.props.type} value={e.value} option={e.option}/>)
        // } else {
        //     return <Response type={this.props.type}/>
        // }
        return this.props.responses.map((e) => <Response type={this.props.type} 
                                                        key={e.id} 
                                                        id={e.id} 
                                                        value={e.value} 
                                                        min={e.min} 
                                                        max={e.max} 
                                                        min_description={e.min_description} 
                                                        max_description={e.max_description}  
                                                        option={e.option}
                                                        defaultValue={this.state.responses}
                                                        updateAnswer = {this.updateAnswer} />)
    }

    updateAnswer(event){
        // console.log(event.target.id);
        // console.log(event.target.value);
        switch (this.props.type){
            case "TEXT":
                this.setState({responses: [{optionId:event.target.id, username:"Adam", text:event.target.value, value:null}]})
                break;
            case "RANGE":
                this.setState({responses: [{optionId:event.target.id, username:"Adam", text:null, value:event.target.value}]})
                break;
            case "RADIO":
                this.setState({responses: [{optionId:event.target.id, username:"Adam", text:null, value:null}]})
                break;
            case "CHECKBOX":
                break;
            default:
                break;

        }

    }


    checkResponseArray(responseId){
        let counter = 0;
        for (const response of this.state.responses) {
            if (response.responseId === responseId){
                counter++;
            }
        }
        return counter > 0 ? true : false;       
    }

    previous = () => {

        this.props.handleAnswer(this.props.id, this.state.responses);
        this.props.previous();

    }

    next = () => {
        this.props.handleAnswer(this.props.id, this.state.responses);
        this.props.next();
    }

    render() {
        return(
            <div>
                <form onChange={this.updateAnswer}>
                    <div className="question">{this.props.question}</div>
                    <div id="responsecontainer" className="response">
                        {this.addResponses()}
                    </div>
                </form>
                <div className="prev-next_button">
                    <button onClick={this.previous} >Previous</button>
                    <button onClick={this.next}>Next</button>
                </div>
            </div>
        )
    }
}

export default Question;