import React, { Component } from 'react';
import TextDisplayTable from './TextDisplayTable';

class TextContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            responseDataPerQuestion:{},
            textComponent: null,

            dataLoaded:false,
            dates:[],
            values:[],
            texts:[],
         }
    }


    
  componentDidMount() {
    this.getAllResponses();
  }

    async getAllResponses(){
        let url = "http://howru.live:8080/response/question/";
        let length = this.props.questions.length; 
        let i = 0;
    
        for(const e of this.props.questions){
    
          await fetch(url + e.id)
            .then(res => res.json())
            .then(res => {
              let resp = this.state.responseDataPerQuestion;
              resp[e.id] = res; 
              this.setState({responseDataPerQuestion:resp}, () => {
                if(i===length-1){
    
                  let formatted = this.formatData(this.state.responseDataPerQuestion);
                  let textComponent = <TextDisplayTable dates={formatted.dates} texts = {formatted.texts} 
                                        questions = {this.props.questions}/> ; 
                  this.setState({dataLoaded:true, dates:formatted.dates, texts: formatted.texts, 
                                values:formatted.values, textComponent: textComponent } )
                
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


        return ( 
            <div>

            {this.state.dataLoaded ? this.state.textComponent : ""}


            </div>
         );
    }
}
 
export default TextContainer;