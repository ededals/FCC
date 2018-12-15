import React from 'react';
import {timeFormat} from 'd3'
import constants from './constants'


function HeatMapComponent ({chartDimensions, data, scales, mouseEnterHandler, mouseLeaveHandler}){
    const width = chartDimensions.width/(data.length/12);
    return(
        <g>
            {data.map((datapoint, index) =>{
                const datapointID =`datapoint-${index}`;
                const formatedYear = timeFormat(constants.YEAR_SPECIFIER)(datapoint.year);
                return (<rect 
                    class = "cell"
                    id = {datapointID}
                    x = {scales.xScale(datapoint.year)}
                    y = {scales.yScale(datapoint.month)}
                    height = {scales.yScale.bandwidth()}
                    width = {width}
                    fill = {scales.zScale(datapoint.variance)}
                    data-month={datapoint.month.getMonth()}
                    data-year={formatedYear}
                    data-temp={datapoint.variance}
                    onMouseEnter = {(event)=>mouseEnterHandler(event, datapoint, datapointID)}
                    onMouseLeave = {()=> mouseLeaveHandler()}
                />
                );
            })}
        </g>
    );
}

export default HeatMapComponent;
