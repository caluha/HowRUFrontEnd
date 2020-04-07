import React, { Component} from 'react'
import { Link } from "react-router-dom";
import { Button, Row, Col } from 'react-bootstrap';

import LineGraphContainer from './LineGraphContainer'; 

class PresentationBase extends Component {
    constructor(props) {
        super(props);
        this.state = { 

            currentTab: "lineGraph",
            currentComponent: <LineGraphContainer name={this.props.location.state.name} questions={this.props.location.state.questions} /> ,
         }
    }




    render() { 
        return (
            <div>
                <h2>{this.props.location.state.name}</h2>
                
                <Row>
                    <Col><Button>Line graph</Button></Col>
                    <Col><Button>Calendar</Button></Col>
                    <Col><Button>Text entries</Button></Col>
                    <Col><Button>Charts</Button></Col>
                </Row>

                <div>
                    {this.state.currentComponent}

                </div>


                <div className="bottom-bar">
                    <Link to="/" className="backButton" type="button">Back</Link>
                </div>
            </div>



         );
    }
}
 
export default PresentationBase;