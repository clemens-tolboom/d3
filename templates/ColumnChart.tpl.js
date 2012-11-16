
var xLabels = [],
  // highest value in entire data set - needs to work recursively
  // also removes the labels which are the first column
  max = d3.max(rows, function(row) { xLabels.push(row.shift()); return d3.max(row);}),
  p = [20, 50, 30, 50],
  w = 800,
  h = 400,
  // chart is 65% and 80% of overall height
  chart = {w: w * .65, h: h * .80},
  legend = {w: w * .35, h:h},
  // bar width is calculated based on chart width, and amount of data
  // items - will resize if there is more or less
  barWidth = ((.90 * chart.w) / (rows.length * key.length)),
  // each cluster of bars - makes coding later easier
  barGroupWidth = (key.length * barWidth),
  // space in between each set
  barSpacing = (.10 * chart.w) / rows.length,
  x = d3.scale.linear().domain([0,rows.length]).range([0,chart.w]),
  y = d3.scale.linear().domain([0,max]).range([chart.h, 0]),
  z = d3.scale.ordinal().range(["blue", "red", "orange", "green"]);


var svg = d3.select("#visualization").append("svg")
  .attr("width", w)
  .attr("height", h)
  .append("g")
  .attr("transform", "translate(" + p[3] + "," + p[0] + ")");

var graph = svg.append("g")
.attr("class", "data");

var bar = graph.selectAll('g')
    .data(rows)
  .enter().append('g')
    .attr('class', 'bargroup')
    .attr('transform', function(d,i) { return "translate(" + i * (barGroupWidth + barSpacing) + ", 0)"; });

bar.selectAll('rect')
    .data(function(d) { return d; })
  .enter().append('rect')
    .attr("width", barWidth)
    .attr("height", function(d) { return chart.h - y(d); })
    .attr('x', function (d,i) { return i * barWidth; })
    .attr('y', function (d,i) { return y(d); })
    .attr('fill', function(d,i) { return d3.rgb(z(i)); });

/* X AXIS  */
var xTicks = graph.selectAll("g.ticks")
    .data(rows)
  .enter().append("g")
    .attr("class","ticks")
    .attr('transform', function(d,i) { return 'translate('+( x(i) + 50)+','+(chart.h)+')'})
  .append("text")
    .attr("dy", ".71em")
    .attr("text-anchor", "end")
    .attr('transform', function(d,i) { return "rotate(-25)"; })
    .text(function(d,i){ return xLabels[i]; });

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
