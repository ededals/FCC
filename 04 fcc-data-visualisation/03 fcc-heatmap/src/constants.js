
const CHART_TITLE = "Monthly Global Land-Surface Temperature";
const CHART_SUBTITLE = "1753 - 2015: base temperature 8.66℃";
const YEAR_SPECIFIER = '%Y';
const MONTH_SPECIFIER = '%m';
const URL = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json"
const INITIAL_STATE={
    chartDimensions:{
        margin:{
            top: 100,
            right: 60,
            bottom:60,
            left: 100,
        },
        width: 1200,
        height: 500,
    },
    loadingFinished: false,
    axisLabels: {
        x: "Years",
        y: "Months",
    },

    renderTooltip: false,
};

export default {
    INITIAL_STATE,
    URL,
    MONTH_SPECIFIER,
    YEAR_SPECIFIER,
    CHART_TITLE,
    CHART_SUBTITLE,
};