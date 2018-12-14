import React from 'react';
import constants from './constants';
import {timeFormat} from 'd3';

function TooltipComponent ({data, pointId}){
    const coordinates = document.getElementById(pointId).getBoundingClientRect();
    console.log(coordinates);
    const time = timeFormat(constants.TIME_SPECIFIER)(data.Time)
    const year = timeFormat(constants.YEAR_SPECIFIER)(data.Year)
    const tooltipStyle={
        position: "absolute",
        left: coordinates.right,
        top: coordinates.bottom,
    }
    return (
        <div 
            style = {tooltipStyle}
            id = "tooltip"
            data-year={data.Year}
>
            <p> 
                {data.Name}: {data.Nationality}<br/>
                Year: {year}, Time: {time}<br/>
                {data.Doping &&  <p>{data.Doping}</p>}
            </p>
        </div>
    );
}

export default TooltipComponent;