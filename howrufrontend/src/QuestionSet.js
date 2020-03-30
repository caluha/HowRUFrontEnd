import React from 'react';





class QuestionSet extends React.Component () {

    state = ({questionCounter: 0});

    questions = () => {
        return ["How did you sleep?", "How much coffee did you drink?"];
    }

    questionRow = () => {   
        questionArray = this.questions(); 
        return questionArray[this.state.questionCounter];
    }

    addOne = () => {
        this.setState((previousState) => ({questionCounter: previousState.questionCounter++}));
    }

    render() {
        return (
            <div id="questions">
                <div>{this.questionRow()}</div>
                <form>
                    <input type="range" min="0" max="10" defaultValue="0"></input>
                </form>
                <div>
                    <button>Previous</button>
                    <button onClick={this.addOne}>Next</button>
                </div>
            </div>
        )    
    }
}

export default QuestionSet;