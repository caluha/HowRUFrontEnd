import React from 'react';
import Response from './Response';

class Question extends React.Component {

    constructor(props) {
        super(props);
        this.updateAnswer = this.updateAnswer.bind(this);

        this.state = { 
            
                responseId: -1,
                value:"",
                text:"",
                optionType:""
            
        }
    }

    

    addResponses() {
        // if (this.props.responses.length > 0) {
        //     return this.props.responses.map((e) => <Response type={this.props.type} value={e.value} option={e.option}/>)
        // } else {
        //     return <Response type={this.props.type}/>
        // }
        return this.props.responses.map((e) => <Response type={this.props.type} key={e.id} 
                                                id={e.id} value={e.value} min={e.min} max={e.max} 
                                                min_description={e.min_description} max_description={e.max_description}  
                                                option={e.option}
                                                updateAnswer = {this.updateAnswer} />)
    }

    updateAnswer(event){

        this.setState({ responseId:event.target.id, value : event.target.value})
        
        console.log(event.target.id);

    }

    previous = () => {

        this.props.handleAnswer(this.props.id, this.state);
        this.props.previous();

    }

    next = () => {
        this.props.handleAnswer(this.props.id, this.state);
        this.props.next();
    }

    render() {
        return(
            <div>
                <form onChange={this.updateAnswer}>
                    <div className="question">{this.props.question}</div>
                    <div id="responsecontainer">
                        {this.addResponses()}
                    </div>
                </form>
                <div>
                    <button onClick={this.previous}>Previous</button>
                    <button onClick={this.next}>Next</button>
                </div>
            </div>
        )
    }
}

export default Question;