import React from "react";
import Response from "./Response";
import "./QuestionSet.css";

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.updateAnswer = this.updateAnswer.bind(this);

    if (props.initialState) {
      this.state = props.initialState;

    } else {
        
      switch (this.props.type) {
        case "TEXT":
          this.state = {
            responses: [
              {
                optionId: this.props.responses[0].id,
                username: "Adam",
                text: "",
                value: null
              }
            ]
          };
          break;
        case "RANGE":
          this.state = {
            responses: [
              {
                optionId: this.props.responses[0].id,
                username: "Adam",
                text: null,
                value:
                  (this.props.responses[0].min + this.props.responses[0].max) /
                  2
              }
            ]
          };
          break;
        case "RADIO":
          this.state = {
            responses: []
          };
          break;
        case "CHECKBOX":
          this.state = {
            responses: []
          };
          break;
        default:
          break;
      }
    }
  }

  addResponses() {

    return this.props.responses.map(e => (
      <Response
        key={e.id}
        type={this.props.type}
        responseData={e}
        defaultValue={this.state.responses}
        updateAnswer={this.updateAnswer}
      />
    ));
  }

  updateAnswer(event) {
    const targetId = event.target.id;
    const targetValue = event.target.value;
    switch (this.props.type) {
      case "TEXT":
        this.setState({
          responses: [
            {
              optionId: targetId,
              username: "Adam",
              text: targetValue,
              value: null
            }
          ]
        });
        break;
      case "RANGE":
        this.setState({
          responses: [
            {
              optionId: targetId,
              username: "Adam",
              text: null,
              value:targetValue
            }
          ]
        });
        break;
      case "RADIO":
        this.setState({
          responses: [
            {
              optionId:targetId,
              username: "Adam",
              text: null,
              value: null
            }
          ]
        });
        break;
      case "CHECKBOX":
        let i = this.state.responses.findIndex( t => t.optionId == targetId);
        if(i===-1){//if the response is not already in the list, i.e. not selected, then add it
            let newResp =
                [...this.state.responses, {
                    optionId: targetId,
                    username: "Adam",
                    text: null,
                    value: null }] 
            this.setState({responses:newResp});
        } else { //else, if it is there, then remove it from the list, de-selecting it. 
            let newResp = this.state.responses;
            newResp.splice(i,1);
            this.setState({responses:newResp});

        }
        
        break;
      default:
        break;
    }
  }

  checkResponseArray(responseId) {
    let counter = 0;
    for (const response of this.state.responses) {
      if (response.responseId === responseId) {
        counter++;
      }
    }
    return counter > 0 ? true : false;
  }

  previous = () => {
    this.props.previous();
    this.props.storeState(this.props.id, this.state);
  };

  next = () => {
    this.props.handleAnswer(this.props.id, this.state.responses);
    this.props.next();

    this.props.storeState(this.props.id, this.state);

  };

  render() {

    if (this.props.lastQuestion) {
      return (
        <div>
           <form > 
            <div className="question">{this.props.question}</div>
            <div id="responsecontainer" className="response">
              {this.addResponses()}
            </div>
          </form>
          <div className="prev-next_button">
            <button onClick={this.previous}>Previous</button>
            <button onClick={this.next}>Submit</button>
          </div>
        </div>
      );
    } else {
      return (
        <div>
           <form > 
            <div className="question">{this.props.question}</div>
            <div id="responsecontainer" className="response">
              {this.addResponses()}
            </div>
          </form>
          <div className="prev-next_button">
            <button onClick={this.previous}>Previous</button>
            <button onClick={this.next}>Next</button>
          </div>
        </div>
      );
    }
  }
}

export default Question;
