import React from 'react'

class CreateRangeResponse extends React.Component {

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
                    <label htmlFor="min">Min</label>
                    <input type="number" id="min" name="min" value={this.state.min} onChange={this.handleFormChange} />

                    <label htmlFor="max">Max</label>
                    <input type="number" id="max" name="max" value={this.state.max} onChange={this.handleFormChange} />
                    
                    <label htmlFor="mimin_descriptionn">Min description</label>
                    <input type="text" id="min_description" name="min_description" onChange={this.handleFormChange} value={this.state.min_description} />

                    <label htmlFor="max_description">Max description</label>
                    <input type="text" id="max_description" name="max_description" onChange={this.handleFormChange} value={this.state.max_description} />

                </form>

                
            </div>
        )
    }

}

export default CreateRangeResponse; 