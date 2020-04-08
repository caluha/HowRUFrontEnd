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


        let textDisplays = [];
        for (let i in dates){
            let ts = texts.map( tArray => tArray[i] ); 
            textDisplays.push(
                <TextDisplay key={dates[i]} date={dates[i]} texts = {ts} />
            )
        }        
        
        return ( 
            <ul className="tabledisplay" style={{padding:"0"}} >
                {textDisplays}
            </ul>
         );
    }
}
 
export default TextDisplayTable;