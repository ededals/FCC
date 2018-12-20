import React from 'react';


function ScatterComponent ({data, scales, mouseEnterHandler, mouseLeaveHandler}){
    const circleRadius = 5;
    
    return(
        <g>
            {data.map((datapoint, index) =>{
                const datapointID =`datapoint-${index}`;
                return (<circle 
                    class = {datapoint.Doping?"doping dot":"no-doping dot"}
                    id = {datapointID}
                    cx = {scales.xScale(datapoint.Year)}
                    cy = {scales.yScale(datapoint.Time)}
                    r = {circleRadius}
                    data-xvalue = {datapoint.Year}
                    data-yvalue = {datapoint.Time.toISOString()}
                    onMouseEnter = {(event)=>mouseEnterHandler(event,datapoint, datapointID)}
                    onMouseLeave = {()=> mouseLeaveHandler()}
                />
                );
            })}
        </g>
    );
}

export default ScatterComponent;
