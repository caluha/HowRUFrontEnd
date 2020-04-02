// import React from 'react';
// import { Button } from 'react-bootstrap';

// class APIConnection extends React.Component {

//     static getAllQuestionSets = () => {
//         url = "http://localhost:8080/questionset";
//         fetch(url)
//             .then(result => result.json())
//             .then(result => {return result})
//     }

//     static iAmConfusion = () => {
//         APIConnection.getAllQuestionSets().then(result => {var foo = result});
//         console.log();
//     }

//     render() {
//         return (<React.Fragment><Button onClick={APIConnection.iAmConfusion}>Kansas</Button></React.Fragment>);
//     }
// }

// export default APIConnection