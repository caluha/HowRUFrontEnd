import React from 'react';
import { Button } from 'react-bootstrap';

class APIConnection extends React.Component {

    getAllQuestionSets(page) {
        const url = "http://localhost:8080/questionset";
        return fetch(url)
            .then(result => {return result.json() })
        
    }

    iAmConfusion = () => {
        this.getAllQuestionSets().then(result => console.log(result));
    }

    render() {
        return (<React.Fragment><Button onClick={this.iAmConfusion}>Kansas</Button></React.Fragment>);
    }
}

export default APIConnection