/** 
helpers 
**/

var randomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var randomItemFromArray = function(array){

  return array[randomInt(0, array.length-1)]
}

var sortByHeight = function(a,b) {
  if (a.height > b.height)
    return -1;
  if (a.height < b.height)
    return 1;
  return 0;
}

var isNumeric = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

// array filters
var isUsed = function(listing){
    if(listing.used && isNumeric(listing.x) && isNumeric(listing.y) )
      return true;
};

var isNotUsed = function(listing){
    if(!listing.used  || !isNumeric(listing.x) || !isNumeric(listing.y))
      return true;
};


