import React from 'react';

class Response extends React.Component {

    addInput() {
        switch (this.props.type) {
            case "text":
                return <input type="text"/>;
            case "range":
                return <input type="range" min={this.props.min} max={this.props.max}/>
            default:
                return <div>
                            <input type={this.props.type} value={this.props.value}/>
                            {this.props.option}                           
                        </div> 
        }
    }

    render() {
        return (
            this.addInput()
        )
    }
}

export default Response