DATA_URL=" https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/video-game-sales-data.json"

const chartDimensions = {
    height: 1100,
    width: 1400,
    margin: {
        top: 90,
        left: 30,
        bottom: 60,
        right: 30,
    }
}
let svg = d3.select("body")
    .append("svg")
    .attr("height", chartDimensions.height)
    .attr("width", chartDimensions.width);
svg.append("text")
    .attr("id", "title")
    .attr("x", chartDimensions.width/2)
    .attr("y", chartDimensions.margin.top/4)
    .text("Video Game Sales")
    .attr("text-anchor", "middle");

let div = d3.select("body").append("div")
    .attr("id", "tooltip")
    .style("opacity", 0)
    .style("position", "absolute");

fetch(DATA_URL)
    .then((response)=>{
        return response.json()

    })
    .then(data => renderTreeMap(data))
    .catch(error => {
        console.log('Request failed', error)
      });
function renderTreeMap(data){
    console.log(data);

    svg.append("text")
        .attr("id", "description")
        .attr("x", chartDimensions.width/2)
        .attr("y", 3*chartDimensions.margin.top/4)
        .text(data.name)
        .attr("text-anchor", "middle");

    let root = d3.hierarchy(data); 
    const parentNames = root.data.children.map(d => d.name);
    const colorScale = d3.scaleOrdinal()
        .domain(parentNames)
        .range(d3.schemePaired)

    root.sum(d => d.value);

    let treemapLayout = d3.treemap()
        .size([chartDimensions.width-chartDimensions.margin.left-chartDimensions.margin.right,
        chartDimensions.height-chartDimensions.margin.top-chartDimensions.margin.bottom])
        .paddingOuter(0);

    treemapLayout(root);
    treemapLayout.tile(d3.treemapDice);
    console.log(root);
    let nodes = d3.select('svg')
        .selectAll('g')
        .data(root.descendants())
        .enter()
        .append('g')
        .attr('transform', d=> 'translate(' + [d.x0+chartDimensions.margin.left, d.y0+chartDimensions.margin.top] + ')');
    nodes.append('rect')
        .attr("class", "tile")
        .attr('width', d => d.x1 - d.x0)
        .attr('height', d => d.y1 -d.y0)
        .style('fill', d=> colorScale(d.data.category))
        .attr("data-name", d => d.data.name)
        .attr("data-category", d => d.data.category)
        .attr("data-value", d=> d.data.value)
        .style('stroke', 'white')
        .on("mousemove", d =>{
            div.html("Name: " + d.data.name+"<br/>"
                +"Category: " + d.data.category+ "<br/>"
                +"Value: " + d.data.value)
                .style("left", (d3.event.pageX+20) + "px")
                .style("top", (d3.event.pageY+20) + "px")
                .style("opacity", 0.7)
                .attr("data-value", d.data.value)
        })
        .on("mouseout", d => {
            div.style("opacity", 0);
        });
    nodes.append("text")
        .attr('class', 'tile-text')
        .selectAll("tspan")
        .data(function(d) { return d.data.name.split(/(?=[A-Z][^A-Z])/g); })
        .enter().append("tspan")
        .attr("x", 4)
        .attr("y", function(d, i) { return 15 + i * 15; })
        .text(function(d) { return d; });
    
    const LEGEND_Y_POS = chartDimensions.height-2*chartDimensions.margin.bottom/3;
    const LEGEND_X_POS = chartDimensions.margin.right
    const LEGEND_RECT_SIZE = 20;
    const LEGEND_TEXT_X_PADDING = 5;
    const LEGEND_TEXT_Y_PADDING = 4;
    const LEGEND_TEXT_SPACE = (chartDimensions.width
        -chartDimensions.margin.left
        -chartDimensions.margin.right
        -(LEGEND_RECT_SIZE+LEGEND_TEXT_X_PADDING)*parentNames.length)/parentNames.length;
    let legend = d3.select('svg')
        .append("g")
        .attr("id", "legend")
        .selectAll("g")
        .data(parentNames)
        .enter()
        .append('g')
        .attr('transform',(d,i)=> {
            let x = LEGEND_X_POS + i*(LEGEND_RECT_SIZE+LEGEND_TEXT_SPACE);
            let y = LEGEND_Y_POS;
            return 'translate(' + x + ',' + y + ')';
        });
    legend.append('rect')
        .attr("class", "legend-item")
        .attr('width', LEGEND_RECT_SIZE)
        .attr('height', LEGEND_RECT_SIZE)
        .style('fill', (d)=>colorScale(d))
        .style('stroke', "black");
            
    legend.append('text')
        .attr('x', LEGEND_RECT_SIZE+LEGEND_TEXT_X_PADDING)
        .attr('y', LEGEND_RECT_SIZE-LEGEND_TEXT_Y_PADDING)
        .text(d => d)
        .attr("class", "legend-text");
}   