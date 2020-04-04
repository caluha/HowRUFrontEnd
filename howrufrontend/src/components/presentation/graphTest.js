import React from "react";
import { Line } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import { Link } from "react-router-dom";
import './graph.css';
import GraphQuestionSelect from './GraphQuestionSelect';

class ChartsPage extends React.Component {

  constructor(props) {
    super(props);
    this.selectQuestion = this.selectQuestion.bind(this);
    this.state = {
      currentQuestion: -1,
      currentlyDisplayedData: this.getAllResponses(),
      dataLine: this.getAllResponses(),
    }
  }

  getAllResponses () {
    /*Use the this.props.location.state and loop through all the question Id's
    and make a fetch for each one of them, and store all those responses in the state.
    After that, make one dataset for each responseId, containing one response per day */

    let url = "http://localhost:8080/response/question/";

    let dataLine = {
      question: [],
      labels: [],
      datasets: []
    }

    let labelsSet = false;

    for (const e of this.props.location.state.questions) {
      dataLine.question.push(e.id);
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
              let label = new Date(result[i].responseTime);
              dataLine.labels.push(`${label.getDate()} ${this.returnMonth(label.getMonth())}`);
            }
          }
        })
      dataLine.datasets.push(dataSet);
    }
    return dataLine;
  }

  selectQuestion = (event) => {
    // this.setState({currentQuestion: event.target.id});

    let currentQuestion = event.target.id;
    console.log("Current question: " + currentQuestion)
    for (const index in this.state.dataLine.question) {
      console.log("DONKEY");
      if (this.state.dataLine.question[index] == currentQuestion){
        console.log("I REACHED THIS POINT");
        let label = this.state.dataLine.labels;
        let dataSet = this.state.dataLine.datasets[index];
        this.setState({currentlyDisplayedData: { label, dataSet }});
        console.log(this.state.currentlyDisplayedData);
      }
    }
  }

  renderQuestionSelect = () => {
    return this.props.location.state.questions.map((e) => <GraphQuestionSelect selectQuestion={this.selectQuestion} questionId={e.id} question={e.question}/>);
  }
   
  returnMonth(monthNumber) {
    switch (monthNumber) {
      case 0:
        return "Jan";
      case 1:
        return "Feb";
      case 2: 
        return "Mar";
      case 3:
        return "Apr";
      case 4:
        return "May";
      case 5:
        return "Jun";
      case 6:
        return "Jul";
      case 7:
        return "Aug";
      case 8:
        return "Sep";
      case 9:
        return "Oct";
      case 10:
        return "Nov";
      case 11:
        return "Dec";
    }
  }

  render() {
    return (
      <React.Fragment>
        <MDBContainer>
          <h3 className="mt-5">{this.props.location.state.name}</h3>
          <Line data={this.state.currentlyDisplayedData} options={{ responsive: true, maintainAspectRatio: true }} />
          <Link to="/" className="btn btn-new btn-block text-uppercase"> Back To You</Link>
        </MDBContainer>
        <React.Fragment>
          {this.renderQuestionSelect()}
        </React.Fragment>
      </React.Fragment>
    );
  }
}

export default ChartsPage;