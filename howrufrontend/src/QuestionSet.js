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

    componentDidMount() {
        let questionComponents = [];
        console.log(Questions.questions);
        for (const e of Questions.questions) {
            questionComponents.push(<Question key={e.id} id={e.id} question={e.question} type={e.type}
                        responses={e.responses} handleAnswer={this.handleAnswer}
                        next={this.addOne} previous={this.decOne} />)
        }

        // this.questionComponents = questionComponents;
        this.setState({questionComponents: questionComponents});
    }

    handleAnswer = (id, nextAnswer) => {
        this.setState((previousState) => {
            let ns = previousState;
            ns.answers[id] = nextAnswer;
            return ns;
        })
        console.log(this.state.answers);
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
        
        return (
            <div>
                <div className="box_question">
                    {this.state.questionComponents ? this.state.questionComponents[this.state.questionCounter] : <h2>Loading...</h2>}
                </div>
            </div>
        )
    }
}


export default QuestionSet;