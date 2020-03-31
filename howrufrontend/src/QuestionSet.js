import React from 'react';
import Question from './Question';
import Questions from './questionsTest.json';


class QuestionSet extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Questions,
            questionCounter: 0                            
        };
    }

    addOne = () => {

        if (!(this.state.questionCounter+1 === this.state.Questions.questions.length)) {
            this.setState((previousState) => ({ questionCounter: previousState.questionCounter + 1 }));
        }
    }

    decOne = () => {
        if (!(this.state.questionCounter - 1 < 0)) {
            this.setState((previousState) => ({ questionCounter: previousState.questionCounter - 1 }));
        }
    }

    render() {
        let currentQuestion = this.state.Questions.questions[this.state.questionCounter]

        return (
            <div id="questions" className="box">
                <Question id={currentQuestion.id} question={currentQuestion.question} type={currentQuestion.type} responses={currentQuestion.responses}/>
                <div>
                    <button onClick={this.decOne}>Previous</button>
                    <button onClick={this.addOne}>Next</button>
                </div>
            </div>
        )
    }
}


export default QuestionSet;