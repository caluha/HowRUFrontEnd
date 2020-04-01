import React from 'react';
import Response from './Response';

class Question extends React.Component {

    constructor(props) {
        super(props);
        this.updateAnswer = this.updateAnswer.bind(this);

        this.state = { 
            
                responses: [],
                value:"",
                text:"",
                optionType:""
            
        }
    }

    

    addResponses() {
        // if (this.props.responses.length > 0) {
        //     return this.props.responses.map((e) => <Response type={this.props.type} value={e.value} option={e.option}/>)
        // } else {
        //     return <Response type={this.props.type}/>
        // }
        return this.props.responses.map((e) => <Response type={this.props.type} key={e.id} 
                                                id={e.id} value={e.value} min={e.min} max={e.max} 
                                                min_description={e.min_description} max_description={e.max_description}  
                                                option={e.option}
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
        // let newValue = event.target.value;
        // let newId = event.target.id;
        // if(this.checkResponseArray(newId)){
        //     this.setState((previousState) => {
        //         let ns = previousState;
        //         for (const index in ns.responses) {
        //             if(ns.responses[index].responseId === newId){
        //                 ns.responses[index].responseValue = newValue;
        //             }
        //         }
        //         return ns;
        //     })
        // } else {
        //     this.setState({ responses: this.state.responses.concat(
        //         {   responseId: newId,
        //             responseValue: newValue
        //         }
        //     ) 
        // })
        // }
    }

    // handleAnswer = (id, nextAnswer) => {
    //     this.setState((previousState) => {
    //         let ns = previousState;
    //         ns.answers[id] = nextAnswer;
    //         return ns;
    //     })
    
    // for (const response of this.state.responses) {
    //     if(response.responseId === event.target.id){
    //         response.responseValue = event.target.value;
    //     }
    // }

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