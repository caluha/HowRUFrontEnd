import React from 'react'

class CreateRadioResponses extends React.Component {

    constructor(props){
        super(props);
        this.handleFormChange=this.handleFormChange.bind(this);

        this.state = {
            responses : this.props.responses
        } ; 

    }

    handleFormChange(event){
        this.setState({[event.target.id] : event.target.value })
        event.preventDefault(); 
    }
    // RadioResponse1 : {
    //     "type": "RADIO",
    //     "value": "0",
    //     "option": "Bad",
    //     "text": "null",
    //     "min": "null",
    //     "max": "null",
    //     "min_description": "null",
    //     "max_description": "null"
    // }
    render(){

        let i = 0;
        let responseListElements = [];
        console.log(this.state.responses); 
        for(let el of this.state.responses){

            console.log(el);
            
            responseListElements.push(
                <li key={"el"+i}>
                    <input type="text" key={"option"+i} id={"option"+i} value={el.option}></input>
                    <input type="number" key={"value"+i} id={"value"+i} value={el.value}></input>

                </li>
            );
            i++; 

        }

        

        return (
            <div>
                
                <ul>
                    {responseListElements}
                </ul>


{/* 
                <form onChange={this.handleFormChange}>
                    <label htmlFor="text">Default text</label>
                    <input type="text" id="text" name="text" value={this.state.text} onChange={this.handleFormChange} />
                </form> */}

                
            </div>
        )
    }

}

export default CreateRadioResponses; 