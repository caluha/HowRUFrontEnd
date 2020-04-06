import React from "react";
// import { Line } from "react-chartjs-2";
// import { MDBContainer } from "mdbreact";
// import { Link } from "react-router-dom";
import './graph.css';

class GraphQuestionSelect extends React.Component {

  render() {
    return <React.Fragment>
                <div >
                    <input type="radio" id={this.props.questionId} name={'select'} 
                    onChangeCapture={this.props.selectQuestion}/>
                    {this.props.question}
                </div>                                
            </React.Fragment>;
  }
}

export default GraphQuestionSelect;