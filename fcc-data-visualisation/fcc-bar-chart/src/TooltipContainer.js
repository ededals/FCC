import {connect} from 'react-redux';
import TooltipComponent from './TooltipComponent';
const mapStateToProps = (state) => {
    const {tooltipData, position, height, margin} = state;
    return{
        tooltipData,
        position,
        height,
        margin,
    }
}

const TooltipContainer = connect(mapStateToProps)(TooltipComponent);
export default TooltipContainer;