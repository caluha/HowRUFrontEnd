import React from 'react';

import QuestionList from './QuestionList'; 
import './CreateEdit.css';

class CreateQuestionSet extends React.Component{

    constructor(props){
        super(props);
        this.addQuestion=this.addQuestion.bind(this); 
        this.removeQuestion=this.removeQuestion.bind(this); 
        this.handleChange = this.handleChange.bind(this);

        this.state={
            title:"",
            user:"Adam",
            questions: [], 
            nextQuestionId:0,
        }

    }

    addQuestion(question){

        let index = this.state.questions.findIndex(t => t.id===question.id);
        if(index !== -1 ){
            let newArray = this.state.questions;
            newArray[index] = question;
            this.setState({questions:newArray});
        } else {
            this.setState( prev => { return  { questions: [...prev.questions, question] , nextQuestionId: prev.nextQuestionId+1} } );
        }
    }

    removeQuestion(question){
        let index = this.state.questions.findIndex(t => t.id===question.id);
        if(index !==-1){
            let newArray = this.state.questions;
            newArray.splice(index,1);
            this.setState({questions:newArray});
        }
    }



    handleChange(event){
        this.setState({[event.target.name] : event.target.value});
        event.preventDefault(); 
    }

    render(){
        return (
            <div className="questionSetCreateContainer">
                <div className="trackerNameHeader">
                    <div className="row">
                        <div className="col-4">
                            <p className="trackerNameLabel">Tracker name</p>
                        </div>
                        <div className="col-8">
                            <input className="input-group trackerNameInput" name="title" placeholder="New question set" 
                                onChange={this.handleChange}
                                value={this.state.title}></input>
                        </div>
                    </div>
                </div>
                <QuestionList questions={this.state.questions} 
                            nextId = {this.state.nextQuestionId}
                            maxQuestions = {8}
                            saveQuestion={this.addQuestion}
                            removeQuestion={this.removeQuestion} />
            </div>
        );
    }







}

export default CreateQuestionSet; 