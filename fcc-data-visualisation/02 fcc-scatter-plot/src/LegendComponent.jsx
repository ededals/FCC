import React from 'react';
function LegendComponent({chartDimensions}){
    const rectHeight = 10;
    const rectDistanceFromSide = chartDimensions.margin.right;
    const padding = 2;
    return(
        <g id = "legend">
            <g>
                <rect 
                    class = "no-doping"
                    y={chartDimensions.height/2+padding+rectHeight}
                    x = {chartDimensions.width - chartDimensions.margin.left-rectDistanceFromSide}
                    height = {rectHeight}
                    width = {rectHeight}   />
                    
                <text
                    y = {chartDimensions.height/2+2+2*rectHeight}
                    x = {chartDimensions.width 
                            - chartDimensions.margin.left
                            -rectDistanceFromSide
                            +rectHeight + padding}>No doping alegations</text>
            </g>
            <g>
                <rect 
                    class = "doping"
                    y={chartDimensions.height/2-padding-rectHeight}
                    x = {chartDimensions.width - chartDimensions.margin.left-rectDistanceFromSide}
                    height = {rectHeight}
                    width = {rectHeight}   />
                    
                <text
                    y = {chartDimensions.height/2-padding}
                    x = {chartDimensions.width 
                            - chartDimensions.margin.left
                            -rectDistanceFromSide
                            +rectHeight + padding}>Doping alegations</text>
            </g>
        </g>
    )
}

export default LegendComponent