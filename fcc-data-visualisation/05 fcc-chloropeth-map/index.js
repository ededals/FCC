DATA_URL="https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/video-game-sales-data.json"

const chartDimensions = {
    height: 700,
    width: 1000,
    margin: {
        top: 60,
        left: 30,
        bottom: 30,
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
    .text("Video game sales")
    .attr("text-anchor", "middle")


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
    console.log(root);
    root.sum(d => d.value);
    console.log(root);

    let treemapLayout = d3.treemap()
        .size([chartDimensions.width-chartDimensions.margin.left-chartDimensions.margin.right,
        chartDimensions.height-chartDimensions.margin.top-chartDimensions.margin.bottom])
        .paddingOuter(5);

    treemapLayout(root);
    console.log(treemapLayout);
    svg.selectAll('rect')
        .data(root.descendants())
        .enter()
        .append('rect')
        .attr('x', d => d.x0)
        .attr('y', d => d.y0)
        .attr('width', d => d.x1 - d.x0)
        .attr('height', d => d.y1 -d.y0);

}   