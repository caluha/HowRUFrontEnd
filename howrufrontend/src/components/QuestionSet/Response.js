import React from 'react';


class Response extends React.Component {
    addInput() {
        switch (this.props.type) {
            case "TEXT":
                return <div className="responseverticalcenter">
                     <input type="text" id={this.props.responseData.id} 
                            defaultValue={this.props.defaultValue[0].text}
                            onChange={this.props.updateAnswer}/>
                        </div> 
                   
            case "RANGE":
                return <React.Fragment>
                            <div className="row responseverticalcenter">
                                <div className="col-2"></div>
                                <div className="col-8">
                                {/* <RangeSlider value={this.props.defaultValue[0].value} onChange={this.props.updateAnswer}/> */}
                                {/* <Range step={1} values={this.props.defaultValue[0].value} min={this.props.responseData.min} min={this.props.responseData.max} onChange={this.props.updateAnswer}/> */}
                                <input className="form-control-range" type="range" id={this.props.responseData.id} 
                                    defaultValue={this.props.defaultValue[0].value} 
                                    min={this.props.responseData.min} 
                                    max={this.props.responseData.max} 
                                    onChange={this.props.updateAnswer}/>
                                </div>
                                <div className="col-2">
                                    <span className="sliderDisplayValue">{this.props.defaultValue[0].value}</span>
                                </div>
                            </div>
                            <div className="row sliderLabels">
                                <div className="col">
                                    <span className="leftSliderLabel">{this.props.responseData.min_description}</span>
                                </div>
                                {/* <div className="col-4"></div> */}
                                <div className="col">
                                    <span className="rightSliderLabel">{this.props.responseData.max_description}</span>
                                </div>
                            </div>
                        </React.Fragment> 

            case "RADIO":
                    return <React.Fragment>
                            <div className="responseverticalcenter2">
                                <input type="radio" id={this.props.responseData.id} 
                                checked={ this.props.defaultValue.length>0 ? 
                                    this.props.defaultValue[0].optionId == this.props.responseData.id : false }
                                name={"select"} 
                                onChange={this.props.updateAnswer}/>
                                {this.props.responseData.option}              
                            </div>
                            </React.Fragment> 
                
            case "CHECKBOX":
                // console.log(this.props.defaultValue);
                return <React.Fragment>
                            <div className="responseverticalcenter2">
                                <input type={this.props.type} 
                                    id={this.props.responseData.id} 
                                    name={"sel"+this.props.responseData.id} 
                                    onChange={this.props.updateAnswer}
                                    checked={ this.props.defaultValue.length>0 ? 
                                        this.props.defaultValue.reduce( (prev, current) => { return (current.optionId == this.props.responseData.id) || prev }, false )
                                        : false }
                                    />
                                    {this.props.responseData.option}
                                </div>                                
   
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