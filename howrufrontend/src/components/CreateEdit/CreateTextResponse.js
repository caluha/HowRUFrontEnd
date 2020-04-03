import React from 'react'

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
                <div className="row">
                    <div className="col">
                        <label htmlFor="text">Default text</label>
                    </div>
                    <div className="col">
                        <input type="text" id="text" name="text" value={this.state.text} onChange={this.handleFormChange} noValidate />
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateTextResponse; 