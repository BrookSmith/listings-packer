/**
  Generate Listings

  adds listing objects to target array

  var listings = [];
  generateListings(listings, 30);
  
**/

function generateListings(targetArray, numberOfListings){

  while (targetArray.length < numberOfListings) 
    targetArray.push(new RandomListing());

  // sort by height 
  targetArray.sort(sortByHeight);

}

/**

Random Listing object 

**/

function RandomListing(){

  this.width = randomItemFromArray([64, 128, 256]);
  this.height = randomItemFromArray([64, 128, 256]);
  
  this.image = function(){ 
    return "http://lorempixel.com/"+this.width+"/"+this.height+"/cats";
  }

  // Generate a Title -- Cat ipsum
  this.title = "cat ipsum Panther manx abyssinian british shorthair burmese american bobtail burmes Cheetah munchkin cornish rex donskoy Singapura tom Leopard scottish Tom balinese tabby kitten Munchkin balinese tomcat malkin Mouser ocicat savannah scottish fold birman"
    .split(" ")
    .sort(function() {
      return .5 - Math.random();
    }).slice( 0, randomInt(1, 6) )
    .join(" ")
    .replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();} );


}
