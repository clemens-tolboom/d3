/**
 * @file
 * Extends d3 with helper functions.
 */

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

