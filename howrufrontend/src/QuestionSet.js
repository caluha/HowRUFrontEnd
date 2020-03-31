import React from 'react';
import Question from './Question';
import Questions from './questionsTest.json';


class QuestionSet extends React.Component {

    constructor(props) {
        super(props);
        this.handleAnswer = this.handleAnswer.bind(this);
        this.state = {
            Questions,
            questionCounter: 0,
            answers: []                                      
        };
    }

    handleAnswer = (answer) => {
        this.setState((previousState) => ({ answers: previousState.answers.push(answer)}))
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
                <Question id={currentQuestion.id} question={currentQuestion.question} type={currentQuestion.type} responses={currentQuestion.responses} handleAnswer={this.handleAnswer}/>
                <div>
                    <button onClick={this.decOne}>Previous</button>
                    <button onClick={this.addOne}>Next</button>
                </div>
            </div>
        )
    }
}


export default QuestionSet;