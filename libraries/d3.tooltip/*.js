(function($) {
  d3.tooltip = function(tipjar, x, y, txt, h, w) {
    var tooltip = {
      w: 65,
      h: 40,
      tipW: 12,
      tipL: 9,
      tipO: 22,
      x: x || 0, 
      y: y || 0
    };

    var img = tipjar.append("g");
    for (var x=2; x>=0; x--) {
      img.append('path')
        .attr("d", function(d) { return "M0,0"
        + 'l' + tooltip.tipO+',-' + tooltip.tipL 
        + 'l' + ((tooltip.w/2) - tooltip.tipW) + ',0'
        + 'l0,-' + tooltip.h + ''
        + 'l-' + tooltip.w + ',0'
        + 'l0, '+ tooltip.h
        + 'l' + (tooltip.w/2) +',0'
        + "L0,0"; })
        .attr("fill", function(d) { return (x == 0) ? '#fff' : '#ccc'; })
        .attr('transform', function(d) { return 'translate(' + x + ',' + x + ')';  })
        .attr('stroke', '#ccc')
        .attr('fill-opacity', function(d) {
          switch (x) {
            case 0:
              return 1;
              break;
            case 1:
              return 0.6;
              break;
            case 2:
              return 0.4;
              break;
          }
        })
        .attr('stroke-width', function(d) { return (x == 0) ? 1 : 0; });
    }

      var offset = (tooltip.w / 2) - (tooltip.tipO - tooltip.tipW);
    
      var textbox = tipjar.append('g')
        .attr('class', 'text')
        .attr('transform', function(d) { return 'translate(-' + offset + ',-'+ tooltip.h +')'; });

      textbox.append('text')
        .text('Value:')
        .attr('text-anchor', 'start')
        .attr('dx', 5)
        .attr('dy', 8)
        .attr('font-family', 'Arial,sans-serif')
        .attr('font-size', '12')
        .attr('font-weight', 'bold');

      textbox.append('text')
        .text(txt)
        .attr('text-anchor', 'start')
        .attr('dx', 5)
        .attr('dy', 25)
        .attr('font-family', 'Arial,sans-serif')
        .attr('font-size', '12')
        .attr('font-weight', 'normal');
  }

})(jQuery);
