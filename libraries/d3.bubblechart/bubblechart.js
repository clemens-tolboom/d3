/**
 * @file
 * Adds a function to generate a column chart to the `Drupal` object.
 */

/**
 * Notes on data formatting:
 * legend: array of text values. Length is number of data types.
 * rows: array of arrays. One array for each point of data
 * arrays have format array(label, data1, data2, data3, ...)
 */

(function($) {

  Drupal.d3.bubblechart = function (select, settings) {

    //Setting JSON data.
    var jsonData = settings.rows,
    //Setting chart title.
    chartTitle = settings.title,
    // Setting background color.
    bgColor = settings.colour,
    //Setting dimension of the draw area occupied by chart in pixels.
    diameter = settings.width,
    format = d3.format(",d"),
    color = d3.scale.category20c();

    var bubble = d3.layout.pack()
        .sort(null)
        .size([diameter, diameter])
        .padding(1.5);

    var svg = d3.select("#visualization").append("svg")
        .attr("width", diameter)
        .attr("height", diameter)
        .attr("class", "bubble")
        .style('background', bgColor);

    root = JSON.parse( jsonData ); 
      var node = svg.selectAll(".node")
      .data(bubble.nodes(classes(root))
          .filter(function(d) { return !d.children; }))
          .enter().append("g")
          .attr("class", "node")
          .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

      node.append("title")
          .text(function(d) { return d.className + ": " + format(d.value); });

      node.append("circle")
          .attr("r", function(d) { return d.r; })
          .style("fill", function(d) { return color(d.packageName); });

      node.append("text")
          .attr("dy", ".3em")
          .attr("font-size","10px")
          .style("text-anchor", "middle")
          .style("font-family", "sans-serif")
          .text(function(d) { return d.className.substring(0, d.r / 3); });

    // Returns a flattened hierarchy containing all leaf nodes under the root.
    function classes(root) {
      var classes = [];

      function recurse(name, node) {
        if (node.children) node.children.forEach(function(child) { recurse(node.name, child); });
        else classes.push({packageName: name, className: node.name, value: node.size});
      }

      recurse(null, root);
      return {children: classes};
    }

    d3.select(self.frameElement).style("height", diameter + "px");

  };

})(jQuery);
