import HeatMapComponent from './HeatMapComponent';
import {connect} from 'react-redux';
import ActionCreators from './redux/actions';


const mapStateToProps = (state) =>{
    const {chartDimensions, scales} = state;
    const data = state.data.monthlyVariance;
    return {
        chartDimensions,
        data,
        scales
    }
}

const mapDispatchToProps = (dispatch) =>{
    const mouseEnterHandler = (event, data, pointId) => dispatch(ActionCreators.showTooltip(event,data, pointId));
    const mouseLeaveHandler = () => dispatch(ActionCreators.hideTooltip());
    return{
        mouseEnterHandler,
        mouseLeaveHandler,
    }
}

const HeatMapContainer = connect(mapStateToProps, mapDispatchToProps)(HeatMapComponent);

export default HeatMapContainer;