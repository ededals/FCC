import React from 'react';
import AxisContainer from './AxisContainer';
import HeatMapContainer from './HeatMapContainer';
import TooltipContainer from './TooltipContainer';
import TitleContainer from './TitleContainer';
//import LegendContainer from './LegendContainer';



class ChartComponent extends React.Component{
    componentDidMount(){
        this.props.loadData();
    }

    componentDidUpdate(){
        if(!this.props.loadingFinished){
            this.props.createScales(this.props.scaleData, this.props.chartDimensions);
        }
            
    }

    render(){
        const {chartDimensions, loadingFinished, renderTooltip} = this.props;
        if (!loadingFinished){
            return(
                <div>
                    Loading...
                </div>
            );
        }
        console.log(renderTooltip);
        return (
            <div>
                {(renderTooltip && <TooltipContainer />)}
                 <svg 
                    id = "chart-container"
                    height = {chartDimensions.height}
                    width = {chartDimensions.width}>
                    <AxisContainer />
                    <HeatMapContainer />
                    <TitleContainer />
                </svg>
            </div>
           
        );
    }
}

export default ChartComponent;