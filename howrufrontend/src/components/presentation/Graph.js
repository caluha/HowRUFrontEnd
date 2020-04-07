import React from "react";
import { Line, Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import { Link } from "react-router-dom";
import './graph.css';
import GraphQuestionSelect from './GraphQuestionSelect';

class Graph extends React.Component {
  // intervalID = 10;

  constructor(props) {
    super(props);
    this.selectQuestion = this.selectQuestion.bind(this);
    this.state = {
      currentQuestion: -1,
      responseData: {},
      dataLine: {},
      showAllResponses: true,
      questionType: "",
    }
  }

  componentDidMount() {
    this.getAllResponses();
  }

  getAllResponses() {

    let url = "http://ec2-13-53-42-207.eu-north-1.compute.amazonaws.com:8080/response/question/"

    let newResponseData = {
      questionId: [],
      question: [],
      dateLabel: [],
      data: [],
      type: [],
    }

    for (const e of this.props.location.state.questions) {
      newResponseData.questionId.push(e.id);
      newResponseData.question.push(e.question);
      newResponseData.type.push(e.type);

      fetch(url + e.id)
        .then(result => result.json())
        .then(result => {
          for (const i in result) {

            addLabel(result[i].responseTime);

            let responseTime = "";
            let value = 0;

            switch (result[i].type) {

              case "TEXT":
                newResponseData.data.push(result[i].text);
                break;
              case "CHECKBOX":
                if (i == result.length - 1) {

                  if (responseTime === result[i].responseTime) {
                    value += result[i].value;
                  } else {
                    value = result[i].value;
                  }
                  newResponseData.data.push(value);

                } else if (responseTime === "") {
                  responseTime = result[i].responseTime;
                  value = result[i].value;

                } else if (responseTime === result[i].responseTime) {
                  value += result[i].value;

                } else {
                  responseTime = result[i].responseTime;
                  newResponseData.data.push(value);
                  value = result[i].value;
                }
                break;

              default:
                newResponseData.data.push(result[i].value);

            }
          }
        })

      function addLabel(responseTime) {
        let monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        let rawlabel = new Date(responseTime);
        let label = `${rawlabel.getDate()} ${monthArray[rawlabel.getMonth()]}`
        if (!newResponseData.dateLabel.includes(label)) {
          newResponseData.dateLabel.push(label)
        }
      }
    }

    this.setState({responseData: newResponseData})
  }

  selectQuestion = (event) => {
    let curQuestion = event.target.id;

    for (const i in this.state.responseData.questionId) {
      if (this.state.responseData.questionId[i] == curQuestion) {
        let newDataLine = {};
        let type = this.state.responseData.type[i];
        switch (this.state.responseData.type[i]) {
          case "TEXT":
            //Skapa datan som behövs för att visa ett table.
            newDataLine = {
              date: this.state.responseData.dateLabel,
              text: this.state.responseData.data[i]
            }
          default:
            //Skapa datan som behövs för att visa en graf.
            newDataLine = {
              labels: this.state.responseData.dateLabel,
              datasets: [
                {
                  label: this.state.responseData.question[i],
                  fill: true,
                  lineTension: 0.3,
                  backgroundColor: "rgba(225, 204,230, .3)",
                  borderColor: "rgb(66, 179, 255)",
                  borderCapStyle: "butt",
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: "miter",
                  pointBorderColor: "rgb(205, 130,1 58)",
                  pointBackgroundColor: "rgb(255, 255, 255)",
                  pointBorderWidth: 10,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgb(0, 0, 0)",
                  pointHoverBorderColor: "rgba(220, 220, 220,1)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: this.state.responseData.data[i]
                },
    
              ]
            }
        }
        this.setState({ dataLine: newDataLine, showAllResponses: false, questionType: type },
          () => { console.log(this.state.questionType) }
        );
      }
    }
  }

  renderGraphComponent() {

    function renderTextTable(input) {
      return input.map((e) =>
        <React.Fragment>
          <tr>
            <td>{e.date}</td>
            <td>{e.text}</td>
          </tr>
        </React.Fragment>
      );
    }

    switch (this.state.questionType) {
      case "TEXT":
        console.log(this.state.dataLine);
        return (
          <React.Fragment>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Response</th>
                </tr>
              </thead>
              <tbody>
                {renderTextTable(this.state.dataLine)}
              </tbody>
            </table>
          </React.Fragment>
        )
      default:
        return <Line data={this.state.dataLine} options={{ responsive: true, maintainAspectRatio: true }} />

    }
  }

  renderQuestionSelect = () => {
    return this.props.location.state.questions.map((e) =>
      <GraphQuestionSelect selectQuestion={this.selectQuestion}
        key={e.id} questionId={e.id}
        question={e.question} />);
  }

  render() {
    return (
      <React.Fragment>
        <h3 className="mt-5">{this.props.location.state.name}</h3>
        <MDBContainer>
          {this.renderGraphComponent()}
        </MDBContainer>
        <React.Fragment>
          {this.renderQuestionSelect()}
        </React.Fragment>
        <div className="bottom-bar">
          <Link to="/" className="backButton" type="button">Back</Link>
        </div>
      </React.Fragment>
    );
  }
}

export default Graph;