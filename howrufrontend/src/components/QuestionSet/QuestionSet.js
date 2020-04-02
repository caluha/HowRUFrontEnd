import React from 'react';
import Question from './Question';
import APIConnection from '../../testclasses/APIConnection';



class QuestionSet extends React.Component {

    constructor(props) {
        super(props);
        this.handleAnswer = this.handleAnswer.bind(this);
        this.addOne = this.addOne.bind(this);
        this.decOne = this.decOne.bind(this);
    
        this.state = {
            Questions: this.props.questionSet.questions,
            questionCounter: 0,
            answers: {},
            questionStates: {},
        };

        this.storeQuestionState = this.storeQuestionState.bind(this);
    }

    handleAnswer = (id, nextAnswer) => {
        this.setState((previousState) => {
            let ns = previousState;
            ns.answers[id] = nextAnswer;
            return ns;
        })
        // console.log(this.state.answers);
    }

    addOne = () => {
        if (!(this.state.questionCounter + 1 === this.state.Questions.length)) {
            this.setState((previousState) => ({ questionCounter: previousState.questionCounter + 1 }));
        }
    }

    decOne = () => {
        if (!(this.state.questionCounter - 1 < 0)) {
            this.setState((previousState) => ({ questionCounter: previousState.questionCounter - 1 }));
        }
    }

    storeQuestionState (questionId, questionState)  {
        this.setState( (prev) => {
            let ns = prev;
            ns.questionStates[questionId] = questionState;
            return ns;
        } )
    }

    render() {

        let questionComponents = [];
        console.log(this.state.Questions);
        for (const e of this.state.Questions) {

            
            questionComponents.push(<Question 
                        // initialState={this.state.answers[e.id] ? this.state.answers[e.id] : undefined }
                        key={e.id} id={e.id} question={e.question} type={e.type}
                        responses={e.responses} handleAnswer={this.handleAnswer}
                        next={this.addOne} previous={this.decOne} 

                        storeState={this.storeQuestionState}
                        initialState = {this.state.questionStates[e.id] ? this.state.questionStates[e.id] : undefined }
                        />)
        }
        
        return (
            <div>
                <div className="box_question">
                    {questionComponents[this.state.questionCounter]}
                    {/* {this.state.questionComponents ? this.state.questionComponents[this.state.questionCounter] : <h2>Loading...</h2>} */}
                </div>
            </div>
        )
    }
}


export default QuestionSet;