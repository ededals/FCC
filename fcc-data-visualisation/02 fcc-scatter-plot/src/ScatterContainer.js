import ScatterComponent from './ScatterComponent';
import {connect} from 'react-redux';
import ActionCreators from './redux/actions';


const mapStateToProps = (state) =>{
    const {data, scales} = state;
    return {
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

const ScatterContainer = connect(mapStateToProps, mapDispatchToProps)(ScatterComponent);

export default ScatterContainer;