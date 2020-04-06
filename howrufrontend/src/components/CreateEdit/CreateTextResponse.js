import React from 'react'
import { Form, Row, Col } from "react-bootstrap";

class CreateTextResponse extends React.Component {

    constructor(props){
        super(props);
        this.handleFormChange=this.handleFormChange.bind(this);
        this.state = this.props.response;
    }

    handleFormChange(event){
        this.setState({[event.target.id] : event.target.value },  () => this.props.saveResponse([this.state]));
        event.preventDefault(); 
    }



    render(){
        return (
            <div>
                <Form.Group controlId="text">
                    <Row>
                        <Col>
                            <Form.Label>Default text</Form.Label>
                        </Col>
                        <Col>
                            <Form.Control  type="text" name="text" value={this.state.text} onChange={this.handleFormChange} noValidate />
                        </Col>
                    </Row>
                </Form.Group>
            </div>
        )
    }
}

export default CreateTextResponse; 