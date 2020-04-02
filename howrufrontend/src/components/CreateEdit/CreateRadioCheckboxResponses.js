import React from 'react'

class CreateRadioCheckboxResponses extends React.Component {

    constructor(props){
        super(props);
        this.handleFormChange=this.handleFormChange.bind(this);

        this.state = {
            responses : this.props.responses
        } ; 

        this.removeElement=this.removeElement.bind(this);
        this.addElement=this.addElement.bind(this); 
    }

    handleFormChange(event){
        this.setState({[event.target.id] : event.target.value })
        event.preventDefault(); 
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
        this.setState({responses: [...this.state.responses,newResp ]});
    }

    removeElement(i){
        console.log(i);
        let newResp = this.state.responses;
        newResp.splice(i,1);
        console.log(newResp)
        this.setState({responses:newResp});
    }

    render(){

        let responseListElements = [];

        for(const i in this.state.responses){
            let el = this.state.responses[i];
            responseListElements.push(
                <li key={"el"+i}>
                    <input type="text" key={"option"+i} id={"option"+i} value={el.option}></input>
                    <input type="number" key={"value"+i} id={"value"+i} value={el.value}></input>
                    <button onClick={(event) => { this.removeElement(i) }} className="btn btn-danger">X</button>
                </li>
            );

        }

        

        return (
            <div>
                
                <ul>
                    {responseListElements}
                </ul>

                <button onClick={this.addElement} className="btn btn-primary">Add new option</button>

                
            </div>
        )
    }

}

export default CreateRadioCheckboxResponses; 