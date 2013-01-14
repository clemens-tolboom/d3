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

/**
 * Helps create blocks of text that word wrap correctly using font size.
 * 
 * @param string str
 *   String to split into multiple text elements.
 * @param number w
 *   Maximum width of a line in pixels
 * @param function addText
 *   Adds another text element to the document.
 *   @param object currentText
 *     Object containing the current text element's svg object.
 *   @param int totalBoxes
 *     The total number of boxes currently displayed.
 *   @returns object currentText
 *     Returns the new text element's svg object.
 * @returns int totalBoxes
 *   The total number of boxes used to display the string.
 */
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

d3.elipses = function(str, box, width) {
  box.textContent = str;
  if (box.getComputedTextLength() > 78){
    var index = 0;
    var text = '';
    var elipses = '...';
    box.textContent = text + elipses;
    var oldContent;
    while (box.getComputedTextLength() <= 78) {
      text += str[index];
      index += 1;
      var oldContent = box.textContent;
      box.textContent = text + elipses;
    }
    if (oldContent) {
      box.textContent = oldContent;
    }
  }
}
