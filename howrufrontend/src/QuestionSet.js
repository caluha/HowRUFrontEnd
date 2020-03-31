import React from 'react';
import Question from './Question';

class QuestionSet extends React.Component {
//         "id": 1,
    //     "name": "QSName1",
    //     "creator": "Adam",
    //     "created": "2020-03-30T17:15:06.003077",

    // }


    constructor(props) {
        super(props);
        this.state = {
            questions: [
            {
                id: 1,
                question: "Your age?",
                type: "TEXT",
                responses: []
            },
            {
                id: 2,
                question: "How are you feeling?",
                type: "RANGE",
                responses: []
            },
            {
                id: 3,
                question: "Check all that apply",
                type: "CHECKBOX",
                responses: [{
                            option: "Äpple", 
                            value: 1
                        },             
                        {
                            option: "Banan", 
                            value: 15}]
            },
        ],
        
        questionCounter: 0                            
                    
        };
    }

    addOne = () => {
        if (!(this.state.questionCounter+1 === this.state.questions.length)) {
            this.setState((previousState) => ({ questionCounter: previousState.questionCounter + 1 }));
        }
    }

    decOne = () => {
        if (!(this.state.questionCounter - 1 < 0)) {
            this.setState((previousState) => ({ questionCounter: previousState.questionCounter - 1 }));
        }
    }

    render() {
        let currentQuestion = this.state.questions[this.state.questionCounter]

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