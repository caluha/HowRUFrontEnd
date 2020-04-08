import React from 'react';
import { Form, Row, Col, Button } from "react-bootstrap";

import remove_01 from "../../images/remove_01.png";


class CreateRadioCheckboxResponses extends React.Component {

    constructor(props){
        super(props);
       
        let errors = [];
        for(let i in this.props.responses){
            errors[i]={"option": ""};
        }

        this.state = {
            responses : this.props.responses,
            errors: errors,
        } ; 

        this.removeElement=this.removeElement.bind(this);
        this.addElement=this.addElement.bind(this); 
    }

    validate(el, type, i){
        let errors = this.state.errors;
        if(type==="option"){
            if(el.option ===""){

                errors[i].option = "Option text is required.";
            } else {
                errors[i].option = "";
            }

            this.setState({errors:errors});
        }

    }

    addElement(){
        let newResp = {
                "type": "RADIO",
                "value": "50",
                "option": "",
                "text": "null",
                "min": "null",
                "max": "null",
                "min_description": "null",
                "max_description": "null"
            };
        let newErrors = this.state.errors;
        newErrors[this.state.responses.length]={option:""};
        this.setState({responses: [...this.state.responses,newResp ], 
                        errors: newErrors});
    }

    removeElement(i){
        let newResp = this.state.responses;
        newResp.splice(i,1);
        let newErrors = this.state.errors;
        newErrors.splice(i,1);
        this.setState({responses:newResp, errors:newErrors});
        
    }

    responseChanger = (el, type,i) => {
        return ( event ) => {
            if(type==="option"){
                el.option=event.target.value;
             } else {
                 el.value=event.target.value;
             }

             this.setState( {responses : this.state.responses},
                 () => { this.validate(el,type,i);
                         this.props.saveResponse(this.state.responses, this.state.errors); }
                         );
        }
    }

    makeResponseElements = () => {
        let responseListElements = [];

        for(const i in this.state.responses){
            let el = this.state.responses[i];
            responseListElements.push(

               
                    <Row className="optionRow" key={"response"+i}>
                        <Col  xs={6}> 
                            <Form.Group controlId={"option"+i}>
                                <Form.Control 
                                className="input-group"
                                type="text"
                                placeholder="Option"
                                onChange={this.responseChanger(el,"option",i) }
                                value={el.option}
                                isInvalid={!! (this.state.errors[i] ? this.state.errors[i].option : "") }
                                />
                                <Form.Control.Feedback type="invalid">  
                                    { (this.state.errors[i] ? this.state.errors[i].option : "")  }
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col >
                            <Form.Group controlId={"value"+i}>
                                <Form.Control 
                                className="input-group"
                                type="number"
                                onChange={this.responseChanger(el,"value",i) }
                                value={el.value}
                                // isInvalid={!!this.state.errors.min}
                                />
                                <Form.Control.Feedback type="invalid">  
                                    {/* {this.state.errors.min} */}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col className="removeButtonCol">
                        <button
                            // style={{ float: "right" }}
                            type="button"
                            className="removeOptionButton"
                            >
                            <img
                                alt="Close"
                                className={"buttonImage"}
                                onClick={(event) => { this.removeElement(i) }}
                                src={remove_01}
                            />
                        </button>
                            {/* <Button type="button" onClick={(event) => { this.removeElement(i) }} className="btn btn-danger">X</Button> */}
                        </Col>
                    </Row>

            );
        }
        return responseListElements;
    }

    render(){

        let responseElements = this.makeResponseElements(); 
        
        return (
            <div>
                {responseElements}

                <button type="button" onClick={this.addElement}
                 className="btn btn-primary m-3">Add new option</button>
            </div>
        )
    }
}

export default CreateRadioCheckboxResponses; 