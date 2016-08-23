
function onload(){

	var listings = [];

	generateListings(listings, 30);

	renderListings(arrangeListings(listings));

}