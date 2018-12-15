
import constants from '../constants';
import types from './types'

const reducer = (state=constants.INITIAL_STATE, action) =>{
    switch(action.type){
        case types.CREATE_SCALES:
            const scales = action.scales;
            const loadingFinished = action.loadingFinished;
            return {
                ...state,
                scales,
                loadingFinished,
            }
        case types.LOAD_DATA:
            const data = action.data;
            return {
                ...state,
                data,
            }
        case types.HIDE_TOOLTIP:
            const renderTooltip = action.renderTooltip;
            return {
                ...state,
                renderTooltip
            }
        case types.SHOW_TOOLTIP:
            const {tooltipData, pointId} = action;
            return {
                ...state,
                tooltipData,
                pointId,
                renderTooltip: action.renderTooltip,
            }
        default:
            return state;
    }
}

export default reducer;