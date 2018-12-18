import {connect} from 'react-redux';
import TitleComponent from './TitleComponent';

const mapStateToProps = state =>{
    const{width, title, margin} = state;
    return{
        width,
        title,
        margin,
    }
}

const TitleContainer = connect(mapStateToProps)(TitleComponent);
export default TitleContainer;