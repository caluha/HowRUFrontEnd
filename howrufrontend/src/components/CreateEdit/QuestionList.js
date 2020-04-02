import React from 'react';
import CreateQuestionForm from './CreateQuestionForm';

class QuestionList extends React.Component {


    constructor(props){
        super(props);

        this.addQuestion=this.addQuestion.bind(this);
        this.showQuestionForm=this.showQuestionForm.bind(this);
    

        this.state = {
            showingNewQuestionForm: false,
            createNewQuestionForm: null,
        }
    }

    showQuestionForm(){
        if(!this.state.createNewQuestionComponent){
            console.log("Try to show component")
            this.setState({
                showingNewQuestionForm: true,
                createNewQuestionForm: <CreateQuestionForm saveQuestion={this.addQuestion} /> } )
        }
    }

    closeQuestionForm(){
        if(this.state.createNewQuestionComponent){
            this.setState({
                showingNewQuestionForm: false,
                createNewQuestionForm:null });
        }
    }

    addQuestion(question){
        
        this.props.saveQuestion(question);
        this.closeQuestionForm();
    
    }

    render(){
        return (
            <div>
                <h2>Question list works!</h2>
                <ul>
                    <li>
                        Question1
                    </li>
                    <li>
                        Question2
                    </li>
                </ul>
                <button onClick={this.showQuestionForm}>Add question</button>

                { this.state.showingNewQuestionForm  && this.state.createNewQuestionForm  }
            </div>
        )
    }

    
}

export default QuestionList;