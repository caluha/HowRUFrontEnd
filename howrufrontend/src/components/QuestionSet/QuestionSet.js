import React from 'react';
import Question from './Question';

class QuestionSet extends React.Component {

    constructor(props) {
        super(props);
        this.handleAnswer = this.handleAnswer.bind(this);
        this.addOne = this.addOne.bind(this);
        this.decOne = this.decOne.bind(this);
        this.submitAnswer = this.submitAnswer.bind(this);

        this.state = {
            Questions: this.props.questionSet.questions,
            firstQuestion: this.props.questionSet.questions[0].id,
            lastQuestion: this.props.questionSet.questions[this.props.questionSet.questions.length - 1].id,
            questionCounter: 0,
            answers: {},
            questionStates: {},
            submitted: false,
        };

        this.storeQuestionState = this.storeQuestionState.bind(this);
    }

    handleAnswer = (id, nextAnswer) => {

        this.setState((previousState) => {
            let ns = previousState;
            ns.answers[id] = nextAnswer;
            return ns;
        })
    }

    submitAnswer = (id, nextAnswer) => {

        this.setState((previousState) => {
            let ns = previousState;
            ns.answers[id] = nextAnswer;
            return ns;
        }, () => {
            this.submitData();
        })

        this.setState({ submitted: true });
    }

    submitData = () => {
        let responses = [];
        const url = "http://ec2-13-53-42-207.eu-north-1.compute.amazonaws.com:8080/response";
        // const url = "http://localhost:8080/response";
        for (const i in this.state.answers) {
            for (const j in this.state.answers[i]) {
                const data = this.state.answers[i][j];
                console.log(data);
                responses.push(data);
            }
        }
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(responses),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
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

    storeQuestionState(questionId, questionState) {
        this.setState((prev) => {
            let ns = prev;
            ns.questionStates[questionId] = questionState;
            return ns;
        })
    }

    render() {

        let questionComponents = [];
        console.log(this.state.Questions);
        for (const e of this.state.Questions) {

            questionComponents.push(<Question
                // initialState={this.state.answers[e.id] ? this.state.answers[e.id] : undefined }
                key={e.id}
                id={e.id}
                user={this.props.user}
                lastQuestion={e.id === this.state.lastQuestion ? true : false}
                firstQuestion={e.id === this.state.firstQuestion ? true : false}
                question={e.question}
                type={e.type}
                responses={e.responses}
                handleAnswer={e.id === this.state.lastQuestion ? this.submitAnswer : this.handleAnswer}
                next={this.addOne}
                previous={this.decOne}
                submitted={this.state.submitted}
                storeState={this.storeQuestionState}
                initialState={this.state.questionStates[e.id] ? this.state.questionStates[e.id] : undefined}
            />)
        }
        if (this.state.questionCounter === this.state.Questions.length - 1) {
            return (
                //Det här ska istället returnera en ny komponent som innehåller Submit-knappen med tillhörande
                //funktionalitet.
                <div>
                    <div className="box_question">
                        {questionComponents[this.state.questionCounter]}
                        {/* {this.state.questionComponents ? this.state.questionComponents[this.state.questionCounter] : <h2>Loading...</h2>} */}
                    </div>
                </div>
            )
        } else {
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
}


export default QuestionSet;