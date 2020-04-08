import React from 'react';



const TextDisplay = (props) => {


    let {key, date, texts} = props; 

    date = new Date(date); 
    let year = date.getFullYear(); 
    let month = date.getMonth();
    let day=date.getDate(); 
    let hour=date.getHours();
    let minutes = date.getMinutes(); 
    let formatted=`${year}-${month}-${day}  ${hour}:${minutes}`

    let textRows=[];
    for(let t of texts){
        textRows.push(
            <p>{t}</p>
        )
    }

    return (
        <li key={key} className="box">
            <span className="box">{formatted}</span>
            {textRows}
        </li>
    )
}

export default TextDisplay;