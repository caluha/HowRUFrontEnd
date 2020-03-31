import React from 'react';

class Response extends React.Component {

    render() {
        return (
            <div>
                <input type={this.props.type} value={this.props.value}/>
                {this.props.option}                           
            </div>
        )
    }
}

export default Response