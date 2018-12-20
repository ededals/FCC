import * as d3 from 'd3';
import React from 'react';
import constants from './constants';


class AxisComponent extends React.Component {



    componentDidMount() {
        this.renderAxis()
    }
    componentDidUpdate()
    {
        this.renderAxis()
    }

    renderAxis() {
        
        const yAxis = d3.axisLeft()
            .scale(this.props.scales.yScale)
            .tickFormat(d => d3.timeFormat(constants.TIME_SPECIFIER)(d));
        const xAxis = d3.axisBottom().scale(this.props.scales.xScale);

	    d3.select(this.refs.yAxis)
          .call(yAxis)

         
        d3.select(this.refs.xAxis)
            .call(xAxis);
    }

    render() {
        const {chartDimensions, axisLabels} = this.props;
    	return( 
        <g>
            <g 
                id = "y-axis"
                transform={`translate(${chartDimensions.margin.left}, 0)`} 
                ref="yAxis" />
                <text
                    className="axis-text" 
                    x={chartDimensions.height/2-chartDimensions.margin.bottom} 
                    y={-chartDimensions.margin.left-10} 
                    transform = "rotate(90)">
                    {axisLabels.y}
                </text>
            <g>
                <g  
                    id = "x-axis"
                    transform={`translate(0,${chartDimensions.height - chartDimensions.margin.bottom})`} 
                    ref = "xAxis" />
                <text
                    className="axis-text" 
                    x={chartDimensions.width/2} 
                    y={chartDimensions.height-chartDimensions.margin.bottom/4}>
                    {axisLabels.x}
                </text>
            </g>
        
        </g>);
    }
}

export default AxisComponent