import {connect} from 'react-redux';
import ChartComponent from './ChartComponent';

import Operations from './redux/operations';

const mapStateToProps = (state) => {
    const {height, width, loadState, minMax, margin, minMaxDate, renderTooltip} = state;
    return{
        height,
        width,
        loadState,
        minMax,
        margin,
        minMaxDate,
        renderTooltip,
    }
}

const mapDispatchToProps = (dispatch) => {
    const loadData = () => dispatch(Operations.requestChartData()); 
    const createScales = (height, width, minMax, margin, minMaxDate) => 
        dispatch(Operations.createScales(height, width, minMax, margin, minMaxDate));
    return{
        loadData,
        createScales,
    }
}

const ChartContainer = connect(mapStateToProps, mapDispatchToProps)(ChartComponent);

export default ChartContainer;