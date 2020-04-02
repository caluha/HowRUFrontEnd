import React from 'react';

import QuestionList from './QuestionList'; 

class CreateQuestionSet extends React.Component{

    constructor(props){
        super(props);
        this.addQuestion=this.addQuestion.bind(this); 

        this.state={
            title:"",
            user:"Adam",
            questions: []
        }

    }

    render(){
        return (
            <div>
                <h1>Create new question set</h1>
                <input placeholder="Title"></input>

                <QuestionList saveQuestion={this.addQuestion} />
            </div>
        );
    }



    addQuestion(question){

        this.setState(   { questions: [...this.state.questions, question]}  );

    }



}

export default CreateQuestionSet; 