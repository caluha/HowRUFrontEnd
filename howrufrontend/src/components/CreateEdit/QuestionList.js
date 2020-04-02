import React from 'react';
import CreateQuestionForm from './CreateQuestionForm';

class QuestionList extends React.Component {


    constructor(props){
        super(props);

        this.addQuestion=this.addQuestion.bind(this);
        this.showQuestionForm=this.showQuestionForm.bind(this);
    

        this.state = {
            showingNewQuestionForm: false,
        }
    }

    showQuestionForm(){
            this.setState(prev =>( { showingNewQuestionForm: !prev.showingNewQuestionForm } ))
    }

    closeQuestionForm(){
        this.setState({ showingNewQuestionForm: false });
    }

    addQuestion(question){
        this.props.saveQuestion(question);
        this.closeQuestionForm();
    }

    render(){
        let qForm = <CreateQuestionForm saveQuestion={this.addQuestion} />;

        let questionElements = [];
        for(const el of this.props.questions ){
            questionElements.push(
                <li>
                    {el.question}
                </li>
            )
        }

        return (
            <div>
                <h2>Question list works!</h2>
                <ul>
                    {questionElements}
                </ul>
                <button onClick={this.showQuestionForm}>Add question</button>

                { this.state.showingNewQuestionForm  && qForm  }
            </div>
        )
    }

    
}

export default QuestionList;