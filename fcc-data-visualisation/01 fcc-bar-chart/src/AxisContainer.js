import {connect} from 'react-redux';
import AxisComponent from './AxisComponent';

const mapStateToProps = state =>{
    const {scales, margin, height, width, axisLabels} = state;
    return{
        scales,
        margin,
        height,
        width,
        axisLabels,
    }
}

const AxisContainer = connect(mapStateToProps)(AxisComponent)

export default AxisContainer;