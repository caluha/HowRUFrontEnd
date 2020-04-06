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
      allResponses: {},
      dataLine: {
        labels: [],
        datasets: []
      },
      showAllResponses:true,
      isFetching: true,
      questionType: "",
      tableData: []
    }
  }

  componentDidMount() {
    this.getAllResponses();
  }

  getAllResponses() {
    /*Use the this.props.location.state and loop through all the question Id's
    and make a fetch for each one of them, and store all those responses in the state.
    After that, make one dataset for each responseId, containing one response per day */

    // let url = "http://localhost:8080/response/question/";
    let url = "http://ec2-13-53-42-207.eu-north-1.compute.amazonaws.com:8080/response/question"
    let newTextData = [];

    let newDataLine = {
      question: [],
      labels: [],
      datasets: []
    }

    for (const e of this.props.location.state.questions) {
      newDataLine.question.push(e.id);
      let dataSet = {
        label: e.question,
        fill: true,
        lineTension: 0.5,
        backgroundColor: "rgba(225, 204,230, .3)",
        borderColor: "rgb(205, 130, 158)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgb(205, 130,1 58)",
        pointBackgroundColor: "rgb(255, 255, 255)",
        pointBorderWidth: 2,
        pointHoverRadius: 3,
        pointHoverBackgroundColor: "rgb(0, 0, 0)",
        pointHoverBorderColor: "rgba(220, 220, 220,1)",
        pointHoverBorderWidth: 1,
        pointRadius: 1,
        pointHitRadius: 1,
        data: []
      }
      fetch(url + e.id)
        .then(result => result.json())
        .then(result => {
          console.log(result);

          let responseTime = "";
          let value = 0;

          for (const i in result) {

            addLabel(result[i].responseTime);
            
            switch (result[i].type) {
              case "TEXT":
                newTextData.push({date: parseDate([result[i].responseTime]), text: [result[i].text] })
                break;
              case "CHECKBOX":
                if (i == result.length-1) {
                  console.log("Last element");
                  if (responseTime === result[i].responseTime) {
                    console.log("Super if-satsen");
                    value += result[i].value;
                  } else {
                    value = result[i].value;
                  }
                  dataSet.data.push(value);
                } else if (responseTime === "") {
                  responseTime = result[i].responseTime;
                  value = result[i].value;
                } else if (responseTime === result[i].responseTime) {
                  value += result[i].value;
                } else {
                  responseTime = result[i].responseTime;
                  dataSet.data.push(value);
                  value = result[i].value;
                }
                break;
              default:
                dataSet.data.push(result[i].value)
                break;
            }
          }
        })
      newDataLine.datasets.push(dataSet);
    }
    // console.log(newDataLine);
    this.setState({ allResponses: newDataLine, isFetching: false, tableData: newTextData });

    let usedLabels = [];

    function parseDate(responseTime) {
        let monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        let label = new Date(responseTime);
        return `${label.getDate()} ${monthArray[label.getMonth()]}`;
    }

    function addLabel(responseTime) {
      if (!usedLabels.includes(responseTime)) {
        usedLabels.push(responseTime);
        let monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        let label = new Date(responseTime);
        newDataLine.labels.push(`${label.getDate()} ${monthArray[label.getMonth()]}`);  
      }
    }
  }

  selectQuestion = (event) => {
    let curQuestion = event.target.id;
    this.setState({ currentQuestion: event.target.id });
    console.log("Current question: " + curQuestion)
    for (const index in this.state.allResponses.question) {
      if (this.state.allResponses.question[index] == curQuestion) {
        let label = this.state.allResponses.labels;
        let newData = this.state.allResponses.datasets[index].data;
        let newDataLine = {
          labels: label,
          datasets: [
            {
              label: this.state.allResponses.datasets[index].label,
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
              data: newData
            },

          ]
        }


        this.setState({ dataLine: newDataLine, showAllResponses:false, questionType: this.props.location.state.questions[index].type},
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
        console.log(this.state.tableData);
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
                {renderTextTable(this.state.tableData)}
              </tbody>
            </table>
          </React.Fragment>
        )
      default:
        return <Line data={this.state.showAllResponses ? this.state.allResponses : this.state.dataLine} options={{ responsive: true, maintainAspectRatio: true }} />

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