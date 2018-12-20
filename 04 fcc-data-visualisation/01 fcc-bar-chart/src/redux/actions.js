//actions.js
//contains redux actions for the app
import types from './types.js';
import constants from '../Constants';

const receiveData = (response, minMax, minMaxDate)=>{

    return{
        type: types.DATASET_RECEIVED,
        dataset: response.data,
        title: response.source_name,
        minMax: minMax,
        minMaxDate,
        
    }
}

const createScales = (scales) => {
    return{
        type: types.CREATE_SCALES,
        scales,
        loadState: constants.LOADED,
    }
}

const showTooltip = (xPos,yPos, date, gdp) =>{
    return {
        type: types.SHOW_TOOLTIP,
        position: {xPos, yPos},
        tooltipData: {date, gdp},
        renderTooltip: true
    }
}

const hideTooltip = ()=>{
    return {
        type: types.HIDE_TOOLTIP,
        renderTooltip: false,
    }
}

export default {
    receiveData,
    createScales,
    showTooltip,
    hideTooltip,
}