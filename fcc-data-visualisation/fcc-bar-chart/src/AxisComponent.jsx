import * as d3 from 'd3';
import React from 'react';


class AxisComponent extends React.Component {



    componentDidMount() {
        this.renderAxis()
    }
    componentDidUpdate()
    {
        this.renderAxis()
    }

    renderAxis() {

        const yAxis = d3.axisLeft().scale(this.props.scales.yScale);
        const xAxis = d3.axisBottom().scale(this.props.scales.xScale);

	    d3.select(this.refs.yAxis)
          .call(yAxis)

         
        d3.select(this.refs.xAxis)
            .call(xAxis);
    }

    render() {
    	return( 
        <g>
            <g 
                id = "y-axis"
                transform={`translate(${this.props.margin.left}, 0)`} 
                ref="yAxis" />
                <text
                    className="axis-text" 
                    x={this.props.height/4} 
                    y={-this.props.margin.left-10} 
                    transform = "rotate(90)">
                    {this.props.axisLabels.y}
                </text>
            <g>
                <g  
                    id = "x-axis"
                    transform={`translate(0,${this.props.height - this.props.margin.bottom})`} 
                    ref = "xAxis" />
                <text
                    className="axis-text" 
                    x={this.props.width/2} 
                    y={this.props.height-this.props.margin.bottom/4}>
                    {this.props.axisLabels.x}
                </text>
            </g>
        
        </g>);
    }
}

export default AxisComponent