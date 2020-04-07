import React from 'react';
import '../CreateEdit/CreateEdit.css';

import QuestionDisplay from './QuestionDisplay';
import DeleteModal from './DeleteModal';

class EditQuestionList extends React.Component {

    constructor(props) {
        super(props);

        this.showQuestionForm = this.showQuestionForm.bind(this);
        this.closeQuestionForm = this.closeQuestionForm.bind(this);

        this.state = {
            showingNewQuestionForm: false,

            showEditQuestion: false,
            editQuestion: null,

            showDeleteModal:false,
            deleteQuestion: null,
            deleteModal: null,
        }
    }

    showDeleteModal(question) {
        return () => {
            console.log("trying to show delete modal...")
        let deleteModal = <DeleteModal 
            message={"the question \""+ question.question+"\" "} 
            delete={this.removeQuestion(question.question)}
            hideModal={this.hideDeleteModal} />

        this.setState({
        deleteModal:deleteModal,
        showDeleteModal:true,

        });}
        
    }

    hideDeleteModal(){
        this.setState({
            deleteModal:null,
            showDeleteModal:false,

        });
}

    closeDeleteForm() {
        this.setState({
            showDeleteModal: false,
            deleteQuestion: null,
            deleteModal: null
        });
    }
    showQuestionForm() {
        if (this.props.questions.length < this.props.maxQuestions) {
            this.setState(prev => ({ showingNewQuestionForm: !prev.showingNewQuestionForm }))
        }
    }

    closeQuestionForm() {
        this.setState({
            showingNewQuestionForm: false,
            showEditQuestion: false,
            editQuestion: null
        });
    }



    removeQuestion(question) {
        this.props.removeQuestion(question);
    }

    render() {
        // let qForm = <CreateQuestionForm questionId={this.props.nextId}
        //     saveQuestion={this.addQuestion}
        //     closeForm={this.closeQuestionForm} />;
        // let editQuestionForm = null;
        // if (this.state.showEditQuestion) {
        //     editQuestionForm = <CreateQuestionForm questionId={this.state.editQuestion.id}
        //         question={this.state.editQuestion}
        //         saveQuestion={this.addQuestion}
        //         closeForm={this.closeQuestionForm} />
        // }
        let questionElements = [];
        let deleteModals = undefined; 

        for (const el of this.props.questions) {
            questionElements.push(
                <QuestionDisplay
                    key={el.id}
                    question={el}
                    showDelete={() => { this.showDeleteModal(el)}}
                    showEdit={() => {
                        this.setState({
                            showEditQuestion: true,
                            editQuestion: el
                        })
                    }}
                    removeQuestion={() => this.removeQuestion(el)} />
            )
        }

        return (
            <div className="questionListContainer">
                <ul className="questionList">
                    {questionElements}
                </ul>
                {/* {this.state.showEditQuestion ? editQuestionForm : this.state.showingNewQuestionForm && qForm} */}
            </div>
        )
    }
}

export default EditQuestionList;