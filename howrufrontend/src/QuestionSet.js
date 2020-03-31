import React from 'react';
import Question from './Question';

class QuestionSet extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
                    questionArray: [{ question: "How did you sleep?", type: "range" }, 
                                    { question: "How much coffee did you drink?", type: "text" }],
                                    
                    questionCounter: 0
        };
    }

    addOne = () => {
        if (!(this.state.questionCounter+1 === this.state.questionArray.length)) {
            this.setState((previousState) => ({ questionCounter: previousState.questionCounter + 1 }));
        }
    }

    decOne = () => {
        if (!(this.state.questionCounter - 1 < 0)) {
            this.setState((previousState) => ({ questionCounter: previousState.questionCounter - 1 }));
        }
    }

    render() {
        let currentQuestion = this.state.questionArray[this.state.questionCounter]

        return (
            <div id="questions" className="box">
                <Question question={currentQuestion.question} type={currentQuestion.type}></Question>
                <div>
                    <button onClick={this.decOne}>Previous</button>
                    <button onClick={this.addOne}>Next</button>
                </div>
            </div>
        )
    }
}


export default QuestionSet;