import React from 'react';
import Response from './Response';

class Question extends React.Component {

    constructor(props) {
        super(props);
    }

    addResponses() {
        console.log(this.props.type);

        if (this.props.responses.length > 0) {
            return this.props.responses.map((e, index) => <div><Response key={index} type={this.props.type} name={e}/></div>)
        } else {
            return <Response type={this.props.type} />
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