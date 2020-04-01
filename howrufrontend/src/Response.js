import React from 'react';

class Response extends React.Component {

    addInput() {
        switch (this.props.type) {
            case "TEXT":
                return <input type="text" id={this.props.responseData.id} 
                            defaultValue={this.props.defaultValue[0].text}
                            onChange={this.props.updateAnswer}/>;
            case "RANGE":
                return <input type="range" id={this.props.responseData.id} 
                                defaultValue={this.props.defaultValue[0].value} 
                                min={this.props.responseData.min} 
                                max={this.props.responseData.max} 
                                onChange={this.props.updateAnswer}/>
            case "RADIO":
                console.log(this.props.defaultValue);
                console.log( this.props.responseData.id);
                if(this.props.defaultValue.length>0 && this.props.defaultValue[0].optionId === this.props.responseData.id){
                    return <React.Fragment>
                                <input type="radio" id={this.props.responseData.id} 
                                checked
                                name={"select"} onChange={this.props.updateAnswer}/>
                                {this.props.responseData.option}    
                            </React.Fragment> 
                } else {
                    return <React.Fragment>
                                <input type={this.props.type} id={this.props.responseData.id} name={"select"} onChange={this.props.updateAnswer}/>
                                {this.props.responseData.option}    
                            </React.Fragment> 
                }

            case "CHECKBOX":
                return <React.Fragment>
                            <input type={this.props.type} id={this.props.responseData.id} name={"sel"+this.props.responseData.id} onChange={this.props.updateAnswer}/>
                            {this.props.responseData.option}    
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