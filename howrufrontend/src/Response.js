import React from 'react';

class Response extends React.Component {

    addRespone() {
        return this.props.response;
    }

    render() {
        return (
            <React.Fragment>
                <input type={this.props.type}></input>
            </React.Fragment>
        )
    }
}

export default Response