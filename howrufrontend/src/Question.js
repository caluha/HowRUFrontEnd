import React from 'react';
import Response from './Response';

class Question extends React.Component {

    constructor(props) {
        super(props);
    }

    addResponses() {
        // if (this.props.responses.length > 0) {
        //     return this.props.responses.map((e) => <Response type={this.props.type} value={e.value} option={e.option}/>)
        // } else {
        //     return <Response type={this.props.type}/>
        // }
        return this.props.responses.map((e) => <Response type={this.props.type} key={e.id} id={e.id} value={e.value} min={e.min} max={e.max} min_description={e.min_description} max_description={e.max_description}  option={e.option}/>)
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