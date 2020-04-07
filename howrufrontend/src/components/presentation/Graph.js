import React from "react";
import { Line, Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import { Link } from "react-router-dom";
import './graph.css';
import GraphQuestionSelect from './GraphQuestionSelect';
import GraphComponent from './GraphComponent';

class Graph extends React.Component {
  // intervalID = 10;

  constructor(props) {
    super(props);
    this.selectQuestion = this.selectQuestion.bind(this);
    this.state = {
      currentQuestion: -1,
      responseData: {},
      dataLine: {date: 1, value: 2},
      showAllResponses: true,
      questionType: "",
      dataLoaded: false,
    }
  }

  componentDidMount() {
    this.getAllResponses();
  }

  getAllResponses() {
    // let url = "http://localhost:8080/response/question/";
    let url = "http://ec2-13-53-42-207.eu-north-1.compute.amazonaws.com:8080/response/question/";

    let newResponseData = {
      questionId: [],
      question: [],
      dateLabel: [],
      data: [],
      type: [],
    }

    let labelsSet = false;

    for (const e of this.props.location.state.questions) {
      newResponseData.questionId.push(e.id);
      newResponseData.question.push(e.question);
      newResponseData.type.push(e.type);

      let dataArray = [];

      fetch(url + e.id)
        .then(result => result.json())
        .then(result => {
          let responseTime = "";
          let value = 0;

          for (const i in result) {

            if (!labelsSet) {
              newResponseData.dateLabel.push(result[i].responseTime);
            }

            switch (result[i].type) {

              case "TEXT":
                dataArray.push(result[i].text);
                break;

              case "CHECKBOX":
                if (i == result.length-1) {
                  if (responseTime === result[i].responseTime) {
                    value += result[i].value;
                  } else {
                    value = result[i].value;
                  }
                  dataArray.push(value);

                } else if (responseTime === "") {
                  responseTime = result[i].responseTime;
                  value = result[i].value;

                } else if (responseTime === result[i].responseTime) {
                  value += result[i].value;

                } else {
                  responseTime = result[i].responseTime;
                  dataArray.push(value);
                  value = result[i].value;
                }
                break;
              default:
                dataArray.push(result[i].value);

            }
          }
          labelsSet = true;
        })

      // function addLabel(responseTime) {
      //   let monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      //   let rawlabel = new Date(responseTime);
      //   newResponseData.dateLabel.push(`${rawlabel.getDate()} ${monthArray[rawlabel.getMonth()]}`)
      // }

      newResponseData.data.push(dataArray);
      console.log(newResponseData);
      
    }

    this.setState({responseData: newResponseData, dataLoaded: true}, console.log(this.state.responseData));
  }

  selectQuestion = (event) => {
    let curQuestion = event.target.id;
    let currentResponseData = this.state.responseData;

    for (const i in currentResponseData.questionId) {
      if (currentResponseData.questionId[i] == curQuestion) {
        let newDataLine = {};
        let type = currentResponseData.type[i];
        switch (currentResponseData.type[i]) {
          case "TEXT":
            //Skapa datan som behövs för att visa ett table.
            newDataLine = [];
            for (const j in currentResponseData.dateLabel) {
              newDataLine.push({date: currentResponseData.dateLabel[j], text: currentResponseData.data[i][j]});
            };
            break;
          default:
            //Skapa datan som behövs för att visa en graf.
            newDataLine = {
              labels: currentResponseData.dateLabel,
              datasets: [
                {
                  date: currentResponseData.question[i],
                  value: currentResponseData.data[i]
                },
    
              ]
            }
        }
        this.setState({ dataLine: newDataLine, showAllResponses: false, questionType: type },
          () => { console.log(this.state.dataLine) }
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
        {this.state.dataLoaded ? <GraphComponent dates={this.state.responseData.dateLabel} values={this.state.responseData.data} /> : "Loading..."}
        {/* <MDBContainer>
          {this.renderGraphComponent()}
        </MDBContainer> */}
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