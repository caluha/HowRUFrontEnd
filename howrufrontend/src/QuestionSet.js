import React from 'react';

class QuestionSet extends React.Component () {

    

    // constructor (props) {
    //     this.state={questionArray:["How did you sleep?", "How much coffee did you drink?"], 
    //     questionCounter: 0};
        
    // }
 
    addOne = () => {
        this.setState((previousState) => ({questionCounter: previousState.questionCounter+1}));
    }

    render() {
    let currentQuestion=<h2>{this.state.questionArray[this.state.questionCounter]}</h2>;
        return (
            <div id="questions">
                <div>{currentQuestion}</div>
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