import {connect} from 'react-redux';
import AxisComponent from './AxisComponent';

const mapStateToProps = state =>{
    const {scales, chartDimensions, axisLabels, data} = state;
    const timeData = data.forEach(element => {
        return  element.Time;      
    });
    return{
        scales,
        chartDimensions,
        axisLabels,
        timeData,
    }
}

const AxisContainer = connect(mapStateToProps)(AxisComponent)

export default AxisContainer;