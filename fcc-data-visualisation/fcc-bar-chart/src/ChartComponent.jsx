import React from 'react';
import BarChartContainer from './BarChartContainer';
import TitleContainer from './TitleContainer';
import AxisContainer from './AxisContainer';
import TooltipContainer from './TooltipContainer';
import constants from './Constants';

class ChartComponent extends React.Component{
    componentDidMount(){
        this.props.loadData();
        
 
    }
    componentDidUpdate(){
        const {height, width, minMax, margin, minMaxDate, loadState} = this.props;
        if (loadState === constants.NOT_LOADED){
            this.props.createScales(height, width, minMax, margin, minMaxDate);
        }
        
        
    }
    
    

    render(){
        let {width, height, loadState, renderTooltip} = this.props;

        if (loadState === constants.LOADED){
            return(
                <div className ="chart">
                {renderTooltip && <TooltipContainer />}
                    <svg
                        id = "chart-container"
                        width={width}
                        height={height}>
                        <TitleContainer />
                        <BarChartContainer />
                        <AxisContainer />
                    </svg>
                </div>
            );
        } else{
            return <div>
                Loading...
            </div>
        }


    } 
}

export default ChartComponent;