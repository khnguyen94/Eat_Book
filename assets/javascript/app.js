// Initialize Firebase
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBCPUmsGUPIuxlTn95s4UVkzciH19_JW94",
    authDomain: "potential-project1-fc63e.firebaseapp.com",
    databaseURL: "https://potential-project1-fc63e.firebaseio.com",
    projectId: "potential-project1-fc63e",
    storageBucket: "potential-project1-fc63e.appspot.com",
    messagingSenderId: "371811198542",
    appId: "1:371811198542:web:657c037801356799ddc51f",
    measurementId: "G-EXXEB38QKC"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Create handle reference on the database
var database = firebase.database();

// Create a renderRestaurants function that obtains am API response

// Base queryURL
// https://us-restaurant-menus.p.rapidapi.com

// Seattle's
// latitude= 47.6062
// longitude= -122.3321

// Create a renderRestaurants function that gets an API response
function renderRestaurants() {
  // Grab the text from the search input
  var searchString = $("#search-input")
    .val()
    .trim();

  console.log(searchString);

  // Construct queryURL
  // What is Curl?
  // curl -X GET --header "Accept: application/json" --header "user-key: d9062abf7aa13be6e735eea8b73c32c8" "https://developers.zomato.com/api/v2.1/search?entity_id=279&entity_type=city&q=italian&count=5&lat=47.6062&lon=-122.3321"
  // When I run the curl request from terminal and manually putting in the API key, it works 

  var queryURL =
    "https://developers.zomato.com/api/v2.1/search?entity_id=279&entity_type=city&q=" +
    searchString +
    "&count=5";
  var seattleID = "279";


  // AJAX command
  $.ajax({
    "user-key": zomatoAPIKey, 
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response.data);
  });

  // // Using a for-loop, loop through the JSON API response and dynamically create 4 new restaurant cards and append them to search result display
  // for (var i = 0; i < response.length; i++) {
  //   // REFERENCE UPDATE NEEDED
  //   // Create a new newSearchResultCol div
  //   // Assign it a class of "col s12 m6"
  //   var newSearchResultCol = $("<div>");
  //   newSearchResultCol.addClass("col s12 m6");

  //   // Create a new newSearchResultColCard div
  //   // Assign it a class of "card horizontal"
  //   var newSearchResultColCard = $("<div>");
  //   newSearchResultColCard.addClass("card horizontal");

  //   // Create a new div to hold the card
  //   // Assign it a class of "card-image"
  //   var newSearchResultColImgDiv = $("<div>");
  //   newSearchResultColImgDiv.addClass("card-image");

  //   // Create a new img div
  //   // Assign it an attribute of src and set the src to be the image of the ith object in response
  //   var newSearchResultColImage = $("<img>");
  //   newSearchResultColImage.attr("src", response[i]); // REFERENCE UPDATE NEEDED

  //   // Append image to imgdiv
  //   newSearchResultColImgDiv.append(newSearchResultColImage);

  //   // Append imgdiv to card
  //   newSearchResultColCard.append(newSearchResultColImgDiv);

  //   // Append card to col
  //   newSearchResultCol.append(newSearchResultColCard);

  //   // Append col to search result display
  //   $("#search-container").append(newSearchResultCol);
  // };
};

// Create on-submit that then runs the renderRestaurants functino
$("#search-submit-button").on("click", function() {
  renderRestaurants();
});

// Create an on-click event listener that will capture and store the restaurant data from the specific search result the user clicked on in the database

// $("#search-submit-button").on("click", function() {}

// Then it should add functionality to add that restaurant to the to-visit list
$("").on("click", function() {
  // Open up an in-browser pop-up that prompts the user if they want to add it to their to-visit list, "Add to to-visit list?"

  // Create internal on-click listeners for confirm add & cancel
  // Click "Confirm" to add
  $("#add-to-list-btn").on("click", function(event) {
    // Prevent page refresh/reload
    event.preventDefault();

    // Create a new restaurant object
    var newRestaurant = new Object();

    // Confirm that a newRestaurant object was created
    console.log("New restaurant successfully created");

    // Set the name, rating, address, and phone number for the newRestaurant object from the search result that the user clicked on
    newRestaurant.newRestaurantName = $();
    newRestaurant.newRestaurantRating = $();
    newRestaurant.newRestaurantAddress = $();
    newRestaurant.newRestaurantPhoneNumber = $();

    // Console log newRestaurant object, now with information
    console.log(newRestaurant);

    // Push the newRestaurant object to the database
    database.ref().push(newRestaurant);

    // Close the confirmation pop-up

    // Clear the search results
    $("search-input").text("");

    // Read the data from database, automatically updates on initial data and then on further creation of new child objects in the database
    // Snapshot should only return the last object written into the database
    database.ref().on("child_added", function(snapshot) {
      // Create a reference handle for the database snapshot
      let dbSnapshot = snapshot.val();

      // Console log all the relevant information about the most recent newRestaurant object
      console.log(dbSnapshot.newRestaurantName);
      console.log(dbSnapshot.newRestaurantRating);
      console.log(dbSnapshot.newRestaurantAddress);
      console.log(dbSnapshot.newRestaurantPhoneNumber);

      //
    });

    // Create the new to-visit restaurant item display
    // Create new div for restaurant name
    // Set name
    var newRestaurantName = $("<div>");
    newRestaurantName.text(dbSnapshot.newRestaurantName);

    // Create new div for restaurant rating
    // Set rating
    var newRestaurantRating = $("<div>");
    newRestaurantRating.text(dbSnapshot.newRestaurantRating);

    // Create new div for restaurant address
    // Set address
    var newRestaurantAddress = $("<div>");
    newRestaurantAddress.text(dbSnapshot.newRestaurantAddress);

    // Create a new div for restaurant phone number
    // Set phone number
    var newRestaurantPhoneNumber = $("<div>");
    newRestaurantPhoneNumber.text(dbSnapshot.newRestaurantPhoneNumber);

    // Append restaurant component elements to the new restaurant object
    newRestaurant.append(
      newRestaurantName,
      newRestaurantRating,
      newRestaurantAddress,
      newRestaurantPhoneNumber
    );

    // Append that newRestaurant object to the to-visit restaurant list
  });

  // Click "Cancel" to exit the pop-up
  $("cancel-button").on("click", function() {
    // Close the pop-up
  });
});

// Dynamically render HTML
// Create new to-do items based on Firebase data, have it auto refresh and auto populate when data changes, use "Add_Child" listener
// append to display area on the dashboard

//
$(document).ready(
  // When #submit-button click, grab searchInput from #search-input
  $("#submit-button").on("click", function grabSearchInput() {
    var searchInput = $("#search-input")
      .val()
      .trim();
    console.log(searchInput);
  })
);

// grab emailInput from #email-input
$("#email-submit-button").on("click", function() {
  var emailInput = $("#email-input")
    .val()
    .trim();
  console.log(emailInput);

  database.ref().push({

    email: emailInput,

   });
  updateTheHtml();
  $("#email-input").val("");
});
