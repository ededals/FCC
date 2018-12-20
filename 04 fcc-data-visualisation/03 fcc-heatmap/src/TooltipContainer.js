import {connect} from 'react-redux';
import TooltipComponent from './TooltipComponent';
const mapStateToProps = (state) => {
    const data = state.tooltipData;
    const pointId = state.pointId;
    return{
        data,
        pointId,
    }
}

const TooltipContainer = connect(mapStateToProps)(TooltipComponent);
export default TooltipContainer;