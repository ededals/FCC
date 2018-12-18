//BarCharComponent.jsx

import React from 'react';
import {timeFormat} from 'd3';

function BarChartComponent ({dataset, scales, height, margin, mouseEnterHandler, mouseLeaveHandler, width}) {
        let barWidth = (width-margin.left-margin.right)/dataset.length;
        let dateFormatter = timeFormat('%Y-%m-%d');
        return (
            <g>
                {dataset.map((datapoint, index) => {
                    const date = dateFormatter(datapoint[0]);
                    const gdp = datapoint[1];
                    return <rect
                        className = "bar" 
                        key = {index}
                        x={scales.xScale(datapoint[0])}
                        y={scales.yScale(datapoint[1])}
                        width={barWidth}
                        height={height-scales.yScale(datapoint[1])-margin.bottom}
                        data-date = {date}
                        data-gdp = {gdp}
                        onMouseEnter = {(event) =>mouseEnterHandler(event, date, gdp)}
                        onMouseLeave = {()=> mouseLeaveHandler()}/>
                })}
            </g>
        );
}

export default BarChartComponent;
