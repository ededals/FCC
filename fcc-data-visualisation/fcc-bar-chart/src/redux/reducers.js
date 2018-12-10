import types from './types';
import constant from '../Constants'


const reducer = (state=constant.INITIAL_STATE, action) =>{
    switch (action.type){
        case types.DATASET_RECEIVED:
            const {dataset, title, minMax, minMaxDate} = action;
            return {
                ...state,
                dataset,
                title,
                minMax,
                minMaxDate,

            }
        case types.CREATE_SCALES:
            const {scales, loadState} = action;
            return {
                ...state,
                scales,
                loadState,
            }
        case types.SHOW_TOOLTIP:
            const {position, renderTooltip, tooltipData} = action;
            return {
                ...state,
                position,
                renderTooltip,
                tooltipData,
            }
        case types.HIDE_TOOLTIP:
            return {
                ...state,
                renderTooltip: action.renderTooltip,
            }
        default:
            return constant.INITIAL_STATE;
    }
}

export default reducer;