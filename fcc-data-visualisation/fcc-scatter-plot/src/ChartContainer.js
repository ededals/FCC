import ChartComponent from './ChartComponent';
import Operations from './redux/operations';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    const {chartDimensions, loadingFinished, renderTooltip} = state;
    let scaleData;
    if(state.data){
        scaleData = state.data.map(element =>{
            return {
                Time: element.Time,
                Year: element.Year,
            }
        });
    }

    return{
        chartDimensions,
        scaleData,
        loadingFinished,
        renderTooltip,
    }

}

const mapDispatchToProps = (dispatch) =>{
    const loadData = () => dispatch(Operations.requestChartData());
    const createScales = (scaleData, dimensions) => dispatch(Operations.createScales(scaleData, dimensions))
    return {
        loadData,
        createScales,
    }
}


const ChartContainer = connect(mapStateToProps, mapDispatchToProps)(ChartComponent);

export default ChartContainer;