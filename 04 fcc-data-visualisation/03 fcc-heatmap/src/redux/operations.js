import ActionCreators from './actions';
import {timeParse, scaleTime, extent, scaleSequential, interpolateRgb, scaleBand} from 'd3';
import constant from '../constants';

function requestChartData(){
    const monthFormatter = timeParse(constant.MONTH_SPECIFIER);
    const yearFormatter = timeParse(constant.YEAR_SPECIFIER);
    return dispatch => {
        let request=new XMLHttpRequest();
        request.open("GET", constant.URL, true);
        request.send();
        request.onload = ()=>{
            let responseObject = JSON.parse(request.response);
            responseObject.monthlyVariance.forEach(element =>{
                element.year = yearFormatter(element.year);
                element.month = monthFormatter(element.month);

            });
            dispatch(ActionCreators.loadData(responseObject));
        };
    }
}

function createScales(data, dimensions){
    const months = data.map(element => element.month);
    const minMaxYear = extent(data, element => element.year);
    const minMaxVariance = extent(data, element => element.variance)
    return dispatch => {
        const yScale = scaleBand()
            .domain(months)
            .range([dimensions.margin.top, dimensions.height-dimensions.margin.bottom])
        const xScale = scaleTime()
            .domain(minMaxYear)
            .range([dimensions.margin.left, dimensions.width-dimensions.margin.right])

        const zScale = scaleSequential()
            .domain(minMaxVariance)
            .interpolator(interpolateRgb("blue","orange"));
        dispatch(ActionCreators.createScales({xScale, yScale, zScale}));
    }

}

export default {
    requestChartData,
    createScales,
}