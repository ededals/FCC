
const CHART_TITLE = "Doping In Professional Bicycle Racing";
const CHART_SUBTITLE = "35 fastest times up Alpe D'Huez";
const YEAR_SPECIFIER = '%Y';
const TIME_SPECIFIER = '%M:%S';
const URL = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json"
const INITIAL_STATE={
    chartDimensions:{
        margin:{
            top: 100,
            right: 120,
            bottom: 60,
            left: 60,
        },
        width: 1000,
        height: 500,
    },
    loadingFinished: false,
    axisLabels: {
        x: "Year",
        y: "Time in minutes",
    },

    renderTooltip: false,
}

export default {
    INITIAL_STATE,
    URL,
    TIME_SPECIFIER,
    YEAR_SPECIFIER,
    CHART_TITLE,
    CHART_SUBTITLE,
}