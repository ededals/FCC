import {connect} from 'react-redux';
import AxisComponent from './AxisComponent';

const mapStateToProps = state =>{
    const {scales, chartDimensions, axisLabels} = state;

    return{
        scales,
        chartDimensions,
        axisLabels,
    }
}

const AxisContainer = connect(mapStateToProps)(AxisComponent)

export default AxisContainer;