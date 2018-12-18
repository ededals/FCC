import {connect} from 'react-redux';
import TitleComponent from './TitleComponent';

const mapStateToProps = state =>{
    const{chartDimensions} = state;
    return{
        chartDimensions,
    }
}

const TitleContainer = connect(mapStateToProps)(TitleComponent);
export default TitleContainer;