import React from 'react';
import Response from './Response';

class Question extends React.Component {

    constructor(props) {
        super(props);
        // this.state = {
        //     id: 1,
        //     question: "",
        //     type: "",
        //     responses: []
        // }
    }

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