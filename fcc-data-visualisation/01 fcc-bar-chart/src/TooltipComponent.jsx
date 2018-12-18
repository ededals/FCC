import React from 'react';

function TooltipComponent ({tooltipData, position}){
    const coordinates = document.getElementById("chart-container").getBoundingClientRect();
    console.log(coordinates);
    const leftPosition = (position.xPos+20).toString().concat('px');
    const topPosition = (coordinates.bottom-coordinates.height/3).toString().concat('px')
    const tooltipStyle={
        position: "absolute",
        left: leftPosition,
        top: topPosition
    }
    return (
        <div 
            style = {tooltipStyle}
            id = "tooltip"
            data-date = {tooltipData.date}>
            <p> {tooltipData.date}
                <br />
                {tooltipData.gdp}
            </p>
        </div>
    );
}

export default TooltipComponent;