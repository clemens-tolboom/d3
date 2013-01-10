// Notes on data formatting:
// legend: array of text values. Length is number of data types.
// rows: array of arrays. One array for each point of data
// arrays have format array(label, data1, data2, data3, ...)

/**
 * @file
 * Adds a function to generate a column chart to the `Drupal` object.
 */

(function($) {

  Drupal.d3.piechart = function (select, settings) {

    var wedges = settings.wedges,
      // Each wedge has a label and a value
      key = wedges.map(function(d) { return d.label; }),
      // Padding is top, right, bottom, left as in css padding.
      p = [10, 50, 30, 50],
      w = 700,
      h = 400,
      // chart is as big as possible.
      radius = Math.min(w, h) / 2,
      legend = {w: w - radius * 2, h:h},
      color = d3.scale.ordinal().range(["blue", "red", "orange", "green"]),
      div = (settings.id) ? settings.id : 'visualization';

    var svg = d3.select('#' + div).append("svg")
      .attr("width", w)
      .attr("height", h)
      .append("g")
      .attr("transform", "translate(" + p[3] + "," + p[0] + ")");

    var graph = svg.append("g")
      .attr("class", "chart")
      .attr('transform', 'translate(' + radius + ',' + radius + ')');

    var arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);
    
    var circle = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(radius - 10);

    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.value; });

    var g = graph.selectAll(".arc")
        .data(pie(wedges))
      .enter().append("g")
        .attr("class", "arc");

    g.append("path")
        .attr("d", arc)
        .style("fill", function(d, i) { return color(i); })
        .on('mouseover', showToolTip)
        .on('mouseout', hideToolTip)
        .attr('class', function(d, i) { return 'color_' + color(i); });

    /*g.append("text")
        .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .text(function(d) { return d.data.label; });*/

    /* LEGEND */
    var legend = svg.append("g")
      .attr("class", "legend")
      .attr("transform", "translate("+(radius * 2+20)+","+0+")");

    var keys = legend.selectAll("g")
      .data(key)
      .enter().append("g")
      .attr("transform", function(d,i) { return "translate(0,"+d3.tileText(d,15)+")"});

    keys.append("rect")
      .attr("fill", function(d,i) { return d3.rgb(color(i)); })
      .attr("class", function(d,i) {return "color_" + color(i); })
      .attr("width", 16)
      .attr("height", 16)
      .attr("y", 0)
      .attr("x", 0)
      .on('mouseover', highlightBars)
      .on('mouseout', unhighlightBars);

    var labelWrapper = keys.append("g");

    labelWrapper.selectAll("text")
      .data(function(d,i) { return d3.splitString(key[i], 15); })
      .enter().append("text")
      .text(function(d,i) { return d})
      .attr("x", 20)
      .attr("y", function(d,i) {  return i*20} )
      .attr("dy", "1em");

    function showToolTip(d, i) {
      // change color and style of the bar
      var bar = d3.selectAll('.color_' + color(i));
      bar.attr('stroke', '#ccc')
        .attr('stroke-width', '1')
        .attr('opacity', '0.75');

      var group = d3.select(this.parentNode);

      var tooltip = graph.append('g')
        .attr('class', 'tooltip')
        // move to the x position of the parent group
        .attr('transform', function(data) { return group.attr('transform'); })
          .append('g')
        // now move to the actual x and y of the bar within that group 
        .attr('transform', function(data) { return 'translate(' + circle.centroid(d) + ')'; });


      d3.tooltip(tooltip, d.data.value);
    }

    function hideToolTip(d, i) {
      var group = d3.select(this.parentNode);
      var bar = d3.selectAll('.color_' + color(i));
      bar.attr('stroke-width', '0')
        .attr('opacity', 1);

      graph.select('g.tooltip').remove();

    }
    
    function highlightBars(d, i) {
      var like_color = d3.selectAll('.color_' + color(i));
      like_color.attr('stroke', '#ccc')
        .attr('stroke-width', '1')
        .attr('opacity', '0.75');
    }
    
    function unhighlightBars(d, i) {
      var like_color = d3.selectAll('.color_' + color(i));
      like_color.attr('stroke-width', '0')
        .attr('opacity', 1);
    }

  }

})(jQuery);
