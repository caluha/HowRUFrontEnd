import React from "react";
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