(function() {

var width  = <?php print $width ?>,
    height = <?php print $height ?>,
    z      = d3.scale.ordinal().range(["blue", "red", "orange", "green"]),
    k      = Math.sqrt(nodes.length / (width * height)),
    color  = d3.scale.category20();

var force = d3.layout.force()
    <?php if (isset($gravity)): ?>
    .gravity(<?php print $gravity; ?>)
    <?php endif; ?>
    <?php if (isset($friction)): ?>
    .friction(<?php print $friction; ?>)
    <?php endif; ?>
    <?php if (isset($theta)): ?>
    .theta(<?php print $theta; ?>)
    <?php endif; ?>
    <?php if (isset($charge)): ?>
    .charge(<?php print $charge; ?>)
    <?php endif; ?>
    <?php if (isset($linkDistance)): ?>
    .linkDistance(<?php print $linkDistance; ?>)
    <?php endif; ?>
    .size([width, height]);

var svg = d3.select("#<?php print $container_id; ?>").append("svg")
    .attr("width", width)
    .attr("height", height);

var graph = svg.append("g")
    .attr("class", "data");

force
    .nodes(nodes)
    .links(links)
    .start();

var link = graph.selectAll("line.link")
    .data(links)
  .enter().append("line")
    .attr("class", "link")
    .style("stroke", function(d) {  return d3.hsl(d.data.fill); })
    .style("stroke-width", 2);

var node = graph.selectAll("g.node")
    .data(nodes, function(d) { return d.id;});

var nodeEnter = node.enter().append("svg:g")
    .attr("class", "node")
    .call(force.drag);

  nodeEnter.append("svg:circle")
    .attr("class", "node")
    .attr("r", function(d) { return (d.data.d) ? d.data.d : 5; })
    .style("fill", d3.hsl('white'))
    .style("stroke", function(d) { return d3.hsl(d.data.fill); })
    .style("stroke-width", 3);

<?php if (isset($showText) && ($showText)): ?>
nodeEnter.append("svg:text")
    .attr("class", "nodetext")
    .attr("dx", 20)
    .attr("dy", ".35em")
    .text(function(d) { return d.name });
<?php else: ?>
node.append("title")
    .text(function(d) { return d.name; });
<?php endif; ?>

force.on("tick", function() {
  link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

node.attr("cx", function(d) { return d.x; })
    .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
    .attr("cy", function(d) { return d.y; });
/**
* For a custom image
*/
//  nodeEnter.append("svg:image")
//      .attr("class", "circle")
//      .attr("xlink:href", "https://d3nwyuy0nl342s.cloudfront.net/images/icons/public.png")
//      .attr("x", "-8px")
//      .attr("y", "-8px")
//      .attr("width", "16px")
//      .attr("height", "16px");


/**
 * Just a circle
 */
//var node = graph.selectAll("circle.node")
//    .data(nodes)
//  .enter().append("circle")
//    .attr("class", "node")
//    .attr("r", function(d) { return (d.data.d) ? d.data.d : 5; })
//    .style("fill", d3.hsl('white'))
//    .style("stroke", function(d) { return d3.hsl(d.data.fill); })
//    .style("stroke-width", 3)
//    .call(force.drag);


//force.on("tick", function() {
//  vis.selectAll("g.node")

});

//var controls = svg.append('g')
//    .attr('class', 'controls')
//    .attr("transform", "translate("+(graph.w+20)+","+0+")");
//
//controls.append('input')
//    .attr('type', 'checkbox');

//var key = ["% Popular Support for Increasing State Tax on Corporations", "Blah blah blah booty booty boot BOOOOOOO Activists Mobilized", "% Statewide Champions", "Leaders Trained"];
///* LEGEND */
//var legend = svg.append("g")
//  .attr("class", "legend")
//  .attr("transform", "translate("+(graph.w+20)+","+0+")");
//
//var keys = legend.selectAll("g")
//    .data(key)
//  .enter().append("g")
//    .attr("transform", function(d,i) { return "translate(0,"+d3.tileText(d,15)+")"});
//
//keys.append("rect")
//  .attr("fill", function(d,i) { return d3.rgb(z(i)); })
//  .attr("width", 16)
//  .attr("height", 16)
//  .attr("y", 0)
//  .attr("x", 0);
//
//var labelWrapper = keys.append("g");
//
//labelWrapper.selectAll("text")
//    .data(function(d,i) { return d3.splitString(key[i], 15); })
//  .enter().append("text")
//    .text(function(d,i) { return d})
//    .attr("x", 20)
//    .attr("y", function(d,i) {  return i*20} )
//    .attr("dy", "1em");
//
})();
