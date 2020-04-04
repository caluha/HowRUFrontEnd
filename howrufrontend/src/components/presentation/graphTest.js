import React from "react";
import { Line } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import { Link } from "react-router-dom";
import './graph.css';
import GraphQuestionSelect from './GraphQuestionSelect';

class ChartsPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentlyDisplayedData: {},
      dataLine: this.getAllResponses(),
    }
  }

  getAllResponses () {
    /*Use the this.props.location.state and loop through all the question Id's
    and make a fetch for each one of them, and store all those responses in the state.
    After that, make one dataset for each responseId, containing one response per day */

    let url = "http://localhost:8080/response/question/";

    let dataLine = {
      labels: [],
      datasets: []
    }

    let labelsSet = false;

    for (const e of this.props.location.state.questions) {
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
          for (const i in result) {
            switch(result[i].type) {
              case "TEXT":
                dataSet.data.push(result[i].text)
                break;
              default:
                dataSet.data.push(result[i].value)
                break;
            } 
          }

          for (const i in result) {
            if (dataLine.labels.length < result.length) {
              dataLine.labels.push(result[i].responseTime);
            }
          }
        })
      dataLine.datasets.push(dataSet);
    }
    return dataLine;
  }

  renderQuestionSelect = () => {
    return this.props.location.state.questions.map((e) => <GraphQuestionSelect />);
  }

  render() {
    return (
      <MDBContainer>
        <h3 className="mt-5">{this.props.location.state.name}</h3>
        <Line data={this.state.dataLine} options={{ responsive: true, maintainAspectRatio: true }} />
        <Link to="/" className="btn btn-new btn-block text-uppercase"> Back To You</Link>
      </MDBContainer>
    );
  }
}

export default ChartsPage;