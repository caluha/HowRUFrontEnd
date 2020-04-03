import React from 'react';

import './CreateEdit.css'; 
import CreateQuestionForm from './CreateQuestionForm';
import QuestionDisplay from './QuestionDisplay';

class QuestionList extends React.Component {


    constructor(props){
        super(props);

        this.addQuestion=this.addQuestion.bind(this);
        this.showQuestionForm=this.showQuestionForm.bind(this);

        this.state = {
            showingNewQuestionForm: false,

            showEditQuestion:false,
            editQuestion:null,
        }
    }

    showQuestionForm(){

        if(this.props.questions.length < this.props.maxQuestions){
            this.setState(prev =>( { showingNewQuestionForm: !prev.showingNewQuestionForm } ))
        }


        
    }

    closeQuestionForm(){
        this.setState({ showingNewQuestionForm: false, 
                        showEditQuestion: false,
                        editQuestion:null });
    }



    addQuestion(question){
        this.props.saveQuestion(question);
        this.closeQuestionForm();
    }

    removeQuestion(question){
        this.props.removeQuestion(question);
    }

    render(){
        let qForm = <CreateQuestionForm questionId={this.props.nextId} 
                                        saveQuestion={this.addQuestion} />;
        let editQuestionForm = null;
        if(this.state.showEditQuestion){
            editQuestionForm =  <CreateQuestionForm questionId={this.state.editQuestion.id}  
                                                    question={this.state.editQuestion} 
                                                    saveQuestion={this.addQuestion} />
        }
        let questionElements = [];
        
        for(const el of this.props.questions ){

            questionElements.push(
                <QuestionDisplay
                    key={el.id}
                    question={el} 
                    showEdit={() => { this.setState({showEditQuestion:true, 
                        editQuestion:  el }) }} 
                    removeQuestion={()=> this.removeQuestion(el)} />
            )

            // questionElements.push(
            //     <tr key={el.question}>
            //         <td><button onClick={() => { this.setState({showEditQuestion:true, 
            //                                                     editQuestion:  el }) }}>
            //             {el.question}</button>
            //         </td>
            //         <td>{el.type}</td>
            //         <td><button type="button"
            //                     onClick={()=> this.removeQuestion(el)}
            //                     className="btn btn-danger">X</button></td>
            //     </tr>
            // )
        }

        return (
            <div className="questionListContainer">
                <ul className="questionList">
                    {questionElements}
                </ul>
                <button 
                className="addQuestionButton"
                onClick={this.showQuestionForm}>Add question</button>
                { this.state.showEditQuestion ? editQuestionForm :  this.state.showingNewQuestionForm  && qForm     }
            </div>
        )
    }

}

export default QuestionList;