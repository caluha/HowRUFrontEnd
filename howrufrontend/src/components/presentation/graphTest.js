import React from "react";
import { Line } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import { Router, Switch, Route, Link } from "react-router-dom";
import './graph.css';

class ChartsPage extends React.Component {
  state = {
    dataLine: {
      labels: ["1", "2", "3", "4", "5", "6", "7","8","9","10","11","12","13","14","15"],
      datasets: [
        {
          label: "My First dataset",
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
          data: [65, 59, 80, 81, 56, 55, 40, 85, 40, 80, 40, 80]
        },
        {
          label: "My Second dataset",
          fill: true,
          lineTension: 0.5,
          backgroundColor: "rgba(184, 185, 210, .3)",
          borderColor: "rgb(35, 26, 136)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgb(35, 26, 136)",
          pointBackgroundColor: "rgb(255, 255, 255)",
          pointBorderWidth: 3,
          pointHoverRadius: 2,
          pointHoverBackgroundColor: "rgb(0, 0, 0)",
          pointHoverBorderColor: "rgba(220, 220, 220, 1)",
          pointHoverBorderWidth: 1,
          pointRadius: 1,
          pointHitRadius: 1,
          data: [28, 48, 40, 19, 86, 27, 90,47,58,43,25,85]
        }
      ]
    }
  };

  render() {
    return (

        <MDBContainer>
            <h3 className="mt-5">Line chart</h3>
            <Line data={this.state.dataLine} options={{ responsive: true}, { maintainAspectRatio: false}}  />
            
            <Link to="/base" class="btn btn-new btn-block text-uppercase"> Back To You</Link>
        </MDBContainer>
    );
  }
}

export default ChartsPage;