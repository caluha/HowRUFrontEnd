import React from 'react'
import { Form, Row, Col } from "react-bootstrap";



class CreateRangeResponse extends React.Component {

    constructor(props) {
        super(props);
        this.handleFormChange = this.handleFormChange.bind(this);

        this.state = {
            response: this.props.response,
            errors: { min: "", max:""} 
        } 
    }

    validate(changed){
        let min = parseInt(this.state.response.min);
        let max = parseInt(this.state.response.max);
        let errors = this.state.errors;
        if(min< max){
            errors.min="";
            errors.max="";
        }
        else if(changed==="min" && min > max){
                errors.min="Min value must be smaller than the max value.";
        }
        if(changed==="max" && min > max){
                errors.max="Max value must be larger than the min value.";
        }
        this.setState({errors: errors}); 
    }

    handleFormChange(event) {
        let response = this.state.response;
        const target=event.target.id;
        response[target] = event.target.value;
        this.setState({ response: response }, 
            () =>{ this.validate(target);
                this.props.saveResponse([this.state.response], this.state.errors); 
            });

        event.preventDefault();
    }



    render() {
        return (
            <div>
                <Form.Group controlId="min">
                    <Row>
                        <Col>
                            <Form.Label>Min</Form.Label>
                        </Col>

                        <Col>
                        <Form.Control 
                            className="input-group"
                            type="number"
                            onChange={this.handleFormChange}
                            value={this.state.response.min}
                            isInvalid={!!this.state.errors.min}
                            />
                            <Form.Control.Feedback type="invalid">  
                                {this.state.errors.min}
                            </Form.Control.Feedback>
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group controlId="max">
                    <Row>
                        <Col>
                            <Form.Label>Max</Form.Label>
                        </Col>
                        <Col>
                        <Form.Control 
                                className="input-group"
                                type="number"
                                onChange={this.handleFormChange}
                                value={this.state.response.max}
                                isInvalid={!!this.state.errors.max}
                                />
                        <Form.Control.Feedback type="invalid">  
                            {this.state.errors.max}
                        </Form.Control.Feedback>
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group controlId="min_description">
                    <Row>
                        <Col>
                            <Form.Label>Min description</Form.Label>
                        </Col>
                        <Col>
                            <Form.Control 
                                    className="input-group"
                                    type="text"
                                    onChange={this.handleFormChange}
                                    value={this.state.response.min_description}
                                    // isInvalid={!!errors.min}
                                    />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group controlId="max_description">
                    <Row>
                        <Col>
                            <Form.Label>Max description</Form.Label>
                        </Col>
                        <Col>
                            <Form.Control 
                                    className="input-group"
                                    type="text"
                                    onChange={this.handleFormChange}
                                    value={this.state.response.max_description}
                                    // isInvalid={!!errors.min}
                                    />
                        </Col>
                    </Row>
                </Form.Group>
            </div>
        )
    }
}

export default CreateRangeResponse; 