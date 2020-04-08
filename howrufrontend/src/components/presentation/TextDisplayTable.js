import React, { Component } from 'react';
import TextDisplay from './TextDisplay';
import './graph.css'
class TextDisplayTable extends Component {
    constructor(props) {
        super(props);
        let textQuestions = [];
        for(let q of props.questions){
            if(q.type==="TEXT"){
                textQuestions.push(q); 
            }
        }
        this.state = { 
            textQuestions: textQuestions,
         }


    }



    render() { 

        let {dates, texts } = this.props; 

        if(texts.length === 0){
            return (
                <div className="showNoData">
                    <p className="bordered">
                        This data set has no text answers to display!
                    </p>
                </div>
            );
        }
        let questions = [];
        for(let q of this.state.textQuestions){
            questions.push(
            <div key={q.id} className="questionText">
                {q.question}
            </div>)
        }

        let textDisplays = [];
        for (let i in dates){
            let ts = texts.map( tArray => tArray[i] ); 
            textDisplays.push(
                <TextDisplay key={dates[i]} date={dates[i]} texts = {ts} />
            )
        }        
        
        return ( 
            <React.Fragment>
                <div className="questionHeaderContainer">
                    <div className="questionHeaderBox">
                        <h4 className="questionHeader">Questions</h4>
                        {questions}
                    </div>
                </div>
                <ul className="tabledisplay" style={{padding:"0"}} >
                    {textDisplays}
                </ul>
            </React.Fragment>
         );
    }
}
 
export default TextDisplayTable;