import React from 'react';
import Question from './Question';
import Questions from './questionsTest.json';


class QuestionSet extends React.Component {

    constructor(props) {
        super(props);
        this.handleAnswer = this.handleAnswer.bind(this);
        this.addOne = this.addOne.bind(this);
        this.decOne = this.decOne.bind(this);

        this.state = {
            Questions,
            questionCounter: 0,
            answers: {}
        };
    }

    handleAnswer = (id, nextAnswer) => {
        this.setState((previousState) => {
            let ns = previousState;
            ns.answers[id] = nextAnswer;
            return ns;
        })

        console.log(this.state);
    }

    addOne = () => {

        if (!(this.state.questionCounter + 1 === this.state.Questions.questions.length)) {
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
            <div>
                <div className="box">
                    <Question id={currentQuestion.id} question={currentQuestion.question} type={currentQuestion.type}
                        responses={currentQuestion.responses} handleAnswer={this.handleAnswer}
                        next={this.addOne} previous={this.decOne} />
                </div>
            </div>
        )
    }
}


export default QuestionSet;