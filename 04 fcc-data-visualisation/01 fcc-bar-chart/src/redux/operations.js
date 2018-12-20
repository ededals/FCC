import Creators from './actions';
import {timeParse, scaleTime, scaleLinear, extent} from 'd3';

const URL = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"

function requestChartData(){
    return dispatch => {
        let request=new XMLHttpRequest();
        request.open("GET", URL, true);
        request.send();
        request.onload = ()=>{
            let responseObject = JSON.parse(request.response);
            let timeParser = timeParse('%Y-%m-%d');
            responseObject.data.forEach(element => {
                element[0] = timeParser(element[0]);
                element[1] = +element[1];
            });

            
            const minMax = extent(responseObject.data, datapoint=> datapoint[1]);
            const minMaxDate= extent(responseObject.data, datapoint => datapoint[0])
            dispatch(Creators.receiveData(responseObject, minMax, minMaxDate));
        };
    }
}

function createScales(height, width, minMax, margin, minMaxDate){
    return dispatch => {
        const yScale = scaleLinear()
            .domain([0, minMax[1]])
            .range([height-margin.bottom, margin.top]);


        const xScale = scaleTime()
            .domain(minMaxDate)
            .range([margin.left, width-margin.right]);

        dispatch(Creators.createScales({xScale, yScale}));
    }
    
}

//Responsible for receiving event data and gdp dispatch actionCreator with  formatted input

function handleMouseEnter(event, date, gdp){
    console.log(event);

    return dispatch =>{ 
        const formatedGDP = `$${gdp} Billion`;
        dispatch(Creators.showTooltip(event.pageX, event.pageY, date, formatedGDP));
    }
}

function handleMouseLeave(){
    return dispatch => {
        dispatch(Creators.hideTooltip())
    }
}

export default {
    requestChartData,
    createScales,
    handleMouseEnter,
    handleMouseLeave,
}