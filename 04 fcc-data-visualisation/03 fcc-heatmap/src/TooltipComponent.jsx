import React from 'react';
import constants from './constants';
import {timeFormat} from 'd3';

function TooltipComponent ({data, pointId}){
    const coordinates = document.getElementById(pointId).getBoundingClientRect();
    console.log(coordinates);

    const time = timeFormat('%b')(data.month)
    const year = timeFormat(constants.YEAR_SPECIFIER)(data.year)
    const tooltipStyle={
        position: "absolute",
        left: coordinates.right,
        top: coordinates.bottom,
    }
    return (
        <div 
            style = {tooltipStyle}
            id = "tooltip"
            data-year ={year}

>
            <p> 
                Year: {year}<br/>
                Time: {time}<br/>
                Variance:{data.variance}
            </p>
        </div>
    );
}

export default TooltipComponent;