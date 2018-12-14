import {connect} from 'react-redux';
import LegendComponent from './LegendComponent';

const mapStatetoProps = (state)=>{
    const {chartDimensions} = state;
    return {
        chartDimensions,
    }
}

const LegendContainer = connect(mapStatetoProps)(LegendComponent);

export default LegendContainer;