import React from 'react';

class Response extends React.Component {

    addInput() {
        switch (this.props.type) {
            case "TEXT":
                return <input type="text" id={this.props.id}/>;
            case "RANGE":
                return <input type="range" id={this.props.id} defaultValue={this.props.value} min={this.props.min} max={this.props.max}/>
            case "RADIO":
            case "CHECKBOX":
                return <div>
                            <input type={this.props.type} id={this.props.id} name="selection"/>
                            {this.props.option}    
                        </div> 
            default:
                return <div>OH HELL NO!</div>
        }
    
    }

    render() {
        return (
            this.addInput()
        )
    }
}

export default Response