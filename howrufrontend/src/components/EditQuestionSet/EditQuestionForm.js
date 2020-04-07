import React from "react";
import Button from "react-bootstrap/Button";
import { Form, Row, Col } from "react-bootstrap";
import {Formik} from "formik";
import * as yup from "yup";

import defaultResponses from "./defaultResponses";
import CreateRangeResponse from "./CreateRangeResponse";
import CreateTextResponse from "./CreateTextResponse";
import CreateRadioCheckboxResponses from "./CreateRadioCheckboxResponses";
import remove_01 from "../../images/remove_01.png";

class EditQuestionForm extends React.Component {
  constructor(props) {
    super(props);

    this.saveResponse = this.saveResponse.bind(this);

    let question={
      id: this.props.questionId,
      question: "",
      type: "RANGE",
      responses: [JSON.parse(JSON.stringify(defaultResponses.RangeResponse))],
    };
    if(props.question){
      question = props.question; 
    } 
    this.state = {
      question: question,
      errors: {
        question: "",
        response: []
      }
    };
  }

  schema = yup.object({
    question: yup
      .string()
      .required()
      .max(50)
  });



  saveResponse(responses, responseErrors) {
    let errors = this.state.errors;
    errors.response = responseErrors; 
    let newQuestion = this.state.question;
    newQuestion.responses = responses;
    this.setState({ question: newQuestion, errors:errors });
  }
  

  updateQuestionText = event => {
    let newQuestion = this.state.question;
    newQuestion.question = event.target.value;
    this.setState({ question: newQuestion });

    event.preventDefault();
  };

  handleSubmit = () => {
    if(this.state.question.type==="RADIO" || this.state.question.type==="CHECKBOX"){

      for(let e of this.state.errors.response){
        if(e.option!==""){
          return;
        }
      }
    } else if(this.state.question.type==="RANGE"){
      
      if(this.state.errors.response.length===0){

      } else if( this.state.errors.response.min!=="" || 
          this.state.errors.response.max!==""){
          return;
      }
    }
    
    this.props.saveQuestion(this.state.question);
    
  };

  render() {
    let rangeResp = (
      <CreateRangeResponse
        response={this.state.question.responses[0]}
        saveResponse={this.saveResponse}
      />
    );
    let textResp = (
      <CreateTextResponse
        response={this.state.question.responses[0]}
        saveResponse={this.saveResponse}
      />
    );
    let radioCheckboxResp = (
      <CreateRadioCheckboxResponses
        responses={this.state.question.responses}
        saveResponse={this.saveResponse}
      />
    );

    return (
      <div className="questionFormModalBackground">
        <div className="questionFormModal">
          <div className="questionFormTopArea">
            <button
              style={{ float: "right" }}
              type="button"
              className="editButton"
            >
              <img
                alt="Close"
                className={"buttonImage"}
                onClick={this.props.closeForm}
                src={remove_01}
              />
            </button>
          </div>

          <h4 className="questionFormHeadline">New Question</h4>

          <Formik
            validateOnChange={true}
            validationSchema={this.schema}
            onSubmit= {(values) => {
                let q = this.state.question;
                q.question=values.question;
                q.type=values.type;
               this.setState({question: q}, this.handleSubmit)
            }} //{this.handleSubmit}
            initialValues={{ question: this.state.question.question,
                            type: this.state.question.type }}
          >
            {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                touched,
                isValid,
                errors,
            }) => (
            <Form noValidate onSubmit={handleSubmit} >
              <Form.Group controlId="formType">
                <Form.Control as="textarea"
                  className="input-group questionArea"
                  type="text"
                  name="question"
                  onChange={handleChange}
                  rows="3"
                  value={values.question}
                  placeholder="Question"
                  isInvalid={!!errors.question}
                />
                <Form.Control.Feedback type="invalid">  
                    {errors.question}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formType">
                <Row>
                  <Col>
                    <Form.Label>Type</Form.Label>
                  </Col>

                  <Col>
                    <Form.Control
                      as="select"
                      name="type"
                      className="input-group"
                      value={values.type}
                      onChange={(event) => { handleChange(event); this.updateType(event); }}
                    >
                      <option value="RANGE">Slider</option>
                      <option value="TEXT">Text</option>
                      <option value="RADIO">Radio buttons</option>
                      <option value="CHECKBOX">Checkboxes</option>
                    </Form.Control>
                  </Col>
                </Row>
              </Form.Group>

              {this.state.question.type === "RANGE" ? (
                rangeResp
              ) : this.state.question.type === "TEXT" ? (
                textResp
              ) : this.state.question.type === "RADIO" ||
                this.state.question.type === "CHECKBOX" ? (
                radioCheckboxResp
              ) : (
                <p>Loading</p>
              )}

              <Button type="submit" className="btn btn-primary">Save</Button>

            </Form> ) }
          </Formik>
        </div>
      </div>
    );
  }
}

export default EditQuestionForm;
