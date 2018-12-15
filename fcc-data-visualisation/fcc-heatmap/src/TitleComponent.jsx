import React from 'react';
import constants from './constants'

function TitleComponent ({chartDimensions}) {
        return(
        <g>
                <text id="title"
                        x = {chartDimensions.width/2}
                        y = {chartDimensions.margin.top/4}
                        textAnchor="middle">{constants.CHART_TITLE}</text>

                <text id = "description"
                        x={chartDimensions.width/2}
                        y = {chartDimensions.margin.top/4+25}
                        textAnchor ="middle">{constants.CHART_SUBTITLE}</text>
        </g>
            
        );
}

export default TitleComponent