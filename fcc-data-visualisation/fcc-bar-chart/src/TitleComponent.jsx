import React from 'react';

function TitleComponent ({width, title, margin}) {
        console.log(title);
        return(
            <text id="title"
                x = {width/2}
                y = {margin.top/2}
                textAnchor="middle">{title}</text>
        );
}

export default TitleComponent