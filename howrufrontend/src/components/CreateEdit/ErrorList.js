import React from 'react';
import './errorList.css';

function ErrorList(props) {

    let { errors } = props;

    let errorListItems = [];
    for (const error of errors) {
        errorListItems.push(
            <li key={error.message} className="errorListItem">
                {error.message}
            </li>
        )
    }

    return (
        <div className="errorArea">
            <ul className="errorList">
                {errorListItems}
            </ul>
        </div>);
}

export default ErrorList; 