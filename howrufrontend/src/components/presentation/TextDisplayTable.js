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
                <h2>
                    This data set has no text answers to display!
                </h2>
            );
        }


        let textDisplays = [];
        for (let i in dates){
            let ts = texts.map( tArray => tArray[i] ); 
            textDisplays.push(
                <TextDisplay key={dates[i]} date={dates[i]} texts = {ts} />
            )
        }

        console.log(textDisplays);
        
        
        return ( 
            <ul className="tabledisplay" style={{padding:"0"}} >
                {textDisplays}
            </ul>
         );
    }
}
 
export default TextDisplayTable;