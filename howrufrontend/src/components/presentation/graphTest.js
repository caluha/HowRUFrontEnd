import React from "react";
import { Line } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import { Link } from "react-router-dom";
import './graph.css';
import GraphQuestionSelect from './GraphQuestionSelect';

class ChartsPage extends React.Component {
  // intervalID = 10;

  constructor(props) {
    super(props);
    this.selectQuestion = this.selectQuestion.bind(this);
    this.state = {
      currentQuestion: -1,
      allResponses: {},
      dataLine: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: "My First dataset",
            fill: true,
            lineTension: 0.3,
            backgroundColor: "rgba(225, 204,230, .3)",
            borderColor: "rgb(205, 130, 158)",
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
            data: [65, 59, 80, 81, 56, 55, 40]
          },
          {
            label: "My Second dataset",
            fill: true,
            lineTension: 0.3,
            backgroundColor: "rgba(184, 185, 210, .3)",
            borderColor: "rgb(35, 26, 136)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgb(35, 26, 136)",
            pointBackgroundColor: "rgb(255, 255, 255)",
            pointBorderWidth: 10,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgb(0, 0, 0)",
            pointHoverBorderColor: "rgba(220, 220, 220, 1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [28, 48, 40, 19, 86, 27, 90]
          }
        ]
      },
      showAllResponses:true,
      isFetching: true
    }
  }

  componentDidMount() {
    this.getAllResponses();
  }

  getAllResponses() {
    /*Use the this.props.location.state and loop through all the question Id's
    and make a fetch for each one of them, and store all those responses in the state.
    After that, make one dataset for each responseId, containing one response per day */

    let url = "http://localhost:8080/response/question/";

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
            switch (result[i].type) {
              case "TEXT":
                dataSet.data.push(result[i].text)
                break;
              case "CHECKBOX":
                if (responseTime === "") {
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
          
          let usedResponsetimes = [];

          for (const i in result) {
            if (!usedResponsetimes.includes(result[i].responseTime)) {
              usedResponsetimes.push(result[i].responseTime);
              let label = new Date(result[i].responseTime);
              newDataLine.labels.push(`${label.getDate()} ${this.returnMonth(label.getMonth())}`);
            }
          }
        })
      newDataLine.datasets.push(dataSet);
    }
    // console.log(newDataLine);
    this.setState({ allResponses: newDataLine, isFetching: false });
  }

  selectQuestion = (event) => {
    let curQuestion = event.target.id; 
    this.setState({ currentQuestion: event.target.id });
    console.log("Current question: " + curQuestion)
    for (const index in this.state.allResponses.question) {
      // console.log("DONKEY");
      if (this.state.allResponses.question[index] == curQuestion) {
        // console.log("I REACHED THIS POINT");
        
        let label = this.state.allResponses.labels;
        let newData = this.state.allResponses.datasets[index].data;
        let newDataLine = {
          labels: label,
          datasets: [
            {
              label: "fwefwef",
              fill: true,
              lineTension: 0.3,
              backgroundColor: "rgba(225, 204,230, .3)",
              borderColor: "rgb(205, 130, 158)",
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
            
          ] }


        this.setState({ dataLine: newDataLine, showAllResponses:false },
          () => { console.log(this.state.dataLine) }
        );
      }
    }
  }



  renderQuestionSelect = () => {
    return this.props.location.state.questions.map((e) => 
    <GraphQuestionSelect selectQuestion={this.selectQuestion} 
      key={e.id} questionId={e.id} 
      question={e.question} />);
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
        <h3 className="mt-5">{this.props.location.state.name}</h3>
        <MDBContainer>
          <Line data={this.state.showAllResponses ? this.state.allResponses : this.state.dataLine} options={{ responsive: true, maintainAspectRatio: true }} />
        </MDBContainer>
        <React.Fragment>
          {this.renderQuestionSelect()}
        </React.Fragment>
        <div className="bottom-bar">
          <Link to="/" className="backButton" type="button">Back To You</Link>
        </div>
      </React.Fragment>
    );
  }
}

export default ChartsPage;