var labels = [],
  p = [20, 50, 30, 50],
  w = 900 - p[1] - p[3],
  h = 400 - p[0] - p[2],
  chart = {w: w * .65, h:h},
  legend = {w: w * .35, h:h},
  x = d3.scale.linear().domain([0,4]).range([0,chart.w]),
  y = d3.scale.linear().domain([0,100]).range([chart.h, 0]),
  z = d3.scale.ordinal().range(["blue", "red", "orange", "green"]);

var svg = d3.select("#visualization").append("svg")
  .attr("width", w)
  .attr("height", h)
  .append("g")
  .attr("transform", "translate(" + p[3] + "," + p[0] + ")");

var graph = svg.append("g")
.attr("class", "data");

var data = (key.map(function(value,index) {
  return rows.map(function(d,i) {
    labels[i] = d[0];
    return {x: d[0], y: +d[index+1]};
  });
}));

var bar = svg.selectAll("g.bar")
    .data(data)
  .enter().append("g")
    .attr("class", "bar")
    .attr("transform", function(d) { return "translate(0," + y(d) + ")"; });

bar.append("rect")
  .attr("width", function(d) { console.log(d); return x(d.value); })
  .attr("height", y.rangeBand());

var circles = graph.selectAll("g.circles")
    .data(data)
  .enter().append("g")
    .attr("fill", function(d, i) { return d3.rgb(z(i)); });

circles.selectAll("circle")
    .data(function(d) { return d; })
  .enter().append("circle")
    .attr("class", "area")
    .attr("cx", function(d,i) { return x(i); })
    .attr("cy", function(d,i) { return y(d.y); })
    .attr("r", 6)
    .on("mouseover", function() { 
      var save = this;
      var target = d3.select(this)
        .append("circle").style("fill", "aliceblue"); 
        target.append("circle").style("fill","black");
    })
    .on("mouseout", function(d,i) { d3.select(this).style("fill", d3.rgb(z(i))); } );

/* X AXIS  */
var xTicks = graph.selectAll("g.ticks")
    .data(x.ticks(4))
  .enter().append("g")
    .attr("class","ticks")
    .attr('transform', function(d,i) { return 'translate('+x(d)+','+(h+20)+')'});

xTicks.selectAll('text')
    .data(function(d,i) { return d3.splitString(labels[i],10)})
  .enter().append("text")
    .attr("dy", ".71em")
    .attr("y", function(d,i) {  return i*20} )
    .attr("text-anchor", "middle")
    .text(function(d,i){ return d; });

/* LINES */
var rule = graph.selectAll("g.rule")
    .data(y.ticks(4))
  .enter().append("g")
    .attr("class", "rule")
    .attr("transform", function(d) { return "translate(0," + y(d) + ")"; });

rule.append("line")
  .attr("x2", chart.w)
  .style("stroke", function(d) { return d ? "#ccc" : "#000"; })
  .style("stroke-opacity", function(d) { return d ? .7 : null; });

/* Y AXIS */
rule.append("text")
  .attr("x", -15)
  .attr("dy", ".35em")
  .attr("text-anchor", "end")
  .text(d3.format(",d"));

/* LEGEND */
var legend = svg.append("g")
  .attr("class", "legend")
  .attr("transform", "translate("+(chart.w+20)+","+0+")");

var keys = legend.selectAll("g")
    .data(key)
  .enter().append("g")
    .attr("transform", function(d,i) { return "translate(0,"+d3.tileText(d,15)+")"});

keys.append("rect")
  .attr("fill", function(d,i) { return d3.rgb(z(i)); })
  .attr("width", 16)
  .attr("height", 16)
  .attr("y", 0)
  .attr("x", 0);

var labelWrapper = keys.append("g");

labelWrapper.selectAll("text")
    .data(function(d,i) { return d3.splitString(key[i], 15); })
  .enter().append("text")
    .text(function(d,i) { return d})
    .attr("x", 20)
    .attr("y", function(d,i) {  return i*20} )
    .attr("dy", "1em");
