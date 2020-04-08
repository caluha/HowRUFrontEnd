import React from 'react';
import './graph.css'



const TextDisplay = (props) => {


    let { key, date, texts } = props;

    date = new Date(date);
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let formatted = `${year}-${month}-${day}  ${hour}:${minutes}`

    let textRows = [];
    for (let t of texts) {
        textRows.push(
            <div style={{marginBottom: "5px",  marginTop: "5px"}}>{t}</div>
        )
    }

    return (
        <div className="box_small" id="green_box" >
            <li key={key} style={{ listStyleType: "none" }}>
                <div className="date_graph">
                    <div>{formatted}</div>
                </div>
                    <div className="text_graph">{textRows}</div>
            </li>
        </div>

    )
}

export default TextDisplay;