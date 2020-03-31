import React from 'react';
import Response from './Response';

class Question extends React.Component {

    constructor(props) {
        super(props);
    }

    addResponses() {
        if (this.props.responses.length > 0) {
            return this.props.responses.map((e) => <Response type={this.props.type} value={e.value} option={e.option}/>)
        } else {
            return <Response type={this.props.type}/>
        }
    }

    render() {
        return(
            <div>
                <form>
                    <div>{this.props.question}</div>
                    <div id="responsecontainer">
                        {this.addResponses()}
                    </div>
                </form>
            </div>
        )
    }
}

export default Question;