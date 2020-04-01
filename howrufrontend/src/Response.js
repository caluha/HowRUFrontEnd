import React from 'react';

class Response extends React.Component {

    addInput() {
        switch (this.props.type) {
            case "TEXT":
                return <input type="text" id={this.props.id} defaultValue={this.props.defaultValue[0].value} onChange={this.props.updateAnswer}/>;
            case "RANGE":
                return <input type="range" id={this.props.id} defaultValue={this.props.defaultValue[0].value} min={this.props.min} max={this.props.max} onChange={this.props.updateAnswer}/>
            case "RADIO":
                return <React.Fragment>
                            <input type={this.props.type} id={this.props.id} name={"select"} onChange={this.props.updateAnswer}/>
                            {this.props.option}    
                        </React.Fragment> 
            case "CHECKBOX":
                return <React.Fragment>
                            <input type={this.props.type} id={this.props.id} name={"sel"+this.props.id} onChange={this.props.updateAnswer}/>
                            {this.props.option}    
                        </React.Fragment> 
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