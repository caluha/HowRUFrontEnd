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

    submitData = () => {
        const url = "http://localhost:8080/response";
        for (const i in this.state.answers) {
            for (const j in this.state.answers[i]) {
                const data = this.state.answers[i][j];
                console.log(data);
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log('Success:', data);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            }
        }


        // for (const i in this.state.answers) {
        //     console.log(this.state.answers[i]);
        //         fetch(url,{ 
        //             method: 'post',
        //             headers: {'Content-Type': 'application/json',
        //           'transfer-encoding':'chunked' },
        //             body: JSON.stringify(this.state.answers[i]) , 
        //           })
        // }
        // fetch(url, {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         firstParam: 'yourValue',
        //         secondParam: 'yourOtherValue',
        //     })
        // })



        //send(tjofräs).to(TheBackend).plsWork();
    }

    addOne = () => {
        if (!(this.state.questionCounter + 1 === this.state.Questions.length + 1)) {
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
                key={e.id} id={e.id} question={e.question} type={e.type}
                responses={e.responses} handleAnswer={this.handleAnswer}
                next={this.addOne} previous={this.decOne}

                storeState={this.storeQuestionState}
                initialState={this.state.questionStates[e.id] ? this.state.questionStates[e.id] : undefined}
            />)
        }
        if (this.state.questionCounter === this.state.Questions.length) {
            return (
                //Det här ska istället returnera en ny komponent som innehåller Submit-knappen med tillhörande
                //funktionalitet.
                <div>
                    <div className="box_question">
                        <button className="submitButton" onClick={this.submitData}>SUBMIT</button>
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