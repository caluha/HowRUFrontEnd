import React from 'react';

class Question extends React.Component {

    render() {
        return(
            <div>
                <form>
                    <div>{this.props.question}</div>
                    <input type={this.props.type}></input>
                </form>
            </div>
        )
    }
}

export default Question;