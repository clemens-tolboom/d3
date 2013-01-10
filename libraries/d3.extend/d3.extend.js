/**
 * helper function to adjust Y axis based on how many text lines
 */
d3.tileText = function(str, w) {
  this.y = (!this.y) ? 0 : this.y;

  var store = this.y;
  this.y += d3.splitString(str, w).length*25;
  return store;
}
/**
 * helper function to split a text string into an array based on a length
 */
d3.splitString = function(str, w) { 
  var strArray = str.split(" ");
  var endArray = [];
  var pos = 0;

  for(var i=0; i<strArray.length; i++) {
    if(!endArray[pos])
      endArray[pos] = "";

    if(endArray[pos].length + strArray[i].length + 1 <= w) {
      endArray[pos] = [endArray[pos],strArray[i]].join(" ");
    } else {
      pos++;	
      endArray[pos] = strArray[i];
    }
  }

  return endArray;
}

d3.svgSplitString = function(str, w, addText) {
  var text = str.split(" ");
  var pos = 0;
  var box;
  var total = 0;
  while (pos < text.length) {
    if (!box) {
      box = addText(box, total);
      total++;
    }
    var old_HTML = box.textContent;
    box.textContent += ' ' + text[pos];
    var length = box.getComputedTextLength();
    if (length > w) {
      box.textContent = old_HTML;
      box = addText(box, total);
      box.textContent = text[pos];
      total++;
    }
    pos++;
  }
  return total;
}
