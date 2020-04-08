import React, { Component} from 'react'
import { Link } from "react-router-dom";
import { Button, Row, Col } from 'react-bootstrap';

import LineGraphContainer from './LineGraphContainer'; 
import CalendarContainer from './CalendarContainer'; 
import TextContainer from './TextContainer'; 

class PresentationBase extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            currentTab: "lineGraph",
            currentComponent: <LineGraphContainer name={this.props.location.state.name} 
                            questions={this.props.location.state.questions} /> ,
         }
    }

    
    switchTab(tab){
        if(this.state.currentTab===tab){
            return;
        }
        switch(tab){
            case "lineGraph":
                this.setState( {currentTab: "lineGraph", currentComponent: <LineGraphContainer name={this.props.location.state.name} 
                                     questions={this.props.location.state.questions} /> } );
                break;
            case "calendar":
                this.setState( {currentTab: "calendar", currentComponent: <CalendarContainer name={this.props.location.state.name} 
                                        questions={this.props.location.state.questions} /> } );
                break;
            case "text":
                this.setState( {currentTab: "text", currentComponent: <TextContainer name={this.props.location.state.name} 
                                        questions={this.props.location.state.questions} /> } );
                break;
            default:
                this.setState( {currentTab: "lineGraph", currentComponent: <LineGraphContainer name={this.props.location.state.name} 
                                     questions={this.props.location.state.questions} /> } );
        }
    }




    render() { 
        return (
            <div>
                <h2>{this.props.location.state.name}</h2>
                
                <Row>
                    <Col><Button onClick={() => this.switchTab("lineGraph")}>Line graph</Button></Col>
                    <Col><Button onClick={() => this.switchTab("calendar")}>Calendar</Button></Col>
                    <Col><Button onClick={() => this.switchTab("text")}>Text entries</Button></Col>
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