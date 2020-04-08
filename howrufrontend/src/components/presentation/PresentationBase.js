import React, { Component} from 'react'
import { Link } from "react-router-dom";
import { Button, Row, Col } from 'react-bootstrap';
import LineGraphContainer from './LineGraphContainer'; 
import CalendarContainer from './CalendarContainer'; 
import TextContainer from './TextContainer'; 
import './graph.css'

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
            //     break;
            // case "calendar":
            //     this.setState( {currentTab: "calendar", currentComponent: <CalendarContainer name={this.props.location.state.name} 
            //                             questions={this.props.location.state.questions} /> } );
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
                <h4 id="green_box" className="box">{this.props.location.state.name}</h4>
                <Row xs={4}>
                    <Col ><Button onClick={() => this.switchTab("lineGraph")} className="tab">Line graph</Button></Col>
                    {/* <Col><Button onClick={() => this.switchTab("calendar")} className="tab">Calendar</Button></Col> */}
                    <Col><Button onClick={() => this.switchTab("text")} className="tab">Text entries</Button></Col>
                    {/* <Col><Button className="tab">Charts</Button></Col> */}
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