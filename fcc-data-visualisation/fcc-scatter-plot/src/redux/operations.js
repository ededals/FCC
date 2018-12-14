import ActionCreators from './actions';
import {timeParse, scaleTime, extent} from 'd3';
import constant from '../constants';

function requestChartData(){
    return dispatch => {
        let request=new XMLHttpRequest();
        request.open("GET", constant.URL, true);
        request.send();
        request.onload = ()=>{
            let responseObject = JSON.parse(request.response);
            const timeParser = timeParse(constant.TIME_SPECIFIER);
            const yearParser = timeParse(constant.YEAR_SPECIFIER);
            responseObject.forEach(element => {

                element.Time = timeParser(element.Time);

                element.Year = yearParser(element.Year);
            });

            dispatch(ActionCreators.loadData(responseObject));
        };
    }
}

function createScales(data, dimensions){
   
    const minMaxTime = extent(data, element =>element.Time);
    let minMaxYear = extent(data, element => element.Year);
    //Adding year on both sides to add padding
    minMaxYear[0].setFullYear(minMaxYear[0].getFullYear()-1);
    minMaxYear[1].setFullYear(minMaxYear[1].getFullYear()+1);
    console.log(minMaxTime);
    return dispatch => {
        const yScale = scaleTime()
            .domain(minMaxTime)
            .range([dimensions.margin.top, dimensions.height-dimensions.margin.bottom])


            

        const xScale = scaleTime()
            .domain(minMaxYear)
            .range([dimensions.margin.left, dimensions.width-dimensions.margin.right])

        dispatch(ActionCreators.createScales({xScale, yScale}));
    }

}

//Responsible for receiving event data and gdp dispatch actionCreator with  formatted input


export default {
    requestChartData,
    createScales,
}