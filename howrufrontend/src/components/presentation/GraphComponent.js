import React from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class GraphComponent extends React.Component {

    componentDidMount() {
        if(this.props.values.length===0){
            return;
        }

        let questionNames = this.props.questionNames; 
        let dates = JSON.parse(JSON.stringify(this.props.dates));
        let values = JSON.parse(JSON.stringify(this.props.values));
        

        let chart = am4core.create("chartdiv", am4charts.XYChart);

        chart.paddingRight = 20;

        let data = [];
        for (let x in dates) {
            let dataObject = {date: new Date(dates[x]) };
            for(let y in values){
                dataObject[`value${y}`] = values[y][x];  
            }
            // let dataObject = {date: new Date(dates[x]), value: values[0][x]};
            data.push(dataObject);
        }

        chart.data = data;

        // let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        // dateAxis.renderer.grid.template.location = 0;

        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;
        valueAxis.renderer.minWidth = 35;

        let scrollbarX = new am4charts.XYChartScrollbar();

        for(let y in values){        
            let series = chart.series.push(new am4charts.LineSeries());
            series.dataFields.dateX = "date";
            series.dataFields.valueY = `value${y}`;
            series.tooltipText = "{valueY.value}";
            series.legendSettings.labelText=questionNames[y]; 
            scrollbarX.series.push(series);
        }
        
        chart.cursor = new am4charts.XYCursor();

        chart.legend = new am4charts.Legend();
        
       // chart.scrollbarX = scrollbarX;

        this.chart = chart;
    }

    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    }

    render() {

        if(this.props.values.length===0){
            return (<div className="showNoData">
                <h2>This tracker has no data suitable for a line graph!</h2>
            </div>);
        }

        return (
            <div id="chartdiv" style={{ width: "100%", height: "350px", backgroundColor:"white" }}></div>
        );
    }
}

export default GraphComponent;