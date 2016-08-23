
/**
Lays out listings within the smallest container possible
@param array listings
An array of listing objects.
Each listing object consists of a width (int), height (int), title (String)
@return array
An array of listing objects that have the width (int), height (int), title (String),
and any positioning metadata (up to your discretion).
**/

function arrangeListings(listings) {
  
  
  var ListingsPacker = new ListingPacker(800,800); //width(int), height(int)

  ListingsPacker.processListings(listings); // listings (array or objects)
  
  // array
  return listings;
  
}



/**
 
ListPacker uses a binary tree to fill a known space with objects of known dimentions. 

This bin sorting algrorithm uses a online modal of sorting, meaning the objects are placed as they come. 

The benifit of this method is speed, the disadvantage is overall fill quality.

This solution was inspired by ththis JS library: http://packery.metafizzy.co/
and wiki entries: https://en.wikipedia.org/wiki/Bin_packing_problem 
                  https://en.wikipedia.org/wiki/Packing_problems


**/

var ListingPacker = function (w,h){
  this.init(w, h);
}

ListingPacker.prototype.init = function(containerWidth, containerHeight){
  this.root = new Node(0,0,containerWidth,containerHeight);
} 

ListingPacker.prototype.processListings = function(listings){


  for(var i =1; i < listings.length; i++ ){

    listing = listings[i];

    // start with first item in the tree
    var filledNode = this.checkNode(this.root, listing.width, listing.height);

    // when we find a node, we split the tree and update the listing with the x,y position
    if(filledNode){
      
      // update listing, used=true
      listing.used = true;
      listing.x  = filledNode.x;
      listing.y = filledNode.y;
    }
  }

}


ListingPacker.prototype.checkNode = function(currentNode, width, height){

  //node is full, we have to go deeper. recursively check each branch for fit
  if(currentNode.full){

    return this.checkNode(currentNode.right, width, height) || this.checkNode(currentNode.down, width, height);

  // check for fit, if it fits, mark it as used and return the current node
  }else if(currentNode.width >= width && currentNode.height >= height){

    currentNode.full = true;

    // create to branches with the space we have left
    currentNode.down  = new Node( 
      currentNode.x, 
      currentNode.y + height, 
      currentNode.width, 
      currentNode.height - height
    );

    currentNode.right = new Node(
      currentNode.x + width, 
      currentNode.y, 
      currentNode.width - width, 
      height
    );

    return currentNode;

  }

  return false;

}

var Node = function(x,y,w,h){
  
  this.x = x;
  this.y = y;
  this.width = w;
  this.height = h;
  this.left  = null;
  this.right = null;

}


/**
Renders out listings into the DOM
@param array listings
An array of listing objects with positioning metadata.
Each listing object consists of a width (int), height (int), title (String) +
positioning metadata.
@return undefined
**/



function renderListings(listings) {
 

  var usedListings = listings.filter(isUsed);
  var unusedListings = listings.filter(isNotUsed);

  console.log("unusedListings: ",unusedListings);

  // create  bounding box, attach to #listings
  var boundingBox = document.createElement("div");
  boundingBox.setAttribute("id", "boundingBox"); //add id
  document.getElementById("listings").appendChild(boundingBox); // add to dom

  // render listings, add to bounding box
  for (i = 0; i < usedListings.length; i++) { 
    
    var listing = usedListings[i];
    
    // build listing dom element
    var listingElement = document.createElement("div");
    
    // set width & height
    listingElement.style.height = listing.height + "px";
    listingElement.style.width = listing.width + "px";


    // adding Kijiji colors for fun
    listingElement.style.background = randomItemFromArray(["#f19404", "#df4913",  "#5c65b3",  "#94c62b",  "#881a85"]);
    

    // set position
    listingElement.style.top = listing.y + "px";
    listingElement.style.left = listing.x + "px";
    

    // add title 
    var titleElement = document.createElement("h4");
    var titleText = document.createTextNode(listing.title);
    titleElement.appendChild(titleText);
    listingElement.appendChild(titleElement);
    

    // add img 
    var image = document.createElement("img");
    image.setAttribute("src", listing.image());
    listingElement.appendChild(image);
    

    // add lising to bounding box
    boundingBox.appendChild(listingElement);

  }
}