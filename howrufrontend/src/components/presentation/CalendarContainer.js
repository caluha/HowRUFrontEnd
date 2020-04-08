import React, { Component } from 'react';

class CalendarContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            responseDataPerQuestion: {},

            dates: [],
            values:[],
            
        }
    }

    componentDidMount(){
        this.getAllResponses(); 
    }

    async getAllResponses(){
        let url = "http://ec2-13-53-42-207.eu-north-1.compute.amazonaws.com:8080/response/question/";
        let length = this.props.questions.length; 
        let i = 0;
        let questionNames = this.props.questions.map(el => el.question ); 
    
        for(const e of this.props.questions){
    
          await fetch(url + e.id)
            .then(res => res.json())
            .then(res => {
              let resp = this.state.responseDataPerQuestion;
              resp[e.id] = res; 
              this.setState({responseDataPerQuestion:resp}, () => {
                if(i===length-1){
    
                  let formatted = this.formatData(this.state.responseDataPerQuestion);
                  
                  this.setState({dataLoaded:true, dates:formatted.dates, texts: formatted.values, 
                                values:formatted.values } )
                
                }
              });
            i++;
            })
           
    
    
    
    
    
        }
      }


      formatData(responseDataPerQuestion)  {

        let dates = [];
        let values = []; 
        let texts = []; 
    
        let first = true;
        let rData = this.state.responseDataPerQuestion;
        for(let x in rData){
    
          
    
          switch (rData[x][0].type) {
    
            case "TEXT":
              if(first){
                first=false; 
                for(let el of rData[x] ){
                  dates.push(el.responseTime);
                }
              }
              let newText=[]; 
              for(let el of rData[x]){
                newText.push(el.text);
              }
              texts.push(newText); 
              break;
    
            case "CHECKBOX":
              let datesAndValues = rData[x].reduce(
                (acc, el) => { 
                  if(acc.length===0){
                    return [{date: el.responseTime, value:el.value} ] } 
                    else if(el.responseTime===acc[acc.length-1].date) {
                      acc[acc.length-1].value += el.value; 
                      return acc;
                    } else {
                      return acc.concat([{date:el.responseTime, value:el.value}])
                    }},
                    []
              );
              if(first){
                first=false; 
                for(let el of datesAndValues ){
                  dates.push(el.date);
                }
              }
              let newVals=[]; 
              for(let el of datesAndValues){
                newVals.push(el.value); 
              }
              values.push(newVals); 
              break;
    
            default:
              if(first){
                first=false; 
                for(let el of rData[x] ){
                  dates.push(el.responseTime);
                }
              }
              let newValues=[]; 
              for(let el of rData[x]){
                newValues.push(el.value);
              }
              values.push(newValues); 
          }      
        }
    
        return {dates:dates, values: values, texts: texts}; 
    
    
      }
    









    render() { 

        let dateDisplay = [];
        for(let el of this.state.dates){
            dateDisplay.push(<p>{el}</p>);
        }


        return ( <div>
            <h1>Calendar container works</h1>  
            
            {dateDisplay}
            
            </div>);
    }
}
 
export default CalendarContainer;