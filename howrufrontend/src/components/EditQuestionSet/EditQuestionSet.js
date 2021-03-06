import React from 'react';
import '../CreateEdit/CreateEdit.css';
import { Redirect } from 'react-router-dom';
import EditQuestionList from './EditQuestionList';
import '../CreateEdit/CreateEdit.css';


const maxQuestions = 8;

class EditQuestionSet extends React.Component {

    constructor(props) {
        super(props);
        // this.addQuestion=this.addQuestion.bind(this); 
        this.removeQuestion=this.removeQuestion.bind(this); 
        // this.handleChange = this.handleChange.bind(this);
        // this.submitToBackend=this.submitToBackend.bind(this);

        this.state = {
            questionSet: {
                id: this.props.match.params.id,
                name: "",
                creator: "",
                created: "",
                questions: []
            },
            showEditQuestion: false,
            editQuestion: {},
            user: this.props.user,
            submitted: false,
            errors: [],
        }

        this.id = this.props.match.params.id;
    }

    async getQuestionSet() {
        // let url = "http://localhost:8080/questionset/user/" + this.props.user;
        let url = "http://howru.live:8080/questionset/"+this.id; 
        await fetch(url)
            .then(result => result.json())
            .then(result => {
                this.setState({ questionSet: result });
            })
    }

    componentDidMount() {
        this.getQuestionSet();
    }

    removeQuestion = (questionId) => {

        let url = "http://howru.live:8080/question/";
        fetch (url + questionId, {method: 'DELETE'})
            .then(result => result.json())
            .then(result => {
            });

        this.setState((prev) => {
            let questionSet = prev.questionSet;
            for (const i in questionSet.questions) {
                if (questionSet.questions[i].id === questionId) {
                    questionSet.questions.splice(i, 1);
                }
            }
            this.setState({questionSet: questionSet});
        })
    }

    submitQuestionSet = () => {
        let errors = [];
        if (this.state.questionSet.name.trim() === "") {
            errors.push({ error: "title", message: "Tracker must have a title!" });
        }
        if (this.state.questionSet.questions.length < 1) {
            errors.push({ error: "noQuestions", message: "Tracker must have at least one question!" });
        }
        if (this.state.questionSet.questions.length > maxQuestions) {
            errors.push({ error: "tooManyQuestions", message: "Tracker can't have more than " + maxQuestions + " questions!" });
        }
        if (errors.length > 0) {
            this.setState({ errors: errors });
        } else {
            this.submitToBackend();
            this.setState({ submitted: true });
        }


    }



    async submitToBackend() {

        // let questionSet = {
        //     name:this.state.title,
        //     creator:this.state.user,
        //     questions:[]
        // }

        // let questions = [];
        // for(let q of this.state.questions){
        //     let newQ = {
        //         question: q.question,
        //         type: q.type,
        //         responses:q.responses
        //     };
        //     questions.push(newQ);
        // }
        // questionSet.questions=questions;

        // const url = "http://localhost:8080/questionset";
        const url = "http://howru.live:8080/questionset/"
        await fetch(url + this.state.questionSet.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.name),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            return data;
        })
        .catch((error) => {
            console.error('Error:', error);
            return error;
        });
        this.setState({submitted: true});
    }


    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });

        event.preventDefault();


        if (event.target.name === "title" && event.target.value.trim() !== "") {
            let i = this.state.errors.findIndex(t => t.error === "title");
            if (i !== -1) {
                let newErrors = this.state.errors;
                newErrors.splice(i, 1);
                this.setState({ errors: newErrors });
            }
        }

    }

    render() {

        if (this.state.submitted) {
            return <Redirect to="/" />;
        }

        if (this.props.user !== this.state.questionSet.creator) {
            return <h1>No snooping!</h1>
        }

        // let errorList = undefined;
        // if(this.state.errors.length>0){
        //     errorList = <ErrorList errors={this.state.errors} />;
        // }


        return (
            <div className="questionSetCreateContainer">
                <div className="trackerNameHeader">
                    <div className="row">
                        <div className="col-4">
                            <p className="trackerNameLabel">Tracker name</p>
                        </div>
                        <div className="col-8">
                            <input className="input-group trackerNameInput" name="name" placeholder="Tracker name"
                                onChange={this.handleChange}
                                defaultValue={this.state.questionSet.name}></input>
                        </div>
                    </div>
                </div>
                <EditQuestionList questions={this.state.questionSet.questions}
                    nextId={0}
                    maxQuestions={maxQuestions}
                    saveQuestion={this.addQuestion}
                    removeQuestion={this.removeQuestion} />

                {/* <div className="trackerNameHeader">
                    <div className="row">
                        <div className="col-4">
                            <p className="trackerNameLabel">Tracker name</p>
                        </div>
                        <div className="col-8">
                            <input className="input-group trackerNameInput" name="title" placeholder="New tracker" 
                                onChange={this.handleChange}
                                value={this.state.title}></input>
                        </div>
                    </div>
                </div>
                
               
               {/* {errorList} */}

                <div className="bottom-bar">

                    <span className="bottomBarText">
                        Total questions: {this.state.questionSet.questions ? this.state.questionSet.questions.length : "0"}
                    </span>

                    <button
                        onClick={this.submitQuestionSet}
                        className="saveQuestionSetButton">
                        Save tracker
                    </button>
                </div>

            </div>
        );
    }
}

export default EditQuestionSet; 