import React from 'react';
import QuestionList from '../CreateEdit/QuestionList'; 
import '../CreateEdit/CreateEdit.css';
import { Redirect } from 'react-router-dom';
import ErrorList from '../CreateEdit/ErrorList';
import EditQuestionList from './EditQuestionList';
import '../CreateEdit/CreateEdit.css'; 


const maxQuestions = 8; 

class EditQuestionSet extends React.Component{

    constructor(props){
        super(props);
        // this.addQuestion=this.addQuestion.bind(this); 
        // this.removeQuestion=this.removeQuestion.bind(this); 
        // this.handleChange = this.handleChange.bind(this);
        // this.submitToBackend=this.submitToBackend.bind(this);

        this.state={
            questionSet:{
                id:this.props.match.params.id,
                name:"",
                creator:"",
                created:"",
                questions:[]
            },
            showEditQuestion:false,
            editQuestion:{}, 
            user:this.props.user, 
            submitted:false,
            errors: [],
        }

        this.id = this.props.match.params.id;



    }

    componentDidMount(){
        this.getQuestionSet();
    }

    removeQuestion(question){
        
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

    getQuestionSet = () => {

        
            // console.log(this.state.loginData)
            // let url = "http://localhost:8080/questionset/user/" + this.state.loginData.user;
        let url = "http://ec2-13-53-42-207.eu-north-1.compute.amazonaws.com:8080/questionset/"+this.id; 
        console.log(url);
        fetch(url)
            .then(result => result.json())
            .then(result => {
                this.setState({ questionSet: result })
            })
        
    }

    async submitToBackend(){

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
          
        // // const url = "http://localhost:8080/questionset";
        // const url = "http://ec2-13-53-42-207.eu-north-1.compute.amazonaws.com:8080/questionset"
        // let response = await fetch(url, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(questionSet),
        // })
        // .then((response) => response.json())
        // .then((data) => {
        //     console.log('Success:', data);
        //     return data;
        // })
        // .catch((error) => {
        //     console.error('Error:', error);
        //     return error;
        // });

        // return response;
        
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

        if(this.props.user !== this.state.questionSet.creator){
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
                            <input className="input-group trackerNameInput" name="title" placeholder="Tracker name" 
                                onChange={this.handleChange}
                                value={this.state.questionSet.name}></input>
                        </div>
                    </div>
                </div>
                <EditQuestionList questions={this.state.questionSet.questions} 
                            nextId = {0}
                            maxQuestions = {maxQuestions}
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