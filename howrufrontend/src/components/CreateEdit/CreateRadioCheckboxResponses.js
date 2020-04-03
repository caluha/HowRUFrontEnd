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

    responseChanger = (el, type) => {
        let ss = this.setState;


        return ( event ) => {
            if(type==="option"){
                el.option=event.target.value;
             } else {
                 el.value=event.target.value;
             }
             console.log(event.target.value)
             this.setState( {responses : this.state.responses}, this.props.saveResponse(this.state.responses));
        }
    }

    makeResponseElements = () => {
        let responseListElements = [];

        for(const i in this.state.responses){
            let el = this.state.responses[i];
            responseListElements.push(
                <tr key={"el"+i}>
                    <td>
                        <input type="text" key={"option"+i} id={"option"+i} 
                        value={el.option}
                        onChange={this.responseChanger(el,"option") }></input>
                    </td>
                    <td>
                        <input type="number" key={"value"+i} id={"value"+i} 
                        value={el.value}
                        onChange={this.responseChanger(el,"value") }></input>
                    </td>
                    <td>
                        <button type="button" onClick={(event) => { this.removeElement(i) }} className="btn btn-danger">X</button>
                    </td>
                </tr>
            );
        }

        return responseListElements;
    }

    render(){

 
        let responseElements = this.makeResponseElements(); 
        

        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">Option</th>
                        <th scope="col">value</th>
                        <th scope="col"></th>

                        </tr>
                    </thead>
                    <tbody>
                        {responseElements}
                    </tbody>
                </table>
               

                <button type="button" onClick={this.addElement}
                 className="btn btn-primary m-3">Add new option</button>

                
            </div>
        )
    }

}

export default CreateRadioCheckboxResponses; 