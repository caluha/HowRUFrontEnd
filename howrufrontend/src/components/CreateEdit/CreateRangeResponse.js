import React from 'react'

class CreateRangeResponse extends React.Component {

    constructor(props){
        super(props);
        this.handleFormChange=this.handleFormChange.bind(this);

        this.state = this.props.response;
    }

    handleFormChange(event){
        this.setState({[event.target.id] : event.target.value }, () => this.props.saveResponse([this.state]));

        event.preventDefault(); 
    }

    render(){

        

        return (
            <div>
                
                <div className="row">
                    <div className="col">
                        <label htmlFor="min">Min</label>
                    </div>
                    
                    <div className="col">
                        <input type="number" id="min" name="min" value={this.state.min} 
                        onChange={this.handleFormChange} />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label htmlFor="max">Max</label>
                    </div>
                    <div className="col">
                        <input type="number" id="max" name="max" value={this.state.max} 
                        onChange={this.handleFormChange} />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label htmlFor="min_descriptionn">Min description</label>
                    </div>
                    <div className="col">
                        <input type="text" id="min_description" name="min_description" 
                        onChange={this.handleFormChange} value={this.state.min_description} />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label htmlFor="max_description">Max description</label>
                    </div>
                    <div className="col">    
                        <input type="text" id="max_description" name="max_description" 
                        onChange={this.handleFormChange} value={this.state.max_description} />
                    </div>
                </div>
            </div>
        )
    }

}

export default CreateRangeResponse; 