const EDUCATION_DATA_URL = "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json";
const US_COUNTY_DATA_URL = "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json";
const chartDimensions = {
    height: 700,
    width: 1000,
    margin: {
        top: 30,
        left: 30,
        bottom: 30,
        right: 30,
    }
}

const legendRectSize = 20;
const legendSpacing = 10;

let svg = d3.select("body")
    .append("svg")
    .attr("height", chartDimensions.height)
    .attr("width", chartDimensions.width);

svg.append("text")
    .text("United States Educational Attainment")
    .attr("x", chartDimensions.width/2)
    .attr("y", chartDimensions.margin.top)
    .attr("text-anchor", "middle")
    .attr("id", "title");

svg.append("text")
    .text("Percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014)")
    .attr("x", chartDimensions.width/2)
    .attr("y", 2*chartDimensions.margin.top)
    .attr("text-anchor", "middle")
    .attr("id", "description");

let div = d3.select("body").append("div")
    .attr("id", "tooltip")
    .style("opacity", 0)
    .style("position", "absolute");


const educationDataRequest = fetch(EDUCATION_DATA_URL)
    .then(response => response.json());

const countyDataRequest = fetch(US_COUNTY_DATA_URL)
    .then(response => response.json());

Promise.all([educationDataRequest, countyDataRequest])
    .then(([educationData, geoData]) => drawChart(educationData, geoData))

function drawChart(educationData, topoData){
    let geoData = topojson.feature(topoData, topoData.objects.counties);
    let projection = d3.geoIdentity()
        .fitExtent([[chartDimensions.margin.left, chartDimensions.margin.top]
            ,[chartDimensions.width-chartDimensions.margin.right, chartDimensions.height-chartDimensions.margin.bottom]]
            ,geoData)
    let educationExtent = d3.extent(educationData, datapoint => {
        return datapoint.bachelorsOrHigher;
    });
    let geoGenerator = d3.geoPath().projection(projection);
    colorScale = d3.scaleSequential()
        .domain(educationExtent)
        .interpolator(d3.interpolateRgb("white", "green"));
    d3.select('svg')
        .selectAll('path')
        .data(geoData.features)
        .enter()
        .append('path')
        .attr('d', geoGenerator)
        .attr("class", "county")
        .attr("data-fips", d=>d.id)
        .attr("data-education", d => {
            let countyEducationLevel = educationData.filter(datapoint => d.id === datapoint.fips);
            return countyEducationLevel[0].bachelorsOrHigher;
        })
        .attr('fill', d=>{
            let countyEducationLevel = educationData.filter(datapoint => d.id === datapoint.fips);
            return colorScale(countyEducationLevel[0].bachelorsOrHigher)
        })
        .attr('stroke', 'white')
        .on("mouseover", d =>{
            let countyEducationLevel = educationData.filter(datapoint => d.id === datapoint.fips)
            div.html(countyEducationLevel[0].area_name+", "+countyEducationLevel[0].bachelorsOrHigher+"%")
                .style("left", (d3.event.pageX+20) + "px")
                .style("top", (d3.event.pageY-20) + "px")
                .style("opacity", 0.7)
                .attr("data-education", countyEducationLevel[0].bachelorsOrHigher)
        })
        .on("mouseout", d => {
            div.style("opacity", 0);
        })
    //Calculating legend precentage points
    let legendVals = [...educationExtent];
    let distance = legendVals[1] - legendVals[0]
    let legendCount = 7;
    //populate legendval Array
    for (let i = 1; i < legendCount-1; i++){
        legendVals.splice(i,0, distance/legendCount*i+legendVals[0]);
    }

    console.log(legendVals);
    let legend = d3.select('svg')
        .append("g")
        .attr("id", "legend")
        .selectAll("g")
        .data(legendVals)
        .enter()
        .append('g')
        .attr('transform',(d,i)=> {
            let height = legendRectSize;
            let x = 8*chartDimensions.width/11+i*legendRectSize;
            let y = chartDimensions.height/5;
            return 'translate(' + x + ',' + y + ')';
        });
    legend.append('rect')
        .attr('width', legendRectSize)
        .attr('height', legendRectSize)
        .style('fill', (d)=>colorScale(d))
        .style('stroke', "black");
    
    legend.append('text')
        .attr('x', legendRectSize/2+3)
        .attr('y', legendRectSize+legendSpacing)
        .text(d =>Math.round(d)+'%')
        .attr("text-anchor", "middle")
        .attr("class", "legend-text");
}

