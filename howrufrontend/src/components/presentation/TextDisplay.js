import React from 'react';



const TextDisplay = (props) => {


    let {key, date, texts} = props; 

    let textRows=[];
    for(let t of texts){
        textRows.push(
            <p>{t}</p>
        )
    }

    return (
        <li key={key}>
            <span>{date}</span>
            {textRows}
        </li>
    )
}

export default TextDisplay;