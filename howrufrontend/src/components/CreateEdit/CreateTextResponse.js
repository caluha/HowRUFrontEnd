import React from 'react'

class CreateTextResponse extends React.Component {

    constructor(props){
        super(props);
        this.handleFormChange=this.handleFormChange.bind(this);

        this.state = this.props.response;

    }

    handleFormChange(event){
        this.setState({[event.target.id] : event.target.value })
        event.preventDefault(); 
    }

    render(){

        

        return (
            <div>
                <form onChange={this.handleFormChange}>
                    <label htmlFor="text">Default text</label>
                    <input type="text" id="text" name="text" value={this.state.text} onChange={this.handleFormChange} />
                </form>

                
            </div>
        )
    }

}

export default CreateTextResponse; 