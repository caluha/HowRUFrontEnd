import React from 'react';
import QuestionList from './QuestionList'; 
import './CreateEdit.css';
import { Redirect } from 'react-router-dom';
import ErrorList from './ErrorList';

const maxQuestions = 8; 

class CreateQuestionSet extends React.Component{

    constructor(props){
        super(props);
        this.addQuestion=this.addQuestion.bind(this); 
        this.removeQuestion=this.removeQuestion.bind(this); 
        this.handleChange = this.handleChange.bind(this);
        this.submitToBackend=this.submitToBackend.bind(this);

        this.state={
            title:"",
            user:this.props.user,
            questions: [], 
            nextQuestionId:0,
            submitted:false,
            errors: [],
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

        let i = this.state.errors.findIndex(t => t.error==="noQuestions");
        if(i!==-1){
            let newErrors = this.state.errors;
            newErrors.splice(i,1);
            this.setState({errors:newErrors});
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

    submitQuestionSet = () => {
        let errors = [];
        if(this.state.title.trim()===""){
            errors.push({error:"title", message:"Tracker must have a title!"});
        }
        if(this.state.questions.length<1){
            errors.push({error:"noQuestions", message:"Tracker must have at least one question!"});
        }
        if(this.state.questions.length>maxQuestions){
            errors.push({error:"tooManyQuestions", message:"Tracker can't have more than " + maxQuestions + " questions!"});
        }

        if(errors.length>0){
            this.setState({ errors: errors});
        } else {
            this.submitToBackend();

            this.setState({submitted:true});
        }


    }



    async submitToBackend(){

        let questionSet = {
            name:this.state.title,
            creator:this.state.user,
            questions:[]
        }

        let questions = [];
        for(let q of this.state.questions){
            let newQ = {
                question: q.question,
                type: q.type,
                responses:q.responses
            };
            questions.push(newQ);
        }
        questionSet.questions=questions;
          
        // const url = "http://localhost:8080/questionset";
        const url = "http://howru.live:8080/questionset"
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(questionSet),
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

        return response;
        
    }


    handleChange(event){
        this.setState({[event.target.name] : event.target.value});
        event.preventDefault(); 


        if(event.target.name==="title" && event.target.value.trim()!==""){
            let i = this.state.errors.findIndex(t => t.error==="title");
            if(i!==-1){
                let newErrors = this.state.errors;
                newErrors.splice(i,1);
                this.setState({errors:newErrors});
            }
        }

    }

    render(){
        
        if(this.state.submitted){
            return <Redirect to = "/" />;
        }

        let errorList = undefined;
        if(this.state.errors.length>0){
            errorList = <ErrorList errors={this.state.errors} />;
        }


        return (
            <div className="questionSetCreateContainer">
                <div className="trackerNameHeader">
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
                <QuestionList questions={this.state.questions} 
                            nextId = {this.state.nextQuestionId}
                            maxQuestions = {maxQuestions}
                            saveQuestion={this.addQuestion}
                            removeQuestion={this.removeQuestion} />

               {errorList}

                <div className="bottom-bar">

                    <span className="bottomBarText">
                        Total questions: {this.state.questions.length}
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

export default CreateQuestionSet; 