const WIDTH = 1000;
const HEIGHT = 500;
const MARGIN = {
    top: 50,
    right: 30,
    bottom: 50,
    left: 40,
};

const LOADED = "LOADED"
const NOT_LOADED = "NOT_LOADED"

const INITIAL_STATE={
    margin: MARGIN,
    width: WIDTH,
    height: HEIGHT,
    loadState: NOT_LOADED,
    renderTooltip: false,
    position: {xPos:0, yPos:0},
    axisLabels: {x: "Year", y: "Gross Domestic Product"}
}

export default {
    WIDTH,
    HEIGHT,
    MARGIN,
    INITIAL_STATE,
    LOADED,
    NOT_LOADED,
}