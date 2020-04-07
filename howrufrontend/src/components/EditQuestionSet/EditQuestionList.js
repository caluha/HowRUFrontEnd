import React from 'react';
import '../CreateEdit/CreateEdit.css';

import QuestionDisplay from './QuestionDisplay';
import DeleteModal from './DeleteModal';

class EditQuestionList extends React.Component {

    constructor(props) {
        super(props);

        this.addQuestion = this.addQuestion.bind(this);
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

    showDeleteModal() {
        let deleteModal = <DeleteModal 
        message={"the question \""+ questionSet.name+"\" "} 
        delete={this.deleteQuestionSet(questionSet)}
        hideModal={this.hideDeleteModal} />
this.setState({
deleteModal:deleteModal,
showDeleteModal:true,

});
        let delModal = <DeleteModal message= /> 
        
        this.setState(prev => ({ showDeleteModal: !prev.showDeleteModal }))
        
    }

    closeDeleteForm() {
        this.setState({
            showDeleteModal: false,
            deleteQuestion: false,
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

    addQuestion(question) {
        this.props.saveQuestion(question);
        this.closeQuestionForm();
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