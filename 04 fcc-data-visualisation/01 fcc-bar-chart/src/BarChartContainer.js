//BarCharContainer.js
import {connect} from 'react-redux';
import BarChartComponent from './BarChartComponent';

import Operations from './redux/operations'

const mapStateToProps = (state) => {
    const {dataset, scales, height, margin, width} = state;
    return{
        dataset,
        scales,
        height,
        margin,
        width,
    }
}

const mapDispatchToProps = (dispatch) =>{
    const mouseEnterHandler = (event, date, gdp)=>dispatch(Operations.handleMouseEnter(event, date, gdp));
    const mouseLeaveHandler = ()=>dispatch(Operations.handleMouseLeave());
    return {
        mouseEnterHandler,
        mouseLeaveHandler,
    }
}


const BarCharContainer = connect(mapStateToProps, mapDispatchToProps)(BarChartComponent);

export default BarCharContainer;