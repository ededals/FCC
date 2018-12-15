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
            .tickFormat(d=>d3.timeFormat('%B')(d))
            .tickPadding(6);

        const xAxis = d3.axisBottom()
            .scale(this.props.scales.xScale)
            .tickFormat(d=>d3.timeFormat(constants.YEAR_SPECIFIER)(d))
            .tickPadding(6);

	    d3.select(this.refs.yAxis)
          .call(yAxis)

         
        d3.select(this.refs.xAxis)
            .call(xAxis);
    }

    render() {
        let zDomain = this.props.scales.zScale.domain();
        zDomain.splice(1,0,zDomain[0]/2, zDomain[1]/2);
        const legendHeight = 30;
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
                    y={-chartDimensions.margin.left/6} 
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
            <g>
                <g 
                    ref="legend"
                    id="legend">
                    {zDomain.map((element, index)=>{
                        return <g>
                                    <rect 
                                        x = {chartDimensions.margin.left+index*legendHeight}
                                        y = {chartDimensions.height-chartDimensions.margin.bottom/4}
                                        width = {legendHeight}
                                        height = {legendHeight}
                                        fill = {this.props.scales.zScale(element)}/>
                                    <text
                                        class= "legend-text"
                                        x = {chartDimensions.margin.left+index*legendHeight+legendHeight/4}
                                        y = {chartDimensions.height-chartDimensions.margin.bottom/4-3}>
                                        {Math.round(element*10)/10}                                        
                                    </text>
                                </g>
                    })}
                </g>
                <text>

                </text>
            </g>
        
        </g>);
    }
}

export default AxisComponent