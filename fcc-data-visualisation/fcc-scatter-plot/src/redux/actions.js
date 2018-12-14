import types from './types';

const loadData = (data) =>{
    return {
        type: types.LOAD_DATA,
        data
    }
}

const createScales = (scales) => {
    return {
        type: types.CREATE_SCALES,
        loadingFinished: true,
        scales,
    }
}

const showTooltip = (event, tooltipData, pointId) =>{
    const renderTooltip = true;
    return {
        type: types.SHOW_TOOLTIP,
        tooltipData,
        pointId,
        renderTooltip,
    }
}

const hideTooltip = () =>{
    const renderTooltip = false;
    return{
        type: types.HIDE_TOOLTIP,
        renderTooltip,
    }
}

export default {
    loadData,
    createScales,
    showTooltip,
    hideTooltip,
}